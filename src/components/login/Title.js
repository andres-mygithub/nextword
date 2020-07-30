import React from "react";
import "./css/Title.css";

export default function Title({ getLanguageState }) {
  const language = getLanguageState();
  return (
    <h1 className="title" id="title">
      {language === "EN" ? (
        <>
          <span id="title-letter-1">N</span>
          <span id="title-letter-2">E</span>
          <span id="title-letter-3">X</span>
          <span id="title-letter-4">T</span>
          <span id="title-letter-5">W</span>
          <span id="title-letter-6">O</span>
          <span id="title-letter-7">R</span>
          <span id="title-letter-8">D</span>
        </>
      ) : (
        <>
          <span id="title-letter-1">P</span>
          <span id="title-letter-2">R</span>
          <span id="title-letter-3">O</span>
          <span id="title-letter-4">X</span>
          <span id="title-letter-5">I</span>
          <span id="title-letter-6">M</span>
          <span id="title-letter-7">A</span>
          <span id="title-letter-8">P</span>
          <span id="title-letter-9">A</span>
          <span id="title-letter-10">L</span>
          <span id="title-letter-11">A</span>
          <span id="title-letter-12">B</span>
          <span id="title-letter-13">R</span>
          <span id="title-letter-14">A</span>
        </>
      )}
    </h1>
  );
}
