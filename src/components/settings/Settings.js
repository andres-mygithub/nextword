import React from "react";
import Modal from "./Modal";
import "./css/Settings.css";

export default function Settings({
  users,
  updateState,
  removeUser,
  updatePoints,
  currentUserIdx,
  getLanguageState,
}) {
  const closeModal = (e) => {
    const clicked_id = e.target.id;

    if (
      clicked_id === "settings" ||
      clicked_id === "close-modal" ||
      clicked_id === "deletePlayerInput" ||
      clicked_id === "saveChangesInput"
    ) {
      document.getElementById("settings").classList.remove("modal--is-open");
      if (clicked_id === "deletePlayerInput") window.location.reload();
    } else return null;
  };

  return (
    <div className="settings-container " id="settings" onClick={closeModal}>
      <Modal
        closeModal={closeModal}
        users={users}
        updateState={updateState}
        removeUser={removeUser}
        updatePoints={updatePoints}
        currentUserIdx={currentUserIdx}
        getLanguageState={getLanguageState}
      />
    </div>
  );
}
