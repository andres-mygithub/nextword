import React, { useEffect } from "react";
import "./css/Clock.css";

export default function Clock({ user, key }) {
  useEffect(() => {
    const borderColor = (() => {
      const threshold = 1 / 7;
      let timeLeft = user.timeLeft;
      let gameDuration = user.gameDuration;
      let result = "#ffffff";

      if (timeLeft > gameDuration * threshold * 4.5) result = "#429751";
      //Dark Green
      else if (timeLeft > gameDuration * threshold * 3.5) result = "#7ee306";
      //Light Green
      else if (timeLeft > gameDuration * threshold * 2.5) result = "#bff20f";
      //Lime Green
      else if (timeLeft > gameDuration * threshold * 1.6) result = "#f2e50f";
      //Yellow
      else if (timeLeft > gameDuration * threshold * 0.8) result = "#f29a0f";
      //Orange
      else result = "#ec0000"; //Red

      return result;
    })();

    document.querySelector(
      ".clock-container"
    ).style.border = `7px solid ${borderColor}`;
  }, [user.timeLeft, user.gameDuration]);

  return (
    <div className="clock-container" key={key}>
      <span className="clock-time">
        {user.timeLeft > 0 ? user.timeLeft : 0}
      </span>
      <span className="clock-subheader"> sec </span>
    </div>
  );
}
