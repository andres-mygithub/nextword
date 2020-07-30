import React from "react";
import "./css/Title.css";

import Points from "./Points";

export default function Title({ user, getLanguageState }) {
  return (
    <div className="player-info-container">
      <div className="title-container">
        <span className="title-header">
          {getLanguageState() === "EN" ? "Player" : "Jugador"}
        </span>
        <span className="title-name">{user.name}</span>
      </div>
      <Points user={user} />
    </div>
  );
}
