import React from "react";
import "./css/Buttons.css";

export default function Buttons({
  updateState,
  users,
  removeUser,
  closeModal,
}) {
  const saveChanges = () => {
    const player = document.getElementById("player-select").value;
    const timeLeft = parseInt(document.getElementById("time-select").value);
    const currentLetter = document.getElementById("current-letter-select")
      .value;
    const wheelLetter = document.getElementById("wheel-letter-select").value;
    const response =
      document.getElementById("response-select").value === "null"
        ? null
        : document.getElementById("response-select").value;
    var scoreboard = null;

    var userIdx = null;
    for (let i = 0; i < users.users.length; i++) {
      if (users.users[i].name === player) {
        userIdx = i;
        scoreboard = users.users[i].scoreboard;
        break;
      } else userIdx = null;
    }

    for (let i = 0; i < scoreboard.length; i++) {
      if (scoreboard[i].letter === wheelLetter) {
        scoreboard[i].response = response;
      }
    }

    const fieldsToUpdate = [
      { fieldName: "timeLeft", fieldValue: timeLeft },
      { fieldName: "currentLetter", fieldValue: currentLetter },
      { fieldName: "currentLetter", fieldValue: currentLetter },
      { fieldName: "scoreboard", fieldValue: scoreboard },
    ];

    fieldsToUpdate.forEach((field) =>
      updateState(field.fieldName, field.fieldValue, userIdx)
    );
  };

  return (
    <div className="settings-button-container">
      <button
        id="saveChangesInput"
        className="settings-modal-btn input-green"
        tabIndex="0"
        onClick={saveChanges}
      >
        Save Changes
      </button>
      <button
        id="deletePlayerInput"
        className="settings-modal-btn input-red btn-small"
        tabIndex="0"
        onClick={(e) => {
          removeUser(e, "player-select");
          closeModal(e);
        }}
      >
        Delete Player
      </button>
    </div>
  );
}
