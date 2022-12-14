import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { Login } from "../login/login.jsx";
import { Trip } from "../trip/trip.jsx";

export const MainView = () => {
  let [user, setUser] = useState("");
  let person = useRef(user);
  useEffect(() => {
    person = person.current;
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/trip" element={<Trip user={user} />} />
      </Routes>
    </Router>
  );
};
