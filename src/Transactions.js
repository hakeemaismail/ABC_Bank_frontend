import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

export default function Transactions() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const { accountID } = useParams();
  const [transactions, setTransactions] = useState([]);

  const getTransactions = () => {
    axios
      .get(
        `http://localhost:8080/api/v1/viewTransactionsOfASpecificUser/${accountID}`
      )
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTransactions();
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

  const Piedata = {
    labels: ["Deposits", "Withdrawals", "Transfers"],
    datasets: [
      {
        label: "Transactions",
        data: [
          transactions.filter((transaction) => transaction.type === "DEPOSIT")
            .length,
          transactions.filter(
            (transaction) => transaction.type === "WITHDRAWAL"
          ).length,
          transactions.filter((transaction) => transaction.type === "TRANSFER")
            .length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleGeneratePDF = () => {
    axios
      .get(`http://localhost:8080/api/v1/generatePDF/${accountID}`, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        saveAs(blob, "bank_statement.pdf");
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

      <h2 className="text-4xl font-bold text-center py-4">All transactions</h2>
      <div className="flex justify-end mt-4 mr-12">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => handleGeneratePDF()}
        >
          Download bank statement
        </button>
      </div>

      <table className="table-auto mx-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Transaction ID</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Transaction type</th>
            <th className="px-4 py-2">Source account</th>
            <th className="px-4 py-2">Destination account</th>
            <th className="px-4 py-2">Transfer Amount</th>
            <th className="px-4 py-2">Account balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transID}>
              <td className="px-4 py-2">{transaction.transID}</td>
              <td className="px-4 py-2">{transaction.date}</td>
              <td className="px-4 py-2">{transaction.type}</td>
              <td className="px-4 py-2">{transaction.sourceAccountID}</td>
              <td className="px-4 py-2">{transaction.destAccountID}</td>
              <td className="px-4 py-2">{transaction.transferAmount}</td>
              <td className="px-4 py-2">{transaction.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>


        <div>

        </div>
        <div className="flex justify-center space-x-8" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ width: "50%" }}>
          <Line data={data} />
        </div>
        <div style={{ width: "50%" }}>
          <Pie data={Piedata} />
        </div>
      </div>
    </div>
  );
}
