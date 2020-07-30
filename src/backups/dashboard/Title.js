import React from "react";
import "./css/Title.css";

import Points from "./Points";

export default function Title({ user }) {
  return (
    <div className="player-info-container" tabIndex="0">
      <div className="title-container" tabIndex="0">
        <span className="title-header">Player</span>
        <span className="title-name">{user.name}</span>
      </div>
      <Points user={user} tabIndex="0" />
    </div>
  );
}
