import React from "react";
import "./css/AddUser.css";

export default function AddUser({ addUser, setInputText }) {
  return (
    <div className="addUser-container">
      <input
        type="text"
        name="addUser"
        id="addUser"
        className="addUser"
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        tabIndex="1"
      />
      <button
        onClick={() => {
          addUser();
          setInputText("");
        }}
        id="addUserInput"
        className="addUserInput"
        tabIndex="1"
        disabled={
          document.getElementById("addUser") === null ||
          document.getElementById("addUser").value === ""
        }
      >
        <div>
          <span>
            Add <br />
            Player
          </span>
        </div>
      </button>
    </div>
  );
}
