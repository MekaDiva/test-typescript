import { useEffect, useState } from "react";
import "./TestCalendar.css";

type Event = {
  id: number,
  start: string,
  duration: number,
  startPer: number,
  endPer: number,
  width: number,
  left: number,
};

const TestCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const eventTotalWidth = 400;

  function startToPercentage(event: Event) {
    const time = event.start;
    const times : string[] = time.split(":");
    const percentage = (Number(times[0]) - 9) / 12 + Number(times[1]) / 60 / 12;
    return percentage;
  }
  
  function endToPercentage(event: Event) {
    const duration = event.duration;
    const startPer = startToPercentage(event);
    const durationPercentage = duration / 12 / 60;
    const endPer = startPer + durationPercentage;
    return endPer;
  }

  function eventWidth(event:Event, data: Event[]) {
    let width = 0;
    let eventSuperpos = 0;
    for (let i = 0; i < data.length; i++) {
      if (event !== data[i]) {
        if (!(event.startPer > data[i].endPer || event.endPer < data[i].startPer)) {
          eventSuperpos += 1;
        }
      }
    }
    width = eventTotalWidth / (eventSuperpos + 1);
    return width;
  }

  function eventLeft(event: Event, data: Event[]) {
    let left = 0;
    const eventIndex = data.indexOf(event);
    if (eventIndex - 1 >= 0) {
    }
    return left;
  }

  useEffect(() => {
    fetch('data/input.json').then((response) => {
      return response.json();
    }).then((data) => {
      data.forEach((event: Event) => {
        event.startPer = startToPercentage(event);
        event.endPer = endToPercentage(event);
      });
      data.forEach((event: Event) => {
        event.width = eventWidth(event, data);
      });
      data.forEach((event: Event) => {
        event.left = eventLeft(event, data);
      });
      setEvents(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="testCalendar">
      {events.map((event, index) => {
        return (
          <div className="eventCalendar" key={index} style={{
            top: event.startPer * 100 + '%',
            left: 0,
            height: (event.endPer - event.startPer) * 100 + '%',
            width: event.width + 'px',
            }}>
            {event.id} {event.start} {event.duration}
          </div>
        );
      })}
    </div>
  );
};

export default TestCalendar;