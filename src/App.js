import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { MainView } from "./components/main-view/main-view";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter className="App">
      <MainView />
    </BrowserRouter>
  );
}

export default App;
