import { useEffect, useState } from "react";
import "./TestStopLight.css";

type StopLightState = "red" | "yellow" | "green";

const TestStopLight = () => {
  const [stopLightState, setStopLightState] = useState<StopLightState>("red");

  useEffect(() => {
    console.log("useEffect");
    setTimeout(() => {
      if (stopLightState === "red") {
        setStopLightState("yellow");
      }
      else if (stopLightState === "yellow") {
        setStopLightState("green");
      }
      else if (stopLightState === "green") {
        setStopLightState("red");
      }
    }, 1000);
  }, [stopLightState])

  return (
    <div className="stopLight">
      <div className="red" style={{
        backgroundColor: stopLightState === "red" ? "red" : "gray",
      }} />
      <div className="yellow" style={{
        backgroundColor: stopLightState === "yellow" ? "yellow" : "gray",
      }} />
      <div className="green" style={{
        backgroundColor: stopLightState === "green" ? "green" : "gray",
      }} />
    </div>
  );
};

export default TestStopLight;
