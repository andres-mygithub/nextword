import React, { useRef } from "react";
import "./css/Select.css";

export default function SettingsSelectWheelLetter({ cls, title, users, data }) {
  const letterSelect = useRef();

  const populateResponse = () => {
    const options = document.getElementById("response-select").options;
    const dropdown = letterSelect.current.value;
    const selectedUser = users.selectedUser;

    var response = selectedUser.scoreboard.filter((letter) =>
      letter.letter && letter.letter === dropdown ? letter.response : null
    );

    response = response.length === 0 ? "null" : response[0].response;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === response) {
        options[i].selected = true;
        return;
      }
    }
  };

  return (
    <div className="settings-select-container">
      <h3>{title !== null ? title : null}</h3>
      <select
        name="wheel-letter-select"
        id="wheel-letter-select"
        ref={letterSelect}
        className={`settings-select ${cls}`}
        onClick={populateResponse}
      >
        {data.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}
