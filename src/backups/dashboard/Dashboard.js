import React from "react";
import { v4 as uuidv4 } from "uuid";

import "./css/Dashboard.css";

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

const LOCAL_STORAGE_KEY = "pasapalabras.users";

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
        setCurrentLetter(null);
        setNextLetter(currentUserIdx);
        updateTimeLeft(0, currentUserIdx);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));

        //Clear clock
        clearInterval(interval);
      }

      //Decreate time by 1 second
      updateTimeLeft(user.timeLeft - 1, currentUserIdx);
    }, 1000);
  };

  const manageClock = (value) => {
    //Get refence to the current user
    let user = users[currentUserIdx];
    //Remove active class
    // toggleActiveClass("remove");

    if (value !== "correct" && clockStatus()) setClock(false);

    if (value === "pasapalabra") {
      updateScoreboard(user["currentLetter"], "pasapalabra");
    } else if (value === "incorrect") {
      updateScoreboard(user["currentLetter"], "incorrect");
    } else if (value === "correct") {
      updateScoreboard(user["currentLetter"], "correct");
    }

    /*Update Next Letter*/
    if (
      user.timeLeft > 0 &&
      getTypeCount(null) + getTypeCount("pasapalabra") > 0
    ) {
      setNextLetter(currentUserIdx);
    }

    /*Add active class only if the user is still playing*/
    if (value === "correct") {
      //Remove active class
      // toggleActiveClass("add");
    }

    //Update user points
    updatePoints();

    /*Change user 
      (Uncomment to automatically switch user when either "Incorrect" or "Pasapalabras" is pressed)
    */
    // if (value !== "correct") nextUser();

    //Save to local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  };

  const getCurrentLetter = () => {
    let user = users[currentUserIdx];
    return user.currentLetter;
  };

  return (
    <div className="dashboard-container">
      <Title user={users[currentUserIdx]} key={uuidv4()} />
      <Inicio />
      <Table users={users} currentUserIdx={currentUserIdx} key={uuidv4()} />
      <Clock user={users[currentUserIdx]} />
      <Wheel
        users={users}
        currentUserIdx={currentUserIdx}
        clockStatus={clockStatus}
      />
      <ClockController
        user={users[currentUserIdx]}
        startClock={startClock}
        key={uuidv4()}
      />
      <Nextplayer users={users} nextUser={nextUser} />
      {getCurrentLetter() === null ? null : (
        <Navigation
          user={users[currentUserIdx]}
          manageClock={manageClock}
          getNextLetter={getNextLetter}
          clockStatus={clockStatus}
          key={uuidv4()}
        />
      )}
      <ControlPanel resetGame={resetGame} clockStatus={clockStatus} />
      <Settings
        users={users}
        updateState={updateState}
        removeUser={removeUser}
      />
    </div>
  );
}
