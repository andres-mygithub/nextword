import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Login.css";

import Title from "./Title";
import Menu from "./Menu";
import Duration from "./Duration";
import Penalize from "./Penalize";
import Language from "./Language";

const LOCAL_STORAGE_KEY_USERS = "pasapalabras.users";

export default function Login({
  users,
  addUser,
  removeUser,
  resetGame,
  updateState,
  getAudio,
  toggleAudio,
  setPenalizeState,
  getPenalizeState,
  setLanguageState,
  getLanguageState,
  updateScoreboardLanguage,
  updatePoints,
  getTypeCount,
}) {
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users));
  }, [users]);

  const [language, setLanguage] = useState(getLanguageState());
  useEffect(() => {
    setLanguage(getLanguageState());
  }, [setLanguage, getLanguageState]);

  const [inputText, setInputText] = useState("");
  useEffect(() => {
    if (inputText.length === 0) {
      document
        .getElementById("addUserBtn")
        .setAttribute("disabled", "disabled");
    } else document.getElementById("addUserBtn").removeAttribute("disabled");
  }, [inputText]);

  const setGameDuration = () => {
    let duration = parseInt(document.getElementById("duration").value);
    users.forEach((user, idx) => {
      //Update timeLeft and Game Duration fields
      updateState("timeLeft", duration, idx);
      updateState("gameDuration", duration, idx);
      return duration;
    });
  };

  return (
    <div className="login-container">
      <Title getLanguageState={getLanguageState} />
      <Menu
        users={users}
        removeUser={removeUser}
        addUser={addUser}
        setInputText={setInputText}
        getAudio={getAudio}
        toggleAudio={toggleAudio}
        getLanguageState={getLanguageState}
        tabIndex="1"
      />
      <Language
        users={users}
        setLanguageState={setLanguageState}
        getLanguageState={getLanguageState}
        updateScoreboardLanguage={updateScoreboardLanguage}
        updatePoints={updatePoints}
      />
      <Penalize
        setPenalizeState={setPenalizeState}
        getPenalizeState={getPenalizeState}
        language={language}
        users={users}
        updatePoints={updatePoints}
      />
      <Duration users={users} language={language} tabIndex="0" />
      <Link
        to="/match"
        className="start-container"
        tabIndex="0"
        onClick={(e) => {
          if (document.querySelector(".start-btn").disabled) e.preventDefault();
        }}
      >
        <button
          className="start-btn"
          aria-label="Start the game. Redirects page to the game dashboard."
          disabled={users.length === 0}
          onClick={() => {
            setGameDuration();
          }}
        >
          {language === "EN" ? "Start Game" : "Iniciar"}
        </button>
      </Link>
      <Link
        to="/"
        className="reset-container"
        tabIndex="0"
        onClick={(e) => {
          if (document.querySelector(".start-btn").disabled) e.preventDefault();
        }}
      >
        <button
          className="reset-btn"
          aria-label="Resets game and deletes any stored players."
          onClick={() => resetGame()}
          disabled={users.length === 0}
        >
          {language === "EN" ? "Reset Game" : "Reiniciar"}
        </button>
      </Link>
    </div>
  );
}
