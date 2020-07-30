import React from "react";
import "./css/AddUser.css";

export default function AddUser({
  addUser,
  setInputText,
  getAudio,
  toggleAudio,
  getLanguageState,
}) {
  const language = getLanguageState();

  return (
    <div className="addUser-container">
      <input
        type="text"
        name="addUserInput"
        id="addUserInput"
        className="addUserInput"
        aria-label="Enter a player name."
        placeholder={
          language === "EN" ? "Enter player name" : "Ingresa un nombre"
        }
        onBlur={(e) => {
          e.persist();
          e.target.placeholder =
            language === "EN" ? "Enter player name" : "Ingresa un nombre";
        }}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        tabIndex="1"
      />
      <button
        onClick={() => {
          addUser();
          toggleAudio("start", getAudio("addplayer"));
          setInputText("");
        }}
        id="addUserBtn"
        className="addUserBtn"
        aria-label="Add a new player to the game."
        tabIndex="1"
        disabled={
          document.getElementById("addUserInput") === null ||
          document.getElementById("addUserInput").value === ""
        }
      >
        <div>
          {language === "EN" ? (
            <span>
              Add <br />
              Player
            </span>
          ) : (
            <span>
              Agregar <br />
              Jugador
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
