import React, { useState } from "react";
import "./App.css";
import { Login } from "./Login.js";
import { Register } from "./Register";
import User from "./UserViewAllAccount";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AllAccounts from "./EmployeeViewAllAccounts";
import Transactions from "./Transactions";
import EmployeeViewUser from "./EmployeeViewAllUsers";
//import LineChart from "./TransactionsChart";
import PieChart from "./TransactionsChart";

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
            <Route path="/transactionChart/:accountID" element={<PieChart/>} />
          </Routes>
        </div>
       
      </div>
    </Router>
  );
}

export default App;
