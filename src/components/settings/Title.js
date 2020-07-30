import React from "react";
import "./css/Title.css";

export default function Title({ language }) {
  return (
    <div className="settings-title-container" id="settings-title-container">
      <h1>{language === "EN" ? "Player Settings" : "Ajustes de Jugador"}</h1>
      <button className="close-modal" id="close-modal" />
    </div>
  );
}
