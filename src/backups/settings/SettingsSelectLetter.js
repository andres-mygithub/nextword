import React from "react";
import "./css/Select.css";

export default function SettingsSelectLetter({ cls, title, users, data }) {
  const alphabet = users.letter;

  return (
    <div className="settings-select-container">
      <h3>{title !== null ? title : null}</h3>
      <select
        name="current-letter-select"
        id="current-letter-select"
        className={`settings-select ${cls}`}
        defaultValue={data}
      >
        {alphabet.map((letter) => (
          <option key={letter} value={letter}>
            {letter}
          </option>
        ))}
      </select>
    </div>
  );
}
