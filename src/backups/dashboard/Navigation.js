import React from "react";
import { v4 as uuidv4 } from "uuid";

import "./css/Navigation.css";

export default function Navigation({
  user,
  manageClock,
  clockStatus,
  getNextLetter,
}) {
  return (
    <div className="navigation-container">
      <button
        onClick={() => manageClock("correct")}
        disabled={user.timeLeft < 1 || clockStatus() === false}
        className="navigation-btn correct-btn"
        key={uuidv4()}
      >
        <div className="navigation-icons correct-icon"></div>
      </button>
      <button
        onClick={() => manageClock("incorrect")}
        disabled={user.timeLeft < 1 || clockStatus() === false}
        className="navigation-btn incorrect-btn"
        key={uuidv4()}
      >
        <div className="navigation-icons incorrect-icon"></div>
      </button>
      <button
        onClick={() => manageClock("pasapalabra")}
        disabled={
          user.timeLeft < 1 ||
          clockStatus() === false ||
          getNextLetter() === false
        }
        className="navigation-btn pasapalabra-btn"
        key={uuidv4()}
      >
        <div className="navigation-icons pasapalabra-icon"></div>
      </button>
    </div>
  );
}
