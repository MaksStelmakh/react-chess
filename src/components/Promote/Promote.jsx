import React from "react";
import Square from "../Square/Square";
import { move } from "../../Game";

const promotionPieces = ["r", "n", "b", "q"];
export default function Promote({ promotion: { from, to, color } }) {
  return (
    <div className="board">
      {promotionPieces.map((piece, index) => (
        <div key={index} className="promote-square">
          <Square black={index % 3 === 0}>
            <div
              className="piece-container"
              onClick={() => move(from, to, piece)}
            >
              <img
                src={require(`../../assets/${piece}_${color}.png`)}
                alt=""
                className="piece cursor-pointer"
              />
            </div>
          </Square>
        </div>
      ))}
    </div>
  );
}
