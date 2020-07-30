import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Login.css";

import Title from "./Title";
import Menu from "./Menu";
import Duration from "./Duration";

const LOCAL_STORAGE_KEY = "pasapalabras.users";

export default function Login({
  users,
  addUser,
  removeUser,
  resetGame,
  updateState,
}) {
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const [inputText, setInputText] = useState("");
  useEffect(() => {
    if (inputText.length === 0)
      document
        .getElementById("addUserInput")
        .setAttribute("disabled", "disabled");
    else document.getElementById("addUserInput").removeAttribute("disabled");
  }, [inputText]);

  const setGameDuration = () => {
    let duration = parseInt(document.getElementById("duration").value);
    users.map((user, idx) => {
      //Update timeLeft and Game Duration fields
      updateState("timeLeft", duration, idx);
      updateState("gameDuration", duration, idx);
      return duration;
    });
  };

  return (
    <div className="login-container">
      <Title />
      <Menu
        users={users}
        removeUser={removeUser}
        addUser={addUser}
        setInputText={setInputText}
        tabIndex="1"
      />
      <Duration users={users} tabIndex="0" />
      <Link to="/match" className="start-container" tabIndex="0">
        <button
          className="start-btn"
          disabled={users.length === 0}
          onClick={setGameDuration}
        >
          Start Game
        </button>
      </Link>
      <Link to="/" className="reset-container" tabIndex="0">
        <button
          className="reset-btn"
          onClick={() => resetGame()}
          disabled={users.length === 0}
        >
          Reset Game
        </button>
      </Link>
    </div>
  );
}
