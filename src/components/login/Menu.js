import React from "react";
import "./css/Menu.css";
import { v4 as uuidv4 } from "uuid";
import Player from "./Player";
import AddUser from "./AddUser";

export default function Menu({
  users,
  addUser,
  removeUser,
  setInputText,
  getAudio,
  toggleAudio,
  getLanguageState,
}) {
  const language = getLanguageState();

  return (
    <div className="menu-container">
      {users.length === 0 ? (
        language === "EN" ? (
          <span>Enter a name to begin playing</span>
        ) : (
          <span>Ingresa un nombre para jugar</span>
        )
      ) : language === "EN" ? (
        <span>{`${users.length} player${users.length === 1 ? "" : "s"}`}</span>
      ) : (
        <span>{`${users.length} jugador${
          users.length === 1 ? "" : "es"
        }`}</span>
      )}
      <ul>
        {users.map((user) => {
          return (
            <Player
              user={user}
              removeUser={removeUser}
              key={uuidv4()}
              tabIndex="1"
            />
          );
        })}
      </ul>
      <hr />
      <AddUser
        addUser={addUser}
        setInputText={setInputText}
        getAudio={getAudio}
        toggleAudio={toggleAudio}
        getLanguageState={getLanguageState}
      />
    </div>
  );
}
