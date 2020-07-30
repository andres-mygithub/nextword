import React, { useRef, useEffect, useState } from "react";
import "./css/Penalize.css";

export default function Penalize({
  setPenalizeState,
  getPenalizeState,
  language,
  updatePoints,
  users,
}) {
  const penalizeInputYes = useRef();
  const penalizeInputNo = useRef();

  const [penalize, setPenalize] = useState();

  useEffect(() => {
    setPenalize(getPenalizeState());
  }, []);

  useEffect(() => {
    setPenalizeState(penalize);
  }, [penalize, setPenalizeState]);

  return (
    <div className="penalize-container">
      {language === "EN" ? (
        <h2>
          Penalize <br />
          Incorrect
        </h2>
      ) : (
        <h2>
          Penalizar <br />
          Incorrecto
        </h2>
      )}

      <div className="radio-buttons-container">
        <span>
          <input
            type="radio"
            id="penalize-no"
            name="penalize-input"
            value={false}
            checked={penalize === false}
            ref={penalizeInputNo}
            onChange={() => {
              setPenalize(false);
              if (users.length > 0) updatePoints();
            }}
          />
          <label htmlFor="penalize-no">No</label>
        </span>
        <span>
          <input
            type="radio"
            id="penalize-yes"
            name="penalize-input"
            checked={penalize === true}
            value={true}
            ref={penalizeInputYes}
            onChange={() => {
              setPenalize(true);
              if (users.length > 0) updatePoints();
            }}
          />
          <label htmlFor="penalize-yes">
            {language === "EN" ? "Yes" : "Sí"}
          </label>
        </span>
      </div>
      <hr />
    </div>
  );
}
