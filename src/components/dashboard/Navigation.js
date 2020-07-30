import React from "react";
import { v4 as uuidv4 } from "uuid";

import "./css/Navigation.css";

export default function Navigation({
  user,
  manageClock,
  clockStatus,
  getTypeCount,
  getNextLetter,
}) {
  return (
    <div className="navigation-container">
      <button
        onClick={() => {
          manageClock("correct");
        }}
        disabled={
          (user.timeLeft < 1 && user.gameDuration !== null) ||
          clockStatus() === false
        }
        className="navigation-btn correct-btn"
        aria-label="Mark current letter as correct. Press keyboard letter 'C'"
        key={uuidv4()}
      >
        <div className="navigation-icons correct-icon"></div>
      </button>
      <button
        onClick={() => manageClock("incorrect")}
        disabled={
          (user.timeLeft < 1 && user.gameDuration !== null) ||
          clockStatus() === false
        }
        className="navigation-btn incorrect-btn"
        aria-label="Mark current letter as incorrect. Press keyboard letter 'V'"
        key={uuidv4()}
      >
        <div className="navigation-icons incorrect-icon"></div>
      </button>
      <button
        onClick={() => manageClock("pasapalabra")}
        disabled={
          (user.timeLeft < 1 && user.gameDuration !== null) ||
          clockStatus() === false ||
          getNextLetter() === false ||
          getTypeCount("pasapalabra") + getTypeCount(null) === 0
        }
        className="navigation-btn pasapalabra-btn"
        aria-label="Mark current letter as a skipped word. Will pause the clock. Press keyboard right-arrow key."
        key={uuidv4()}
      >
        <div className="navigation-icons pasapalabra-icon"></div>
      </button>
    </div>
  );
}
