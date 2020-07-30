import React from "react";
import "./css/Select.css";

export default function SettingsSelectResponse({ title, language }) {
  const options = ["correct", "incorrect", "pasapalabra", "not answered"];
  return (
    <div className="settings-select-container">
      <h3>{title !== null ? title : null}</h3>
      <select
        name="response-select"
        id="response-select"
        className="settings-select"
      >
        {options.map((item) => (
          <option key={item} value={item === "not answered" ? "null" : item}>
            {language === "EN"
              ? item === "pasapalabra"
                ? "next word"
                : item
              : item === "correct"
              ? "correcto"
              : item === "incorrect"
              ? "incorrecto"
              : item === "pasapalabra"
              ? "pasapalabra"
              : item === "not answered"
              ? "sin responder"
              : null}
          </option>
        ))}
      </select>
    </div>
  );
}
