import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

//Audios
import backgroundsound from "./assets/sounds/background-sound-4.wav";
import correctsound from "./assets/sounds/pasapalabra-5.wav";
import incorrectsound from "./assets/sounds/incorrect-2.wav";
import pasapalabrasound from "./assets/sounds/pasapalabra-6.wav";
import nextplayersound from "./assets/sounds/gameover.wav";
import timesupsound from "./assets/sounds/times-up.wav";
import addplayersound from "./assets/sounds/addplayer.wav";

import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";

//Create local storage key
const LOCAL_STORAGE_KEY_USERS = "pasapalabras.users";
const LOCAL_STORAGE_KEY_PENALIZE = "pasapalabras.penalize";
const LOCAL_STORAGE_KEY_LANGUAGE = "pasapalabras.language";

export default class App extends Component {
  state = {
    users:
      localStorage.getItem(LOCAL_STORAGE_KEY_USERS) === null
        ? []
        : JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USERS)),
    currentUserIdx: 0,
    audio: {
      background: this.createAudio(backgroundsound, 0.12, true),
      correct: this.createAudio(correctsound, 0.2, false),
      incorrect: this.createAudio(incorrectsound, 0.1, false),
      pasapalabra: this.createAudio(pasapalabrasound, 0.1, false),
      nextplayer: this.createAudio(nextplayersound, 0.1, false),
      timesup: this.createAudio(timesupsound, 0.1, false),
      addplayer: this.createAudio(addplayersound, 0.1, false),
    },
    clockRunning: false,
  };

  componentDidMount() {
    if (localStorage.getItem(LOCAL_STORAGE_KEY_PENALIZE) === null)
      localStorage.setItem(LOCAL_STORAGE_KEY_PENALIZE, false);
    if (localStorage.getItem(LOCAL_STORAGE_KEY_LANGUAGE) === null)
      localStorage.setItem(LOCAL_STORAGE_KEY_LANGUAGE, '"EN"');
  }

  addUser() {
    this.setState({
      users: [
        ...this.state.users,
        {
          name: document.getElementById("addUserInput").value,
          timeLeft: null,
          gameDuration: null,
          currentLetter: "a",
          scoreboard: [
            {
              letter: "a",
              response: null,
            },
            {
              letter: "b",
              response: null,
            },
            {
              letter: "c",
              response: null,
            },
            {
              letter: "d",
              response: null,
            },
            {
              letter: "e",
              response: null,
            },
            {
              letter: "f",
              response: null,
            },
            {
              letter: "g",
              response: null,
            },
            {
              letter: "h",
              response: null,
            },
            {
              letter: "i",
              response: null,
            },
            {
              letter: "j",
              response: null,
            },
            {
              letter: "k",
              response: null,
            },
            {
              letter: "l",
              response: null,
            },
            {
              letter: "m",
              response: null,
            },
            {
              letter: "n",
              response: null,
            },
            {
              letter: "ñ",
              response: null,
            },
            {
              letter: "o",
              response: null,
            },
            {
              letter: "p",
              response: null,
            },
            {
              letter: "q",
              response: null,
            },
            {
              letter: "r",
              response: null,
            },
            {
              letter: "s",
              response: null,
            },
            {
              letter: "t",
              response: null,
            },
            {
              letter: "u",
              response: null,
            },
            {
              letter: "v",
              response: null,
            },
            {
              letter: "w",
              response: null,
            },
            {
              letter: "x",
              response: null,
            },
            {
              letter: "y",
              response: null,
            },
            {
              letter: "z",
              response: null,
            },
          ],
          points: 0,
        },
      ],
    });
    //Clear Input Field
    document.getElementById("addUserInput").value = "";
  }

  updateState(field, value, currentUserIdx) {
    let temp = [...this.state.users];
    temp[currentUserIdx][field] = value;

    this.setState({
      users: temp,
    });

    //update local storage
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(temp));
  }

  setPenalizeState(value) {
    //update local storage
    localStorage.setItem(LOCAL_STORAGE_KEY_PENALIZE, JSON.stringify(value));
  }

  getPenalizeState() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_PENALIZE));
  }

  setLanguageState(value) {
    //update local storage
    localStorage.setItem(LOCAL_STORAGE_KEY_LANGUAGE, JSON.stringify(value));
  }

  getLanguageState() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LANGUAGE));
  }

  updateScoreboardLanguage(value) {
    let temp = [...this.state.users];

    temp.forEach((user) => {
      let responses = {};

      user.scoreboard.forEach((item) => {
        responses[item.letter] = item.response;
      });

      user.scoreboard = [
        {
          letter: "a",
          response: responses["a"] === undefined ? null : responses["a"],
        },
        {
          letter: "b",
          response: responses["b"] === undefined ? null : responses["b"],
        },
        {
          letter: "c",
          response: responses["c"] === undefined ? null : responses["c"],
        },
        {
          letter: "d",
          response: responses["d"] === undefined ? null : responses["d"],
        },
        {
          letter: "e",
          response: responses["e"] === undefined ? null : responses["e"],
        },
        {
          letter: "f",
          response: responses["f"] === undefined ? null : responses["f"],
        },
        {
          letter: "g",
          response: responses["g"] === undefined ? null : responses["g"],
        },
        {
          letter: "h",
          response: responses["h"] === undefined ? null : responses["h"],
        },
        {
          letter: "i",
          response: responses["i"] === undefined ? null : responses["i"],
        },
        {
          letter: "j",
          response: responses["j"] === undefined ? null : responses["j"],
        },
        {
          letter: "k",
          response: responses["k"] === undefined ? null : responses["k"],
        },
        {
          letter: "l",
          response: responses["l"] === undefined ? null : responses["l"],
        },
        {
          letter: "m",
          response: responses["m"] === undefined ? null : responses["m"],
        },
        {
          letter: "n",
          response: responses["n"] === undefined ? null : responses["n"],
        },
        {
          letter: "ñ",
          response: responses["ñ"] === undefined ? null : responses["ñ"],
        },
        {
          letter: "o",
          response: responses["o"] === undefined ? null : responses["o"],
        },
        {
          letter: "p",
          response: responses["p"] === undefined ? null : responses["p"],
        },
        {
          letter: "q",
          response: responses["q"] === undefined ? null : responses["q"],
        },
        {
          letter: "r",
          response: responses["r"] === undefined ? null : responses["r"],
        },
        {
          letter: "s",
          response: responses["s"] === undefined ? null : responses["s"],
        },
        {
          letter: "t",
          response: responses["t"] === undefined ? null : responses["t"],
        },
        {
          letter: "u",
          response: responses["u"] === undefined ? null : responses["u"],
        },
        {
          letter: "v",
          response: responses["v"] === undefined ? null : responses["v"],
        },
        {
          letter: "w",
          response: responses["w"] === undefined ? null : responses["w"],
        },
        {
          letter: "x",
          response: responses["x"] === undefined ? null : responses["x"],
        },
        {
          letter: "y",
          response: responses["y"] === undefined ? null : responses["y"],
        },
        {
          letter: "z",
          response: responses["z"] === undefined ? null : responses["a"],
        },
      ];
    });

    this.setState({
      users: temp,
    });

    //update local storage
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(temp));
  }

  removeUser(e, id) {
    let userToDelete = id === undefined ? e.target.id : id;

    if (id) userToDelete = document.getElementById(userToDelete).value;

    const oldUsers = this.state.users;
    const newUsers = oldUsers.filter((user) => user.name !== userToDelete);

    //Update state
    this.setState({
      users: newUsers,
    });

    //Update Local Storage
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(newUsers));
  }

  resetGame() {
    //Reset state
    this.setState({
      users: [],
    });

    //Reset Penalize incorrect radio button
    this.setPenalizeState(false);
  }

  updateTimeLeft(timeLeft, currentIndex) {
    var time = timeLeft >= 0 ? timeLeft : 0;
    this.updateState("timeLeft", time, currentIndex);
  }

  setClock(value) {
    this.setState({
      clockRunning: value,
    });
  }

  clockStatus() {
    return this.state.clockRunning;
  }

  nextUser() {
    let currentUserIdx = this.state.currentUserIdx;
    let newCurrentUserIdx =
      this.state.currentUserIdx === this.state.users.length - 1
        ? 0
        : currentUserIdx + 1;
    this.setState({
      currentUserIdx: newCurrentUserIdx,
    });

    this.setClock(false);
  }

  updatePoints() {
    let currentUserIdx = this.state.currentUserIdx;
    let user = this.state.users[currentUserIdx];
    let points = 0;
    let penalizeIncorrect = this.getPenalizeState();

    if (this.state.users.length > 0) {
      user["scoreboard"].forEach((item) => {
        if (penalizeIncorrect) {
          if (item.response === "incorrect") {
            if (item.letter === "ñ" && this.getLanguageState() === "EN") {
              points -= 0;
            } else points--;
          } else if (item.response === "correct") {
            if (item.letter === "ñ" && this.getLanguageState() === "EN") {
              points += 0;
            } else points++;
          }
        } else {
          if (item.response === "correct") points++;
        }
      });
    }

    if (points < 0) points = 0;
    this.updateState("points", points, currentUserIdx);
  }

  updateScoreboard(letter, value) {
    let currentUserIdx = this.state.currentUserIdx;
    let currentUser = this.state.users[currentUserIdx];
    currentUser["scoreboard"].forEach((item) => {
      if (item.letter === letter) item.response = value;
    });
  }

  setCurrentLetter(value) {
    let currentUserIdx = this.state.currentUserIdx;
    this.updateState("currentLetter", value, currentUserIdx);
  }

  getNextLetter() {
    let currentUserIdx = this.state.currentUserIdx;
    let currentUser = this.state.users[currentUserIdx];
    let currentLetter = currentUser.currentLetter;
    let result = false;

    let nullFilteredScoreBoard = currentUser.scoreboard.filter((el) => {
      return el.response === null;
    });

    let pasapalabraFilteredScoreBoard = currentUser.scoreboard.filter((el) => {
      return el.letter !== currentLetter ? el.response === "pasapalabra" : null;
    });

    for (let i = 0; i < pasapalabraFilteredScoreBoard.length; i++) {
      result = pasapalabraFilteredScoreBoard[0].letter;

      let temp = pasapalabraFilteredScoreBoard[i].letter;

      if (temp > currentLetter) return temp;
    }

    if (nullFilteredScoreBoard.length > 0)
      result = nullFilteredScoreBoard[0].letter;

    return result;
  }

  setNextLetter(currentUserIdx) {
    let temp = [...this.state.users];

    temp[currentUserIdx].currentLetter =
      this.getNextLetter() === false ? "a" : this.getNextLetter();

    this.setState({
      users: temp,
    });
  }

  getTypeCount(type) {
    let currentUserIdx = this.state.currentUserIdx;
    let currentUser = this.state.users[currentUserIdx];

    let countOfType = 0;
    currentUser["scoreboard"].forEach((item) => {
      if (item.response === type) countOfType++;
    });

    return countOfType;
  }

  getAudio(type) {
    try {
      if (type === "background") return this.state.audio.background;
      else if (type === "login") return this.state.audio.login;
      else if (type === "correct") return this.state.audio.correct;
      else if (type === "incorrect") return this.state.audio.incorrect;
      else if (type === "pasapalabra") return this.state.audio.pasapalabra;
      else if (type === "nextplayer") return this.state.audio.nextplayer;
      else if (type === "timesup") return this.state.audio.nextplayer;
      else if (type === "addplayer") return this.state.audio.addplayer;
      else {
        console.log(
          "Audio not found. This could be due to an incorrect file path or invalid type."
        );
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  createAudio(audio_path, volume, loop) {
    if (audio_path === null) return;
    const sound = new Audio(audio_path);
    sound.type = "mp3/wav";
    sound.preload = "auto";
    sound.autoplay = false;
    sound.volume = volume;
    if (loop) sound.loop = true;
    return sound;
  }

  toggleAudio(action, audio) {
    if (audio === null) return;
    else if (action === "play") audio.play();
    else if (action === "stop") {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  render() {
    return (
      <HashRouter>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Login
                users={this.state.users}
                addUser={this.addUser.bind(this)}
                updateState={this.updateState.bind(this)}
                removeUser={this.removeUser.bind(this)}
                resetGame={this.resetGame.bind(this)}
                getAudio={this.getAudio.bind(this)}
                toggleAudio={this.toggleAudio.bind(this)}
                setPenalizeState={this.setPenalizeState.bind(this)}
                getPenalizeState={this.getPenalizeState.bind(this)}
                setLanguageState={this.setLanguageState.bind(this)}
                getLanguageState={this.getLanguageState.bind(this)}
                updateScoreboardLanguage={this.updateScoreboardLanguage.bind(
                  this
                )}
                updatePoints={this.updatePoints.bind(this)}
                getTypeCount={this.getTypeCount.bind(this)}
              />
            </Route>
          </Switch>
          {this.state.users.length === 0 ? (
            <Switch>
              <Redirect push to="#" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/match">
                <Dashboard
                  className="dashboard-container"
                  users={this.state.users}
                  currentUserIdx={this.state.currentUserIdx}
                  updateTimeLeft={this.updateTimeLeft.bind(this)}
                  setClock={this.setClock.bind(this)}
                  clockStatus={this.clockStatus.bind(this)}
                  nextUser={this.nextUser.bind(this)}
                  updatePoints={this.updatePoints.bind(this)}
                  getTypeCount={this.getTypeCount.bind(this)}
                  updateScoreboard={this.updateScoreboard.bind(this)}
                  updateState={this.updateState.bind(this)}
                  getNextLetter={this.getNextLetter.bind(this)}
                  setNextLetter={this.setNextLetter.bind(this)}
                  setCurrentLetter={this.setCurrentLetter.bind(this)}
                  resetGame={this.resetGame.bind(this)}
                  removeUser={this.removeUser.bind(this)}
                  getAudio={this.getAudio.bind(this)}
                  toggleAudio={this.toggleAudio.bind(this)}
                  getLanguageState={this.getLanguageState.bind(this)}
                />
              </Route>
            </Switch>
          )}
          <Switch>
            <Route exact path="/">
              <Footer />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
