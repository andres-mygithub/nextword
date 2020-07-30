import React from "react";
import { Link } from "react-router-dom";
import "./css/Inicio.css";

export default function Inicio() {
  return (
    <div className="inicio-container">
      <Link to="/">
        <span>Home</span>
      </Link>
    </div>
  );
}
