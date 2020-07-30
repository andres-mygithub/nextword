import React from "react";
import { v4 as uuidv4 } from "uuid";

import "./css/Clock-Controller.css";

const ClockController = React.memo(({ user, startClock }) => {
  return (
    <div className="clock-controller-container">
      <button
        onClick={startClock}
        key={uuidv4()}
        disabled={user.timeLeft <= 0 || user.currentLetter === null}
        className="clock-controller-btn"
      >
        Start{" "}
      </button>{" "}
    </div>
  );
});
export default ClockController;
