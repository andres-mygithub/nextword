import React from "react";
import { v4 as uuidv4 } from "uuid";

import "./css/Dashboard.css";

import useKey from "../../functions/keyboard";
import Clock from "./Clock";
import Navigation from "./Navigation";
import ClockController from "./ClockController";
import Title from "./Title";
import Table from "./Table";
import Wheel from "./Wheel";
import Nextplayer from "./Nextplayer";
import Inicio from "./Inicio";
import ControlPanel from "./ControlPanel";
import Settings from "../settings/Settings";

const LOCAL_STORAGE_KEY_USERS = "pasapalabras.users";

export default function Dashboard({
  users,
  currentUserIdx,
  updateTimeLeft,
  setClock,
  clockStatus,
  nextUser,
  updatePoints,
  updateState,
  getTypeCount,
  updateScoreboard,
  getNextLetter,
  setNextLetter,
  setCurrentLetter,
  resetGame,
  removeUser,
  getAudio,
  toggleAudio,
  getLanguageState,
}) {
  const startClock = () => {
    //Get a reference to the current user
    let user = users[currentUserIdx];

    /*If clock is already running, then leave
      If clock isn't running, then start clock
    */
    if (clockStatus()) return;
    else {
      setClock(true);
      // toggleActiveClass("add");
    }

    if (user.gameDuration !== null && !isNaN(user.gameDuration)) {
      const interval = setInterval(() => {
        if (!clockStatus()) clearInterval(interval);
        /*
          If clock reaches 0 seconds, then update unaswered
          scoreboard questions with "incorrect"
        */
        if (
          user.timeLeft <= 1 ||
          getTypeCount(null) + getTypeCount("pasapalabra") === 0
        ) {
          //Turn off clock
          setClock(false);

          toggleAudio("stop", getAudio("background"));
          toggleAudio("play", getAudio("timesup"));

          //Remove active class
          // toggleActiveClass("remove");

          //Get a list of all unanswered questions
          let filteredScoreBoard = user.scoreboard.filter((el) => {
            return el.response === null || el.response === "pasapalabra";
          });

          //Set responses to "incorrect"
          filteredScoreBoard.forEach((el) => {
            updateScoreboard(el.letter, "incorrect");
          });

          //Set state of user's current letter to null and get next letter
          setCurrentLetter("a");
          setNextLetter(currentUserIdx);
          updateTimeLeft(0, currentUserIdx);
          updatePoints();
          localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users));

          //Clear clock
          clearInterval(interval);
        }

        //Decreate time by 1 second
        updateTimeLeft(user.timeLeft - 1, currentUserIdx);
      }, 1000);
    }
  };

  const manageClock = (value) => {
    //Get refence to the current user
    let user = users[currentUserIdx];

    //Remove active class
    // toggleActiveClass("remove");

    if (value !== "correct" && clockStatus()) {
      setClock(false);
      toggleAudio("stop", getAudio("background"));
    }
    if (value === "pasapalabra") {
      toggleAudio("play", getAudio("pasapalabra"));
      updateScoreboard(user["currentLetter"], "pasapalabra");
    } else if (value === "incorrect") {
      toggleAudio("play", getAudio("incorrect"));
      updateScoreboard(user["currentLetter"], "incorrect");
    } else if (value === "correct") {
      toggleAudio("play", getAudio("correct"));
      updateScoreboard(user["currentLetter"], "correct");
    }

    /*Update Next Letter*/
    if (
      (user.timeLeft > 0 ||
        user.gameDuration === null ||
        isNaN(user.gameDuration)) &&
      getTypeCount(null) + getTypeCount("pasapalabra") > 0
    ) {
      setNextLetter(currentUserIdx);
    } else {
      setClock(false);
      toggleAudio("stop", getAudio("background"));
    }

    //Update user points
    updatePoints();

    /*Change user 
    (Uncomment to automatically switch user when either "Incorrect" or "Pasapalabras" is pressed)
    if (value !== "correct") nextUser();
    */

    //Save to local storage
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users));
  };

  const getCurrentLetter = () => {
    let user = users[currentUserIdx];
    return user.currentLetter;
  };

  function toggleTooltip(id, message) {
    const element = document.getElementById(id);
    element.innerText = message;

    //Add class to temporarily show tooltip
    element.classList.add("tooltip-is-active");

    //After 2 seconds, remove the tooltip
    setTimeout(() => {
      document.getElementById(id).classList.remove("tooltip-is-active");
    }, 2000);
  }

  // Uncomment to add a keyboard event listener for the 'Start button'
  // function handleClock() {
  //   if (!clockStatus()) {
  //     startClock();
  //     toggleAudio("start", getAudio("background"));
  //   } else {
  //     toggleAudio("stop", getAudio("background"));
  //     setClock(false);
  //   }
  // }

  function handleNextPlayer() {
    if (users.length === 1) {
      toggleTooltip("next-player-tooltip", "There are no other players.");
    } else if (clockStatus()) {
      toggleTooltip(
        "next-player-tooltip",
        "Can't change player while clock is running."
      );
    } else {
      toggleAudio("start", getAudio("nextplayer"));
      toggleAudio("stop", getAudio("background"));
      nextUser();
    }
  }

  function handleCorrect() {
    if (clockStatus()) manageClock("correct");
    else
      toggleTooltip(
        "start-tooltip",
        "Press the start button to begin playing."
      );
  }

  function handleIncorrect() {
    if (clockStatus()) manageClock("incorrect");
    else
      toggleTooltip(
        "start-tooltip",
        "Press the start button to begin playing."
      );
  }

  function handleNextWord() {
    if (clockStatus() && getTypeCount("pasapalabra") + getTypeCount(null) === 1)
      toggleTooltip("start-tooltip", "No other letters to skip.");
    else if (clockStatus()) manageClock("pasapalabra");
    else
      toggleTooltip(
        "start-tooltip",
        "Press the start button to begin playing."
      );
  }

  // useKey("Space", handleClock);
  useKey("KeyN", handleNextPlayer);
  useKey("KeyC", handleCorrect);
  useKey("KeyV", handleIncorrect);
  useKey("ArrowRight", handleNextWord);

  return (
    <div className="dashboard-container">
      <Title
        user={users[currentUserIdx]}
        getLanguageState={getLanguageState}
        key={uuidv4()}
      />
      <Inicio getLanguageState={getLanguageState} />
      <Table
        users={users}
        currentUserIdx={currentUserIdx}
        key={uuidv4()}
        getLanguageState={getLanguageState}
      />
      {users[currentUserIdx].gameDuration === null ||
      isNaN(users[currentUserIdx].gameDuration) ? null : (
        <Clock
          user={users[currentUserIdx]}
          updateTimeLeft={updateTimeLeft}
          currentUserIdx={currentUserIdx}
          clockStatus={clockStatus}
          getLanguageState={getLanguageState}
        />
      )}
      <Wheel
        users={users}
        currentUserIdx={currentUserIdx}
        clockStatus={clockStatus}
        getLanguageState={getLanguageState}
      />
      <ClockController
        user={users[currentUserIdx]}
        startClock={startClock}
        clockStatus={clockStatus}
        setClock={setClock}
        getTypeCount={getTypeCount}
        getAudio={getAudio}
        toggleAudio={toggleAudio}
        getLanguageState={getLanguageState}
        key={uuidv4()}
      />
      <Nextplayer
        users={users}
        nextUser={nextUser}
        clockStatus={clockStatus}
        getAudio={getAudio}
        toggleAudio={toggleAudio}
        getLanguageState={getLanguageState}
      />
      {getCurrentLetter() === null ? null : (
        <Navigation
          user={users[currentUserIdx]}
          manageClock={manageClock}
          getNextLetter={getNextLetter}
          getTypeCount={getTypeCount}
          clockStatus={clockStatus}
          useKey={useKey}
          key={uuidv4()}
        />
      )}
      <ControlPanel
        resetGame={resetGame}
        clockStatus={clockStatus}
        getLanguageState={getLanguageState}
      />
      <Settings
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
