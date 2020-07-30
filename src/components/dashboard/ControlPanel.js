import React from "react";
import { Link } from "react-router-dom";
import "./css/ControlPanel.css";

export default function ControlPanel({
  resetGame,
  clockStatus,
  getLanguageState,
}) {
  const openSettings = () => {
    document.getElementById("settings").classList.add("modal--is-open");
  };

  const language = getLanguageState();
  return (
    <div className="control-panel-container">
      <button
        className="settings-btn"
        onClick={openSettings}
        disabled={clockStatus()}
        aria-label="Go to the settings modal to modify user properties."
      >
        {language === "EN" ? "Settings" : "Ajustes"}
      </button>
      <Link to="/">
        <button
          className="exit-btn"
          onClick={() => resetGame()}
          disabled={clockStatus()}
          aria-label="Exit the game and go back to the login screen. Will erase game history."
        >
          {language === "EN" ? "Exit" : "Salir"}
        </button>
      </Link>
    </div>
  );
}
