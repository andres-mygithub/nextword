import React from "react";
import { v4 as uuidv4 } from "uuid";

import "./css/Clock-Controller.css";

export default function ClockController({
  user,
  startClock,
  setClock,
  clockStatus,
  getTypeCount,
  getAudio,
  toggleAudio,
  getLanguageState,
}) {
  const language = getLanguageState();
  return (
    <div className="clock-controller-container">
      <button
        onClick={() => {
          if (!clockStatus()) {
            startClock();
            toggleAudio("play", getAudio("background"));
          } else {
            setClock(false);
            toggleAudio("stop", getAudio("background"));
          }
        }}
        key={uuidv4()}
        disabled={
          (user.timeLeft <= 0 &&
            isNaN(user.gameDuration) &&
            isNaN(user.timeLeft)) ||
          user.currentLetter === null ||
          getTypeCount("pasapalabra") + getTypeCount(null) === 0
        }
        aria-label="Start or pause the clock. Press the spacebar key to toggle the clock."
        className={`clock-controller-btn ${
          !clockStatus() ? "start start-icon" : "pause pause-icon"
        }`}
      >
        {language === "EN"
          ? !clockStatus()
            ? "start"
            : "pause"
          : !clockStatus()
          ? "iniciar"
          : "pausar"}
      </button>
      <div className="spacebar-icon"></div>
      <div id="start-tooltip" className="tooltip tooltip-bottom"></div>
    </div>
  );
}
