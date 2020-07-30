import React from "react";
import "./css/Letter.css";

export default function Letter({ user }) {
  return (
    <div className="letter-container">
      <span>
        {user.currentLetter === null ? (
          <div className="player-results">
            <span>{user.points}</span>
            <span>points</span>
          </div>
        ) : (
          user.currentLetter.toUpperCase()
        )}
      </span>
    </div>
  );
}
