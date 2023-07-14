import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AllAccounts() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  
  const[accounts, setAccounts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/getAccountsOfAUser/${id}`)
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);


  const handleDelete = (accountID) => {
    console.log(accountID);
    axios
      .post(`http://localhost:8080/api/v1/clearAccount/${accountID}`)
      .then((response) => {
        console.log(response);
        alert("The account has been cleared");
        window.location.href = "/allAccounts";
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
    backgroundImage: 'linear-gradient(79deg, #7439db, #C66FBC 48%, #F7944D)',
  }}
>
  <h1 className="text-white text-2xl font-bold">ABC Bank</h1>
  
  <button className="text-black hover:text-blue-200" onClick={handleLogout}>
    Logout
  </button>
</header>

      <h2 className="text-4xl font-bold text-center py-4">All Accounts</h2>

      <div className="flex justify-center">
      {accounts.map((account)=>(
        <div key={account.accountID} className="max-w-xl bg-white rounded-lg shadow-lg p-6">
       
          <h3 className="text-2xl font-bold mb-4">Account Information</h3>
          <div>
            <p className="font-semibold">Account ID:</p>
            <p>{account.accountID} </p>
          </div>
          <div>
            <p className="font-semibold">Account Type:</p>
            <p>{account.type} </p>
          </div>
          <div>
            <p className="font-semibold">Account Balance:</p>
            <p>{account.accountBalance} </p>
          </div>
          <div className="flex justify-around mt-6">
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleDelete(account?.accountID)}
                >
              Delete
            </button>
            <button  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"  onClick={() => {
                  navigate(`/transact/${account?.accountID}`);
                }}>
              View transactions 
            </button>    
          </div>

        </div>))}
      </div>
    </div>
  );
}
