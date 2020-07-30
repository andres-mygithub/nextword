import React, { useRef } from "react";
import "./css/Select.css";

export default function SettingsSelectTimeLeft({ cls, title, users, data }) {
  const timeSelect = useRef();

  var values = [];
  for (let i = 300; i >= 30; i--) values.push(i);

  return (
    <div className="settings-select-container">
      <h3>{title !== null ? title : null}</h3>
      <select
        name="time-select"
        id="time-select"
        ref={timeSelect}
        className={`settings-select ${cls}`}
        defaultValue={data}
      >
        {values.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
