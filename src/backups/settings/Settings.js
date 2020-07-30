import React from "react";
import Modal from "./Modal";
import "./css/Settings.css";

export default function Settings({ users, updateState, removeUser }) {
  const closeModal = (e) => {
    const clicked_id = e.target.id;

    if (
      clicked_id === "settings" ||
      clicked_id === "close-modal" ||
      clicked_id === "deletePlayerInput"
    ) {
      document.getElementById("settings").classList.remove("modal--is-open");
      window.location.reload();
    } else return null;
  };
  return (
    <div className="settings-container " id="settings" onClick={closeModal}>
      <Modal
        closeModal={closeModal}
        users={users}
        updateState={updateState}
        removeUser={removeUser}
      />
    </div>
  );
}
