import React from "react";
import "./css/Select.css";

export default function SettingsSelectLetter({ title, users, data, language }) {
  const alphabet = users.letter;
  return (
    <div className="settings-select-container">
      <h3>{title !== null ? title : null}</h3>
      <select
        name="current-letter-select"
        id="current-letter-select"
        className="settings-select"
        defaultValue={data}
      >
        {alphabet.map((letter) =>
          language === "EN" && letter === "ñ" ? null : (
            <option key={letter} value={letter}>
              {letter.toUpperCase()}
            </option>
          )
        )}
      </select>
    </div>
  );
}
