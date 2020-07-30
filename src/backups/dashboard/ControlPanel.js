import React from "react";
import { Link } from "react-router-dom";
import "./css/ControlPanel.css";

export default function ControlPanel({ resetGame, clockStatus }) {
  const openSettings = () => {
    document.getElementById("settings").classList.add("modal--is-open");
  };

  return (
    <div className="control-panel-container">
      <button
        className="settings-btn"
        onClick={openSettings}
        disabled={clockStatus()}
      >
        Settings
      </button>
      <Link to="/">
        <button
          className="exit-btn"
          onClick={() => resetGame()}
          disabled={clockStatus()}
        >
          Exit
        </button>
      </Link>
    </div>
  );
}
