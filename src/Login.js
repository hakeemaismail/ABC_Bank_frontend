import React, { useState } from "react";
import axios from "axios";
//import "./App.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

export const Login = () => {
  
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
  
    let dataExample = {
      email: data.email,
      password: data.password,
    };

      try {
      let res = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        dataExample
      );
      if (res.data.body.token) {
        const token = res.data.body.token;
        
        localStorage.setItem("token", token);
        localStorage.setItem("data", res.data);

        toast('Login successful!', {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            if (res.data.body.user.roles[0].name === "User") {
              setTimeout(() => {
                navigate("/user");
              }, 1000); 
            } else {
              setTimeout(() => {
                navigate("/employeeViewUser");
              }, 1000); 
            }
          },
          });

      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };



  return (
    
    <div className="App">
      <ToastContainer />
      <div className="auth-form-container">
        <h2>ABC Bank</h2>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">email</label>
          <input
             name="email"
             {...register("email")}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            
          />
          <label htmlFor="password">password</label>
          <input
             name="password"
             {...register("password")}
            type="password"
            placeholder="********"
            id="password"
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
