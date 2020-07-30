import React from "react";
import "./css/Menu.css";
import { v4 as uuidv4 } from "uuid";
import Player from "./Player";
import AddUser from "./AddUser";

export default function Menu({ users, addUser, removeUser, setInputText }) {
  return (
    <div className="menu-container">
      <ul>
        {users.map((user) => {
          return (
            <Player
              user={user}
              removeUser={removeUser}
              key={uuidv4()}
              tabIndex="1"
            />
          );
        })}
      </ul>
      <hr />
      <AddUser addUser={addUser} setInputText={setInputText} />
    </div>
  );
}
