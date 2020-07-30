import React from "react";
import "./css/Select.css";

export default function SettingsSelectPlayer({
  cls,
  title,
  users,
  populateDropdowns,
  runDropdownUpdates,
}) {
  return (
    <div className="settings-select-container">
      <h3>{title !== null ? title : null}</h3>
      <select
        name="player-select"
        id="player-select"
        className={`settings-select ${cls}`}
        onClick={(e) => populateDropdowns(e.currentTarget.value)}
        onChange={() => runDropdownUpdates()}
      >
        {users.map((user) => {
          return <option key={user.name}>{user.name}</option>;
        })}
      </select>
    </div>
  );
}
