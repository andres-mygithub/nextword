import React, { useRef, useEffect, useState } from "react";
import "./css/Language.css";

export default function Language({
  setLanguageState,
  getLanguageState,
  updateScoreboardLanguage,
  updatePoints,
  users,
}) {
  const languageInputEN = useRef();
  const languageInputES = useRef();

  const [language, setLanguage] = useState(getLanguageState());

  useEffect(() => {
    setLanguage(getLanguageState());
  }, []);

  useEffect(() => {
    setLanguageState(language);
  }, [language, setLanguageState]);

  return (
    <div className="language-container">
      <h2> {language === "EN" ? "Language" : "Idioma"}</h2>
      <div className="radio-buttons-container">
        <span>
          <input
            type="radio"
            id="language-en"
            name="language-input"
            value="EN"
            checked={language === "EN"}
            ref={languageInputEN}
            onChange={() => {
              setLanguage("EN");
              updateScoreboardLanguage("EN");
              if (users.length > 0) updatePoints();
            }}
          />
          <label htmlFor="language-en">EN</label>
        </span>
        <span>
          <input
            type="radio"
            id="language-es"
            name="language-input"
            checked={language === "ES"}
            value={true}
            ref={languageInputES}
            onChange={() => {
              setLanguage("ES");
              updateScoreboardLanguage("ES");
              if (users.length > 0) updatePoints();
            }}
          />
          <label htmlFor="language-es">ES</label>
        </span>
      </div>
      <hr />
    </div>
  );
}
