import React from "react";
import "./css/Duration.css";

export default function Duration({ users, language }) {
  return (
    <div className="duration-container">
      <h2>{language === "EN" ? "Duration" : "Duración"}</h2>
      <select
        name="duration"
        id="duration"
        aria-label="Select a game duration time in seconds."
        defaultValue="No Limit"
        disabled={users.length === 0}
      >
        <option value="No Limit">
          {language === "EN" ? "No Limit" : "Sin Tiempo"}
        </option>
        <option value="30">30 sec</option>
        <option value="45">45 sec</option>
        <option value="60">60 sec</option>
        <option value="75">75 sec</option>
        <option value="90">90 sec</option>
        <option value="105">105 sec</option>
        <option value="120">120 sec</option>
        <option value="135">135 sec</option>
        <option value="150">150 sec</option>
        <option value="165">165 sec</option>
        <option value="180">180 sec</option>
        <option value="195">195 sec</option>
        <option value="210">210 sec</option>
        <option value="225">225 sec</option>
        <option value="240">240 sec</option>
        <option value="255">255 sec</option>
        <option value="270">270 sec</option>
        <option value="285">285 sec</option>
        <option value="300">300 sec</option>
      </select>
    </div>
  );
}
