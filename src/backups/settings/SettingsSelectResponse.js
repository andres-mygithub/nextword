import React from "react";
import "./css/Select.css";

export default function SettingsSelectResponse({ cls, title, users, data }) {
  const options = ["correct", "incorrect", "pasapalabra", "not answered"];
  return (
    <div className="settings-select-container">
      <h3>{title !== null ? title : null}</h3>
      <select
        name="response-select"
        id="response-select"
        className={`settings-select ${cls}`}
      >
        {options.map((item) => (
          <option key={item} value={item === "not answered" ? "null" : item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
