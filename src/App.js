import React, { useState } from "react";
import "./App.css";
import { Login } from "./Login.js";
import { Register } from "./Register";
import User from "./UserViewAllAccount";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AllAccounts from "./EmployeeViewAllAccounts";
import Transactions from "./Transactions";
import EmployeeViewUser from "./EmployeeViewAllUsers";

function App() {
  

  return (
    <Router>
      <div>
        <div> 
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<User />}/>
            <Route path="/employeeViewUser" element={<EmployeeViewUser />}/>
            <Route path="/transact/:accountID" element={<Transactions />} />
            <Route path="/allAccounts/:id" element={<AllAccounts />}/>
          </Routes>
        </div>
       
      </div>
    </Router>
  );
}

export default App;
