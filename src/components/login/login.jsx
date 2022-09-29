import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.scss";

export const Login = ({ setUser }) => {
  const users = [
    {
      name: "Jerbel",
      color: "green",
    },
    {
      name: "Gorbal",
      color: "purple",
    },
    {
      name: "Barbell",
      color: "red",
    },
    {
      name: "Steve",
      color: "brown",
    },
  ];
  const [checked, setChecked] = useState(false);

  const handleSubmit = () => {
    if (checked) {
      return "/trip";
    } else {
      return alert("You have to be somebody");
    }
  };
  return (
    <div>
      <div className="login-container">
        <h1>TripPal</h1>
        <form className="login">
          <h3>Who Are You?</h3>
          <div className="travelers">
            {users.map((user) => {
              return (
                <div key={user.color}>
                  <input
                    onChange={(e) => {
                      setUser(e.target.value);
                      setChecked(true);
                    }}
                    id={`traveler-${user.name}`}
                    type="radio"
                    name="traveler-name"
                    value={user.name}
                  />
                  <label htmlFor={`traveler-${user.name}`}>{user.name}</label>
                </div>
              );
            })}
          </div>
          {checked && (
            <Link to="/trip" className="login button">
              Login
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};
