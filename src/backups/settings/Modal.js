import React, { Component } from "react";
import "./css/Modal.css";

import Title from "./Title";
import SettingsSelectTimeLeft from "./SettingsSelectTimeLeft";
import SettingsSelectPlayer from "./SettingsSelectPlayer";
import SettingsSelectLetter from "./SettingsSelectLetter";
import SettingsSelectWheelLetter from "./SettingsSelectWheelLetter";
import SettingsSelectResponse from "./SettingsSelectResponse";
import Buttons from "./Buttons";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users,
      selectedUser: this.props.users[0],
      timeLeft: this.props.users[0].timeLeft,
      currentLetter: this.props.users[0].currentLetter,
      letter: this.props.users[0].scoreboard.map((item) => item.letter),
      response: this.props.users[0].scoreboard.map((item) => item.response),
    };
  }

  componentDidMount() {
    this.makeModalDraggable();
  }

  populateDropdowns(name) {
    let targetUser = this.state.users.filter((item) => item.name === name)[0];

    const stateCopy = {
      users: this.state.users,
      selectedUser: targetUser,
      timeLeft: targetUser.timeLeft,
      currentLetter: targetUser.currentLetter,
      letter: targetUser.scoreboard.map((letter) => letter.letter),
      response: targetUser.scoreboard.map((letter) => letter.response),
    };

    this.setState(stateCopy, () => {
      // console.log(this.state);
    });
  }

  updateDropdowns(id, property) {
    if (document.getElementById(id) === null) return;

    const options = document.getElementById(id).options;
    const selectedUser = document.getElementById("player-select").value;
    const propertyToBeUpdated = this.state.users.filter((user) =>
      user.name === selectedUser ? user[property] : null
    )[0][property];

    for (let i = 0; i < options.length; i++) {
      if (options[i].value.toString() === propertyToBeUpdated.toString()) {
        options[i].selected = true;
        return;
      }
    }
  }

  populateResponse() {
    if (document.getElementById("response-select") === null) return;
    const options = document.getElementById("response-select").options;

    const dropdown = document.getElementById("wheel-letter-select").value;
    const selectedUser = this.state.selectedUser;

    var response = selectedUser.scoreboard.filter((letter) =>
      letter.letter && letter.letter === dropdown ? letter.response : null
    );

    response = response.length === 0 ? "null" : response[0].response;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === response) {
        options[i].selected = true;
        return;
      }
    }
  }

  runDropdownUpdates() {
    this.updateDropdowns("time-select", "timeLeft");
    this.updateDropdowns("current-letter-select", "currentLetter");

    this.populateResponse();
  }

  makeModalDraggable() {
    const modal = document.getElementById("modal-container");

    modal.addEventListener("mousedown", mousedown);

    function mousedown(e) {
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      let oldX = e.clientX;
      let oldY = e.clientY;

      function mousemove(e) {
        let newX = oldX - e.clientX;
        let newY = oldY - e.clientY;

        const browser_window = modal.getBoundingClientRect();

        let browser_window_left = browser_window.left;
        let browser_window_top = browser_window.top;

        if (browser_window_left < 0) browser_window_left = 0;
        else if (browser_window_left > window.outerWidth)
          browser_window_left = window.outerWidth;

        if (browser_window_top < 0) browser_window_top = 0;
        else if (browser_window_top > window.outerHeight / 2)
          browser_window_top = window.outerHeight / 2;

        modal.style.left = browser_window_left - newX + "px";
        modal.style.top = browser_window_top - newY + "px";

        oldX = e.clientX;
        oldY = e.clientY;
      }

      function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    }
  }

  render() {
    return (
      <div className="modal-container" id="modal-container" tabIndex="0">
        <Title />
        <section>
          <SettingsSelectPlayer
            cls={"select-large"}
            title={"Select Player"}
            users={this.state.users}
            property={"name"}
            populateDropdowns={this.populateDropdowns.bind(this)}
            runDropdownUpdates={this.runDropdownUpdates.bind(this)}
          />{" "}
        </section>{" "}
        <section>
          <hr />
          <h2> Status </h2>{" "}
          <div className="settings-section-button-container">
            <SettingsSelectTimeLeft
              title={"Time Left"}
              data={this.state.timeLeft}
            />{" "}
            <SettingsSelectLetter
              title={"Current Letter"}
              users={this.state}
              data={this.state.currentLetter}
            />{" "}
          </div>{" "}
        </section>{" "}
        <section>
          <hr />
          <h2> Wheel </h2>{" "}
          <div className="settings-section-button-container">
            <SettingsSelectWheelLetter
              title={"Letter"}
              users={this.state}
              data={this.state.letter}
            />{" "}
            <SettingsSelectResponse
              title={"Response"}
              users={this.state}
              data={this.state.response}
            />{" "}
          </div>{" "}
        </section>{" "}
        <section>
          <hr />
          <Buttons
            updateState={this.props.updateState}
            users={this.state}
            removeUser={this.props.removeUser}
            closeModal={this.props.closeModal}
          />{" "}
        </section>{" "}
      </div>
    );
  }
}
