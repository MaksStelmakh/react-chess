// import React from "react";
// import BoardSquare from "../BoardSquare/BoardSquare";

// export default function Board({ board, position }) {
//   // console.log(turn); Кто ходит
//   const getXYPosition = (index) => {
//     const x = index % 8;
//     const y = Math.abs(Math.floor(index / 8) - 7);
//     return { x, y };
//   };
//   const isBlack = (index) => {
//     const { x, y } = getXYPosition(index);
//     return (x + y) % 2 === 1;
//   };
//   function getPosition(index) {
//     const { x, y } = getXYPosition(index);
//     const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];

//     return `${letter}${y + 1}`;
//   }
//   return (
//     <div className="board">
//       {board.flat().map((piece, index) => (
//         <div key={index} className="square">
//           <BoardSquare
//             piece={piece}
//             black={isBlack(index)}
//             position={getPosition(index)}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import BoardSquare from "../BoardSquare/BoardSquare";
export default function Board({ board, position }) {
  const [currBoard, setCurrBoard] = useState([]);

  useEffect(() => {
    setCurrBoard(position === "w" ? board.flat() : board.flat().reverse());
  }, [board, position]);

  function getXYPosition(i) {
    const x = position === "w" ? i % 8 : Math.abs((i % 8) - 7);
    const y =
      position === "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8);

    return { x, y };
  }

  function isBlack(i) {
    const { x, y } = getXYPosition(i);
    return (x + y) % 2 === 0;
  }

  function getPosition(i) {
    const { x, y } = getXYPosition(i);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
    return `${letter}${y + 1}`;
  }
  return (
    <div className="board">
      {currBoard.map((piece, i) => (
        <div key={i} className="square">
          <BoardSquare
            piece={piece}
            black={isBlack(i)}
            position={getPosition(i)}
          />
        </div>
      ))}
    </div>
  );
}
