import React from "react";
import { Link } from "react-router-dom";
import "./css/Inicio.css";

export default function Inicio({ getLanguageState }) {
  return (
    <div className="inicio-container">
      <Link to="/">
        <span>{getLanguageState() === "EN" ? "Home" : "Inicio"}</span>
      </Link>
    </div>
  );
}
