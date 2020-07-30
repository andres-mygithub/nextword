import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./css/Nextplayer.css";

export default function Nextplayer({
  users,
  nextUser,
  getAudio,
  toggleAudio,
  clockStatus,
  getLanguageState,
}) {
  const language = getLanguageState();
  return (
    <div className="next-player-container">
      <button
        onClick={() => {
          toggleAudio("stop", getAudio("background"));
          toggleAudio("start", getAudio("nextplayer"));
          nextUser();
        }}
        key={uuidv4()}
        disabled={users.length === 1 || clockStatus()}
        aria-label="Toggle to the next player. Press keyboard letter 'N'"
      >
        {language === "EN" ? "Next Player" : "Sig. Jugador"}
      </button>
      <div id="next-player-tooltip" className="tooltip tooltip-bottom"></div>
    </div>
  );
}
