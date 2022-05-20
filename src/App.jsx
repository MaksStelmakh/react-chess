import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import UserForm from "./components/UserForm/UserForm";
import GameApp from "./components/GameApp/GameApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return "loading...";
  }
  if (error) {
    return "There was an error";
  }
  if (!user) {
    return <UserForm />;
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/game/:id">
          <GameApp></GameApp>
        </Route>
      </Switch>
    </Router>
  );
}
