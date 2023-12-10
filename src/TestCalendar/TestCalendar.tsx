import { useEffect, useState } from "react";
import "./TestCalendar.css";

type Event = {
  id: number,
  start: string,
  duration: number,
  startPer: number,
  endPer: number,
  widthPer: number,
  leftPer: number,
};

function random_bg_color() {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  return bgColor;
}

const TestCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);

  function startToPercentage(event: Event) {
    const time = event.start;
    const times: string[] = time.split(":");
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

  function eventWidthLeftPer(data: Event[]) {
    var newData = [...data];
    newData.sort((a, b) => {
      return a.startPer - b.startPer;
    });

    var groupes: Event[][] = [];

    for (var i = 0; i < newData.length; i++) {
      var currentEvent = newData[i];
      if (groupes.length === 0) {
        groupes.push([currentEvent]);
      } else {
        var newGroupe = true;
        for (let index = 0; index < groupes[groupes.length - 1].length; index++) {
          const event = groupes[groupes.length - 1][index];
          if (currentEvent.startPer < event.endPer) {
            newGroupe = false;
          }
        }

        if (newGroupe) {
          groupes.push([currentEvent]);
        }
        else {
          groupes[groupes.length - 1].push(currentEvent);
        }
      }
    }

    console.log(groupes);

    for (i = 0; i < groupes.length; i++) {
      const groupe = groupes[i];

      // Create full stack with start and end then sort
      var fullStack = [];
      for (var j = 0; j < groupe.length; j++) {
        currentEvent = groupe[j];
        fullStack.push({
          key: "start",
          value : currentEvent.startPer,
          event: currentEvent,
        });
        fullStack.push({
          key: "end",
          value : currentEvent.endPer,
          event: currentEvent,
        });
      }

      fullStack.sort((a, b) => {
        return a.value - b.value;
      });

      // Find max superposition
      var maxSurperposition = 1;
      var stack = [];
      for (j = 0; j < fullStack.length; j++) {
        if (stack.length === 0) {
          stack.push(fullStack[j].key);
        } else {
          if (fullStack[j].key === "start") {
            stack.push(fullStack[j].key);
            maxSurperposition = Math.max(stack.length, maxSurperposition);
          } else {
            stack.pop();
          }
        }
      }

      // Add width
      for (j = 0; j < groupe.length; j++) {
        currentEvent = groupe[j];
        currentEvent.widthPer = 1 / maxSurperposition;
      }

      // Add left
      //console.log(fullStack);
      var positionStack = [];
      for (let index = 0; index < maxSurperposition; index++) {
        positionStack.push(index / maxSurperposition);
      }

      for (let index = 0; index < fullStack.length; index++) {
        const element = fullStack[index];
        if (element.key === "start") {
          // Give the event the first position in the stack
          element.event.leftPer = positionStack.shift()!;
        }
        else {
          // Give back the position to the stack
          positionStack.push(element.event.leftPer);
        }
      }
    }

    return newData;
  }

  useEffect(() => {
    fetch('data/input.json').then((response) => {
      return response.json();
    }).then((data) => {
      // Add hight and top
      data.forEach((event: Event) => {
        event.startPer = startToPercentage(event);
        event.endPer = endToPercentage(event);
      });

      // Add width and left
      data = eventWidthLeftPer(data);

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
            left: event.leftPer * 100 + '%',
            height: (event.endPer - event.startPer) * 100 + '%',
            width: event.widthPer * 100 + '%',
            backgroundColor: random_bg_color(),
          }}>
            {event.id} {event.start} {event.duration}
          </div>
        );
      })}
    </div>
  );
};

export default TestCalendar;