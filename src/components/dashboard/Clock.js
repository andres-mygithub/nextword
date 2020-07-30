import React, { useEffect } from "react";
import "./css/Clock.css";

export default function Clock({
  user,
  key,
  updateTimeLeft,
  currentUserIdx,
  clockStatus,
}) {
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

  var timeLeft = user.timeLeft;

  return (
    <div className="clock-container" key={key}>
      <button
        className="timer-btn timer-up"
        disabled={clockStatus()}
        tabIndex="0"
        aria-label="Increase the user's time left by 1 second"
        onClick={() => {
          if (timeLeft >= 0) {
            timeLeft++;
            updateTimeLeft(timeLeft, currentUserIdx);
          }
        }}
      >
        <span>+</span>
      </button>
      <span className="clock-time">
        {user.timeLeft > 0 ? user.timeLeft : 0}
      </span>
      <span className="clock-subheader"> sec </span>
      <button
        className="timer-btn timer-down"
        tabIndex="0"
        aria-label="Decrease the user's time left by 1 second"
        disabled={clockStatus()}
        onClick={() => {
          if (timeLeft > 0) {
            timeLeft--;
            updateTimeLeft(timeLeft--, currentUserIdx);
          }
        }}
      >
        <span>-</span>
      </button>
    </div>
  );
}
