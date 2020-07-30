import React from "react";
import "./css/Table.css";
import { v4 as uuidv4 } from "uuid";

export default function Table({ users, currentUserIdx }) {
  const current_user = users[currentUserIdx];

  //Sort users by points
  const sorted_users = Object.values(users).sort((a, b) => {
    return b.points - a.points;
  });

  return (
    <div className="table-container">
      <table className="posiciones-table">
        <caption>Ranking</caption>
        <thead>
          <tr>
            <td></td>
            <td>Player</td>
            <td>Pts.</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {sorted_users.map((user) => {
            return (
              <tr key={uuidv4()}>
                <td></td>
                <td
                  className={`table-player ${
                    user.name === current_user.name ? " highlight" : ""
                  }`}
                >
                  {user.name}
                </td>
                <td
                  className={`table-points ${
                    user.name === current_user.name ? " highlight" : ""
                  }`}
                >
                  {user.points}
                </td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
