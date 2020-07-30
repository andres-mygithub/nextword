import React from "react";
import "./css/Player.css";

export default function Player({ user, removeUser }) {
  return (
    <li key={user.name} className="player-container">
      <div className="player-name" tabIndex="1">
        <span>{user.name}</span>
      </div>
      <button
        onClick={(e) => {
          e.persist();
          removeUser(e);
        }}
        id={user.name}
        className="trash-btn"
        tabIndex="1"
      >
        <div className="trash-icon"></div>
      </button>
    </li>
  );
}
