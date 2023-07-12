import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function User() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navigate = useNavigate();

  const handleView = () => {};

  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const [accounts, setAccounts] = useState([]);
  const [accountID, setAccountID] = useState(-1);
  const [benAccountID, setBenAccountID] = useState();
  const [accountBalance, setAccountBalance] = useState();
  const [accountType, setAccountType] = useState("SAVINGS");

  let token = localStorage.getItem("token");

  // console.log(token);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/getAccountsOfASpecificUser", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeposit = () => {
    console.log("amount", depositAmount);
    console.log("id", accountID);

    axios
      .post(
        `http://localhost:8080/api/v1/depositAmount/${depositAmount}/accountID/${accountID}`
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setDepositModalOpen(false);
    setAccountID(-1);
  };

  const handleCreate = () => {
    console.log("accBalance", accountBalance);
    console.log("type", accountType);

    let data = {
      accountBalance: accountBalance,
      type: accountType
    };

    axios
      .post("http://localhost:8080/api/v1/createAccount", data,{
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Authorization: "Bearer " + token,
        },
      } )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setCreateModalOpen(false);
    setAccountBalance();
    // setAccountType("");
  };

  const handleTransfer = () => {
    console.log("amount", transferAmount);
    console.log("id", accountID);

    let data = {
      sourceAccountID: accountID,
      destAccountID: benAccountID,
      transferAmount: transferAmount,
    };

    axios
      .post("http://localhost:8080/api/v1/transferAmount", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setTransferModalOpen(false);
    setAccountID(-1);
    setBenAccountID();
  };

  const handleWithdraw = () => {
    console.log("amount", withdrawAmount);
    console.log("id", accountID);

    axios
      .post(
        `http://localhost:8080/api/v1/withdrawAmount/${withdrawAmount}/accountID/${accountID}`
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setWithdrawModalOpen(false);
    setAccountID(-1);
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
        <nav className="ml-auto py-4 pr-4">
          <button
            className="text-black hover:text-blue-200"
            onClick={() => setCreateModalOpen(true)}
          >
            Create Bank Account
          </button>
        </nav>
        <button
          className="text-black hover:text-blue-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <h2 className="text-4xl font-bold text-center py-4">All Accounts</h2>

      <div className="flex justify-center">
        {accounts.map((account) => (
          <div
            key={account.accountID}
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-2xl font-bold mb-4">Account Information</h3>
            <div>
              <p className="font-semibold">Account ID:</p>
              <p>{account.accountID}</p>
            </div>
            <div>
              <p className="font-semibold">Account Type:</p>
              <p>{account.type}</p>
            </div>
            <div>
              <p className="font-semibold">Account Balance:</p>
              <p>{account.accountBalance}</p>
            </div>
            <div className="flex justify-around mt-6">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  setAccountID(account?.accountID);
                  setDepositModalOpen(true);
                }}
              >
                Deposit
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => {
                  setAccountID(account?.accountID);
                  setTransferModalOpen(true);
                }}
              >
                Transfer
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
                onClick={() => {
                  setAccountID(account?.accountID);
                  setWithdrawModalOpen(true);
                }}
              >
                Withdraw
              </button>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
                onClick={() => {
                  navigate(`/transact/${account?.accountID}`);
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {isDepositModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
          <div className="bg-white rounded-lg p-6 z-20">
            <h2>Deposit Amount</h2>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => setDepositModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2"
                onClick={() => handleDeposit()}
              >
                Confirm Deposit
              </button>
            </div>
          </div>
        </div>
      )}

      {isWithdrawModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
          <div className="bg-white rounded-lg p-6 z-20">
            <h2>Withdraw Amount</h2>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => setWithdrawModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2"
                onClick={() => handleWithdraw()}
              >
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}

      {isTransferModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
          <div className="bg-white rounded-lg p-6 z-20">
            <h2>Beneficiary Account ID:</h2>
            <input
              type="number"
              value={benAccountID}
              onChange={(e) => setBenAccountID(e.target.value)}
            />
            <h2>Transfer Amount</h2>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => setTransferModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2"
                onClick={handleTransfer}
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
          <div className="bg-white rounded-lg p-6 z-20">
            <h2>Account type</h2>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {/* <option value="SELECT">Select</option> */}
              <option value="SAVINGS">Savings</option>
              <option value="CHECKING">Checking</option>
            </select>
            <h2>Account Balance</h2>
            <input
              type="number"
              value={accountBalance}
              onChange={(e) => setAccountBalance(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => setCreateModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2"
                onClick={() => handleCreate()}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
