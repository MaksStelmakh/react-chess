import React, { useEffect, useState, useTransition } from "react";
import { gameSubject, initGame, resetGame } from "../../Game";
import Board from "../Board/Board";
import { useParams, useHistory } from "react-router-dom";
import { dataBase } from "../../firebase";
import "./GameApp.css";

function GameApp() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();
  const { id } = useParams();
  const [initResult, setInitResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState({});
  const [status, setStatus] = useState("waiting");
  const history = useHistory();
  const sharebleLink = window.location.href;
  useEffect(() => {
    let subscribe;
    async function init() {
      const res = await initGame(
        id !== "local" ? dataBase.doc(`games/${id}`) : null
      );
      setInitResult(res);
      setLoading(false);
      if (!res) {
        subscribe = gameSubject.subscribe((game) => {
          setBoard(game.board);
          setIsGameOver(game.isGameOver);
          setResult(game.result);
          setTurn(game.turn);
          setStatus(game.status);
          setGame(game);
        });
      }
    }
    init();
    return () => subscribe && subscribe.unsubscribe();
  }, [id]);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(sharebleLink);
  }

  if (loading) {
    return <p className="information-text-about-game">Loading...</p>;
  }

  if (initResult === "Not Found") {
    return <p className="information-text-about-game">Game Not Found</p>;
  }

  if (initResult === "intruder") {
    return (
      <p className="information-text-about-game">The game is alredy full</p>
    );
  }
  return (
    <div className="app-container">
      {isGameOver && (
        <h2 className="vertical-text">
          GAME OVER
          <button
            onClick={async () => {
              await resetGame();
              history.push("/");
            }}
          >
            <span className="vertical-text">NEW GAME</span>
          </button>
        </h2>
      )}
      <div className="board-container">
        {game.oponent && game.oponent.name && (
          <span className="tag is-link name name-oponent">
            {game.oponent.name}
          </span>
        )}
        <Board board={board} position={turn} />
        {game.member && game.member.name && (
          <span className="tag is-link name">{game.member.name}</span>
        )}
      </div>
      {result && <p className="vertical-text">{result}</p>}
      {status === "waiting" && (
        <div className="notification is-link share-game">
          <strong>SHare this game to continue</strong>
          <br />
          <br />
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                type="text"
                name=""
                id=""
                className="input"
                readOnly
                value={sharebleLink}
              />
            </div>
            <div className="control">
              <button className="button is-info" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameApp;
