import React from "react";
import "./css/Buttons.css";

export default function Buttons({
  updateState,
  updatePoints,
  users,
  removeUser,
  closeModal,
  setSelectedUser,
  language,
}) {
  const saveChanges = () => {
    const player = document.getElementById("player-select").value;
    const timeLeft = parseInt(
      document.getElementById("time-select").value.toLowerCase()
    );
    const currentLetter = document.getElementById("current-letter-select")
      .value;
    const wheelLetter = document
      .getElementById("wheel-letter-select")
      .value.toLowerCase();
    const response =
      document.getElementById("response-select").value === "null"
        ? null
        : document.getElementById("response-select").value.toLowerCase();
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
      { fieldName: "scoreboard", fieldValue: scoreboard },
    ];

    fieldsToUpdate.forEach((field) =>
      updateState(field.fieldName, field.fieldValue, userIdx)
    );

    //Updated points
    updatePoints();

    //Reset selected user
    setSelectedUser(null);
  };

  return (
    <div className="settings-button-container">
      <button
        id="saveChangesInput"
        className="settings-modal-btn input-green"
        tabIndex="0"
        onClick={saveChanges}
      >
        <span>{language === "EN" ? "Save Changes" : "Guardar Cambios"}</span>
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
        <span>{language === "EN" ? "Delete Player" : "Eliminar Jugador"}</span>
      </button>
    </div>
  );
}
