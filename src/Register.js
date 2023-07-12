import React, { useState } from "react";
//import "./App.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Register = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const navigate = useNavigate();


    let data = {
        firstName: fname,
        lastName: lname,
        email: email,
        password: pass
      }
      
        const handleSubmit = async (e) => {
          e.preventDefault();
       
          console.log("data", data)
          try{
            let res = await axios.post("http://localhost:8080/api/v1/auth/dto", data)
            if (res.data.status == "success") {
              console.log("res", res);
              console.log("status", res.data.status);
            alert("Successfully registered")
            window.location.href="/"
            }else if (res.data.status == "exists") {
              alert("This email already exists. Please enter a new email")
            }
            else{
              alert("An error ocurred")
            }
          }catch(err){
            console.log(err)
          }
        };

    return (
        <div className="App">
        <div className="auth-form-container">
            <h2>ABC Bank</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="firstname">First name</label>
            <input value={fname} name="firstname" onChange={(e) => setFname(e.target.value)} id="fname" placeholder="first Name" />
            <label htmlFor="lastname">Last name</label>
            <input value={lname} name="lastname" onChange={(e) => setLname(e.target.value)} id="lname" placeholder="last Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => navigate('/')}>Already have an account? Login here.</button>
    </div>
    </div>
    )
}
