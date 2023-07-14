import React, { useState } from "react";
//import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log(data.firstname);

    let dataExample = {
      firstName: data.firstname,
      lastName: data.lname,
      email: data.email,
      password: data.pass,
    };

    try {
      let res = await axios.post(
        "http://localhost:8080/api/v1/auth/dto",
        dataExample
      );
      if (res.data.status == "success") {
       
        toast('Successfully registered', {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            setTimeout(() => {
              navigate("/");
            }, 1000); 
          }
          });
      }
       else if (res.data.status == "exists") {
        
        toast('The email already exists. Please enter a new email', {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            setTimeout(() => {
              window.location.href = "/register";
            }, 1000); 
          }
          });

      } else {
        
        toast('An error occurred', {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            setTimeout(() => {
              window.location.href = "/register";
            }, 1000); 
          }
          });
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
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstname">First name</label>
          <input
            name="firstname"
            {...register("firstname")}
            id="fname"
            placeholder="first Name"
          />
          <label htmlFor="lastname">Last name</label>
          <input
            name="lname"
            {...register("lname")}
            id="lname"
            placeholder="last Name"
          />
          <label htmlFor="email">email</label>
          <input
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            {...register("email")}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            placeholder="********"
            id="password"
            name="pass"
            {...register("pass")}
          />
          <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => navigate("/")}>
          Already have an account? Login here.
        </button>
      </div>
    </div>
  );
};
