import React, { useEffect, useState } from "react";
import Letter from "./Letter";
import { v4 as uuidv4 } from "uuid";
import "./css/Wheel.css";

export default function Wheel({ users, currentUserIdx, clockStatus }) {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "ñ",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const getClassName = (currentUserIdx, letter) => {
    const results = users[currentUserIdx]["scoreboard"].filter(
      (item) => item.letter === letter.toLowerCase()
    )[0]["response"];

    switch (results) {
      case null:
        return "blank";
      case "correct":
        return "correct";
      case "incorrect":
        return "incorrect";
      default:
        return "pasapalabra";
    }
  };

  const [letterState, setLetterState] = useState([
    {
      a: "blank",
      b: "blank",
      c: "blank",
      d: "blank",
      e: "blank",
      f: "blank",
      g: "blank",
      h: "blank",
      i: "blank",
      j: "blank",
      k: "blank",
      l: "blank",
      m: "blank",
      n: "blank",
      ñ: "blank",
      o: "blank",
      p: "blank",
      q: "blank",
      r: "blank",
      s: "blank",
      t: "blank",
      u: "blank",
      v: "blank",
      w: "blank",
      x: "blank",
      y: "blank",
      z: "blank",
    },
  ]);

  useEffect(() => {
    const user = users[currentUserIdx];
    const scoreboard = user.scoreboard;
    let letterStateCopy = [...letterState];

    scoreboard.forEach((item) => {
      if (item.response !== null) {
        letterStateCopy[0][item.letter] = getClassName(
          currentUserIdx,
          item.letter
        );
      } else letterStateCopy[0][item.letter] = "blank";
    });

    setLetterState(letterStateCopy);
  }, [users, currentUserIdx]);
  return (
    <div className="wheel-container">
      {alphabet.map((letter) => {
        return (
          <span
            key={uuidv4()}
            id={letter}
            className={`letter ${letterState[0][letter]} ${
              letter === users[currentUserIdx].currentLetter && clockStatus()
                ? "letter-is-active"
                : ""
            }`}
          >
            <span> {letter.toUpperCase()} </span>
          </span>
        );
      })}
      <Letter user={users[currentUserIdx]} key={uuidv4()} />
    </div>
  );
}
