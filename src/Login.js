import React, { useState } from "react";
import axios from "axios";
//import "./App.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  let data = {
    email: email,
    password: pass,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("data", data);
    try {
      let res = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        data
      );
      if (res.data.body.token) {
        const token = res.data.body.token;
        console.log("user", res.data);
        console.log("res", res);
        localStorage.setItem("token", token);
        localStorage.setItem("data", res.data);
        console.log("token", token);
        
        console.log(res.data.body.user);
        console.log("role", res.data.body.user.roles[0].name);

        alert("Login successful");

        if(res.data.body.user.roles[0].name == "User" ){
           window.location.href = "/user";
        }
        else{
          window.location.href = "/employeeViewUser"
        }
        
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <h2>ABC Bank</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button type="submit">Log In</button>
        </form>
        {
          <button className="link-btn" onClick={() => navigate("/register")}>
            Don't have an account? Register here.
          </button>
        }
      </div>
    </div>
  );
};
