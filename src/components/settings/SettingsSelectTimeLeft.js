import React, { useRef } from "react";
import "./css/Select.css";

export default function SettingsSelectTimeLeft({
  title,
  data,
  language,
  users,
}) {
  const timeSelect = useRef();
  const duration = users[0].gameDuration;

  var values = [];
  if (duration === null) values.push("No Limit");
  else {
    for (let i = 300; i >= 0; i--) values.push(i);
  }

  return (
    <div className="settings-select-container">
      <h3>{title !== null ? title : null}</h3>
      <select
        name="time-select"
        id="time-select"
        ref={timeSelect}
        className="settings-select"
        defaultValue={!isNaN(data) ? data : "No Limit"}
      >
        {values.map((value) => {
          return (
            <option key={value} value={value}>
              {language === "ES" && value === "No Limit" ? "Sin Limite" : value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
