import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./css/Nextplayer.css";

export default function Nextplayer({ users, nextUser }) {
  return (
    <div className="next-player-container">
      <button onClick={nextUser} key={uuidv4()} disabled={users.length === 1}>
        Next Player
      </button>
    </div>
  );
}
