import React from "react";
import BoardSquare from "../BoardSquare/BoardSquare";

export default function Board({ board, turn }) {
  // console.log(turn); Кто ходит
  const getXYPosition = (index) => {
    const x = index % 8;
    const y = Math.abs(Math.floor(index / 8) - 7);
    return { x, y };
  };
  const isBlack = (index) => {
    const { x, y } = getXYPosition(index);
    return (x + y) % 2 === 1;
  };
  function getPosition(index) {
    const { x, y } = getXYPosition(index);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];

    return `${letter}${y + 1}`;
  }
  return (
    <div className="board">
      {board.flat().map((piece, index) => (
        <div key={index} className="square">
          <BoardSquare
            piece={piece}
            black={isBlack(index)}
            position={getPosition(index)}
          />
        </div>
      ))}
    </div>
  );
}
