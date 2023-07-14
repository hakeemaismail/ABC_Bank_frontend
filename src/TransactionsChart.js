import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import axios from "axios";


const LineChart = () => {

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

const data = {
  labels: transactions.map((data) => data.transID),
  datasets: [
    {
      label: "Account Balance",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: transactions.map((data) => data.balance),
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
      <Line data={data} />
      </div>
    </div>
  );
};

export default LineChart;