import React from "react";
import "./css/Points.css";

export default function Points({ user }) {
  return (
    <div className="points-container">
      <span>
        {user.points} <span className="points-subheader">pts.</span>
      </span>
    </div>
  );
}
