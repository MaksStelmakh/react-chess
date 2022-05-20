import React, { useState } from "react";
import { auth, dataBase } from "../../firebase";
import { useHistory } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const { currentUser } = auth;
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const newGameOptions = [
    { label: "Black Pieces", value: "b" },
    { label: "White Pieces", value: "w" },
    { label: "Random", value: "r" },
  ];

  const handlePlayOnline = () => {
    setShowModal(true);
  };

  const startOnlineGame = async (startingPiece) => {
    const member = {
      uid: currentUser.uid,
      piece:
        startingPiece === "r"
          ? ["b", "w"][Math.round(Math.random())]
          : startingPiece,
      name: localStorage.getItem("userName"),
      creator: true,
    };
    const game = {
      status: "waiting",
      members: [member],
      gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
    };
    await dataBase.collection("games").doc(game.gameId).set(game);
    history.push(`/game/${game.gameId}`);
  };

  return (
    <>
      <div className="home-page">
        <div className="main-menu">
          <h1 className="home-title">Play online with your friends ;)</h1>
          <button
            className="btn btn-home"
            type="button"
            onClick={handlePlayOnline}
          >
            <span>Play Online</span>
          </button>
          <p className="inform-text">
            Copy the link of the created game and send it to a friend to play
            together.
          </p>
        </div>
      </div>
      <div className={`modal ${showModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="card">
            <div className="card-content">
              <div className="content-text">
                Please Select the piece you want to start
              </div>
            </div>
            <footer className="card-footer">
              {newGameOptions.map(({ label, value }) => {
                return (
                  <span
                    className="card-footer-item pointer button-piker"
                    key={value}
                    onClick={() => startOnlineGame(value)}
                  >
                    {label}
                  </span>
                );
              })}
            </footer>
          </div>
        </div>
        <button
          className="modal-close is-large"
          onClick={() => setShowModal(false)}
        ></button>
      </div>
    </>
  );
}
