import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pie } from 'react-chartjs-2';


const PieChart = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
      };

const { accountID } = useParams();

const[transactions, setTransactions] = useState([]);

useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/viewTransactionsOfASpecificUser/${accountID}`)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accountID]);

  const data = 

  {
    labels: [ 'Deposits',
    'Withdrawals',
    'Transfers'],
    datasets: [  
      {
        label: 'Transactions',
        data: [transactions.filter(transaction => transaction.type === 'DEPOSIT').length,
        transactions.filter(transaction => transaction.type === 'WITHDRAWAL').length,
        transactions.filter(transaction => transaction.type === 'TRANSFER').length,],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
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
      <div style={{ width: "100%", maxWidth: "400px", height: "auto" }}>
      <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChart;