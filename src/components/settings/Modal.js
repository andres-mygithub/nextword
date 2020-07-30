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
      selectedUser: null,
      language: this.props.getLanguageState(),
      timeLeft: this.props.users[0].timeLeft,
      currentLetter: this.props.users[0].currentLetter,
      letter: this.props.users[0].scoreboard.map((item) => item.letter),
      response: this.props.users[0].scoreboard.map((item) => item.response),
    };
  }

  componentDidMount() {
    this.makeModalDraggable();
    this.populateDropdowns(null);

    //Add event listener to reset "Select Player" when user clicks out of the modal
    document.addEventListener("click", (e) => {
      if (e.target.id === "settings" || e.target.id === "settings-btn") {
        this.setSelectedUser(null);
        document.getElementById("player-select").selectedIndex = 0;
      }
    });
  }

  setSelectedUser(value) {
    this.setState({ selectedUser: value });
  }

  populateDropdowns(name) {
    if (name === null || name.toLowerCase() === "select player") {
      this.setSelectedUser(null);
      return;
    } else {
      var targetUser = this.state.users.filter((item) => item.name === name)[0];
      this.setSelectedUser(targetUser);

      //Update Current Letter
      this.runDropdownUpdates(targetUser.name);
    }
  }

  updateDropdowns(id, property, name) {
    if (
      document.getElementById(id) === null ||
      document.getElementById(id) === undefined
    )
      return;
    else if (
      document.getElementById("player-select").value.toLowerCase() ===
      "select player"
    )
      return;

    const options = document.getElementById(id).options;

    var propertyValue = this.state.users.filter(
      (user) => user.name === name
    )[0][property];

    //Handle No Limit
    propertyValue = propertyValue === null ? "No Limit" : propertyValue;

    for (let i = 0; i < options.length; i++) {
      if (
        options[i].value.toString().toLowerCase() ===
        propertyValue.toString().toLowerCase()
      ) {
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
      letter.letter && letter.letter.toUpperCase() === dropdown.toUpperCase()
        ? letter.response
        : null
    );

    response = response.length === 0 ? "null" : response[0].response;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === response) {
        options[i].selected = true;
        return;
      }
    }
  }

  runDropdownUpdates(name) {
    //Wait 100ms then update dropdowns
    setTimeout(() => {
      this.updateDropdowns("time-select", "timeLeft", name);
      this.updateDropdowns("current-letter-select", "currentLetter", name);
      this.updateDropdowns("wheel-letter-select", "currentLetter", name);
      this.populateResponse();
    }, 100);
  }

  makeModalDraggable() {
    const modal = document.getElementById("modal-container");

    modal.addEventListener("mousedown", mousedown);

    function mousedown(e) {
      //If user clicks on a select field or button then don't move the container
      if (
        e.target.tagName.toLowerCase() === "select" ||
        e.target.tagName.toLowerCase() === "button"
      )
        return;

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
        <Title language={this.state.language} />
        <section>
          <hr />
          <SettingsSelectPlayer
            cls={"select-large"}
            title={
              this.state.language === "EN" ? "Select Player" : "Elige Jugador"
            }
            language={this.state.language}
            users={this.state.users}
            property={"name"}
            defaultUser={"select player"}
            populateDropdowns={this.populateDropdowns.bind(this)}
          />
        </section>
        {this.state.selectedUser === null ? null : (
          <>
            <section>
              <hr />
              <h2>
                {this.state.language === "EN"
                  ? "Player Settings"
                  : "Ajustes de Jugador"}
              </h2>
              <div className="settings-section-button-container">
                <SettingsSelectTimeLeft
                  title={
                    this.state.language === "EN"
                      ? "Time Left"
                      : "Tiempo Restante"
                  }
                  data={this.state.timeLeft}
                  language={this.state.language}
                  users={this.state.users}
                />
                <SettingsSelectLetter
                  title={
                    this.state.language === "EN"
                      ? "Current Letter"
                      : "Letra Actual"
                  }
                  users={this.state}
                  data={this.state.currentLetter}
                  language={this.state.language}
                />
              </div>
            </section>
            <section>
              <hr />
              <h2>
                {this.state.language === "EN"
                  ? "Wheel Settings"
                  : "Ajustes de Rosco"}
              </h2>
              <div className="settings-section-button-container">
                <SettingsSelectWheelLetter
                  title={
                    this.state.language === "EN"
                      ? "Wheel Letter"
                      : "Letra de Rosco"
                  }
                  users={this.state}
                  data={this.state.letter}
                  language={this.state.language}
                />
                <SettingsSelectResponse
                  title={
                    this.state.language === "EN" ? "Response" : "Respuesta"
                  }
                  language={this.state.language}
                  users={this.state}
                  data={this.state.response}
                />
              </div>
            </section>
            <section>
              <hr />
              <Buttons
                updateState={this.props.updateState}
                users={this.state}
                removeUser={this.props.removeUser}
                closeModal={this.props.closeModal}
                updatePoints={this.props.updatePoints}
                setSelectedUser={this.setSelectedUser.bind(this)}
                language={this.state.language}
              />
            </section>
          </>
        )}
      </div>
    );
  }
}
