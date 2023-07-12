import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployeeViewUser() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const[users, setUsers] = useState([]);
  
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/auth/getUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8080/api/v1/auth/deleteUser/${id}`)
      .then(() => {
        console.log("deleted record");
        alert("The record has been deleted");
        window.location.href = "/employeeViewUser";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <header
        className="flex items-center justify-between py-4 px-6"
        style={{
          backgroundImage:
            "linear-gradient(79deg, #7439db, #C66FBC 48%, #F7944D)",
        }}
      >
        <h1 className="text-white text-2xl font-bold">ABC Bank</h1>
        <button
          className="text-black hover:text-blue-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <h2 className="text-4xl font-bold text-center py-4">User Accounts</h2>

      <table className="table-auto mx-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">View</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user => (
            <tr key={user.id}>
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.firstName}</td>
              <td className="px-4 py-2">{user.lastName}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    navigate(`/allAccounts/${user?.id}`);
                  }}
                >
                  View Accounts
                </button>
              </td>
              <td className="px-4 py-2">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleDelete(user?.id)}
                >
              Delete
            </button>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
}
