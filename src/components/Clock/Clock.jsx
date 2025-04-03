import { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import "./Clock.css";

const TIMEZONES = [
  { label: "Eastern (EST/EDT)", value: "America/New_York" },
  { label: "Central (CST/CDT)", value: "America/Chicago" },
  { label: "Mountain (MST/MDT)", value: "America/Denver" },
  { label: "Pacific (PST/PDT)", value: "America/Los_Angeles" },
  { label: "Alaska (AKST/AKDT)", value: "America/Anchorage" },
  { label: "Hawaii (HST)", value: "Pacific/Honolulu" },
];

const Clock = () => {
  const [time, setTime] = useState({
    hours: "12",
    minutes: "00",
    seconds: "00",
    meridiem: "AM",
  });

  const [selectedTimezone, setSelectedTimezone] = useState("America/New_York");
  const [primaryColor, setPrimaryColor] = useState("#80f6ff");
  const [secondaryColor, setSecondaryColor] = useState("#fffb2c");
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty(
      "--secondary-color",
      secondaryColor
    );

    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [primaryColor, secondaryColor, isDarkMode]);

  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
  };

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: selectedTimezone };
      const currentDate = new Date().toLocaleString("en-US", options);
      const date = new Date(currentDate);

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
  }, [selectedTimezone]);

  return (
    <div className="clock-wrapper">
      <div className="theme-toggle">
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={30}
          sunColor="#FDB813"
          moonColor="#FFF"
        />
      </div>
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
      <div className="controls">
        <div className="timezone-selector">
          <label htmlFor="timezone">Timezone:</label>
          <select
            id="timezone"
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
        <div className="color-pickers">
          <div className="color-picker">
            <label htmlFor="primary-color">Primary Color:</label>
            <input
              type="color"
              id="primary-color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </div>
          <div className="color-picker">
            <label htmlFor="secondary-color">Secondary Color:</label>
            <input
              type="color"
              id="secondary-color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
