import React from "react";
import "./css/Title.css";

export default function Title() {
  return (
    <div className="settings-title-container">
      <h1>Player Settings</h1>
      <button className="close-modal" id="close-modal" />
    </div>
  );
}
