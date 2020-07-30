import React from "react";
import "./css/Select.css";

export default function SettingsSelectPlayer({
  cls,
  title,
  users,
  populateDropdowns,
  language,
}) {
  return (
    <div className="settings-select-container">
      <h3>{title !== null ? title : null}</h3>
      <select
        name="player-select"
        id="player-select"
        className={`settings-select ${cls}`}
        onClick={(e) => populateDropdowns(e.currentTarget.value)}
        onChange={(e) => populateDropdowns(e.currentTarget.value)}
      >
        <option key="Select Player" value="select player">
          {language === "EN" ? "Select Player" : "Elige Jugador"}
        </option>
        {users.map((user) => {
          return (
            <option key={user.name} value={user.name}>
              {user.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
