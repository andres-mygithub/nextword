import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/login/Login";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";

const LOCAL_STORAGE_KEY = "pasapalabras.users";

export default class App extends Component {
  state = {
    users:
      localStorage.getItem(LOCAL_STORAGE_KEY) === null
        ? []
        : JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)),
    currentUserIdx: 0,
    clockRunning: false,
  };

  addUser() {
    this.setState({
      users: [
        ...this.state.users,
        {
          name: document.getElementById("addUser").value,
          timeLeft: 120,
          gameDuration: 120,
          currentLetter: "a",
          scoreboard: [
            { letter: "a", response: null },
            { letter: "b", response: null },
            { letter: "c", response: null },
            { letter: "d", response: null },
            { letter: "e", response: null },
            { letter: "f", response: null },
            { letter: "g", response: null },
            { letter: "h", response: null },
            { letter: "i", response: null },
            { letter: "j", response: null },
            { letter: "k", response: null },
            { letter: "l", response: null },
            { letter: "m", response: null },
            { letter: "n", response: null },
            { letter: "ñ", response: null },
            { letter: "o", response: null },
            { letter: "p", response: null },
            { letter: "q", response: null },
            { letter: "r", response: null },
            { letter: "s", response: null },
            { letter: "t", response: null },
            { letter: "u", response: null },
            { letter: "v", response: null },
            { letter: "w", response: null },
            { letter: "x", response: null },
            { letter: "y", response: null },
            { letter: "z", response: null },
          ],
          points: 0,
        },
      ],
    });

    //Clear Input Field
    document.getElementById("addUser").value = "";
  }

  updateState(field, value, currentUserIdx) {
    let temp = [...this.state.users];
    temp[currentUserIdx][field] = value;

    this.setState({
      users: temp,
    });

    //update local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(temp));
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
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUsers));
  }

  resetGame() {
    //Reset state
    this.setState({
      users: [],
    });
  }

  updateTimeLeft(timeLeft, currentIndex) {
    this.updateState("timeLeft", timeLeft, currentIndex);
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

    if (this.state.users.length > 0) {
      user["scoreboard"].forEach((item) => {
        if (item.response === "correct") points++;
      });
    }

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
      this.getNextLetter() === false ? null : this.getNextLetter();

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
                />
              </Route>
            </Switch>
          )}
          <Footer />
        </div>
      </HashRouter>
    );
  }
}
