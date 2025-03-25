import { useState, useEffect } from "react";
import "./Clock.css";

const Clock = () => {
  const [time, setTime] = useState({
    hours: "12",
    minutes: "00",
    seconds: "00",
    meridiem: "AM",
  });

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: "America/New_York" };
      const dateEST = new Date().toLocaleString("en-US", options);
      const date = new Date(dateEST);

      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let meridiem = hours < 12 ? "AM" : "PM";

      hours = hours % 12;
      hours = hours === 0 ? 12 : hours;
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setTime({ hours, minutes, seconds, meridiem });
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="clock">
      <div className="clock__container">
        <span className="clock__time hours">{time.hours}</span>
        <span className="clock__unit">Hours</span>
      </div>
      <div className="clock__container">
        <span className="clock__time minutes">{time.minutes}</span>
        <span className="clock__unit">Minutes</span>
      </div>
      <div className="clock__container">
        <span className="clock__time seconds">{time.seconds}</span>
        <span className="clock__unit">Seconds</span>
      </div>
      <div className="clock__container">
        <span className="clock__time meridiem">{time.meridiem}</span>
      </div>
    </div>
  );
};

export default Clock;
