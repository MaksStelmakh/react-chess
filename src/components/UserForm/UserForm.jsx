import React, { useState } from "react";
import { auth } from "../../firebase";
import "./UserForm.css";

export default function UserForm() {
  const [name, setName] = useState("");
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    localStorage.setItem("userName", name);
    await auth.signInAnonymously();
  };
  return (
    <>
      <h1 className="title">Welcome to Chess game!</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <h2 className="title-form">Enter your name to start</h2>
        <br />
        <div className="group">
          <input
            type="text"
            name=""
            id=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span className="bar"></span>
          <label>Player Name</label>
        </div>
        <div className="button_container">
          <button className="btn" type="submit">
            <span>Start</span>
          </button>
        </div>
      </form>
    </>
  );
}
