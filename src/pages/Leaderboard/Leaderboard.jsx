import React, { useState } from "react";
import {
  useGetAllPaymentsQuery,
  useGetRecentPaymentsQuery,
} from "./leaderBoardApi";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("usersLadder");

  // Fetch all payments data from API
  const { data: paymentsResponse, error, isLoading } = useGetAllPaymentsQuery();
  const {
    data: recentPaymentsResponse,
    error: recentError,
    isLoading: isRecentLoading,
  } = useGetRecentPaymentsQuery();

  // Check if the data exists and contains payments array
  const paymentsData = paymentsResponse?.payments || [];
  const recentPaymentsData = recentPaymentsResponse?.payments || []; // Use recent payments data
  console.log(recentPaymentsData);
  // Map paymentsData to usersLadderData format
  const usersLadderData = paymentsData.map((payment, index) => ({
    position: index + 1,
    user: payment.name || `User ${index + 1}`, // Get the user's name
    earnings: `$${payment.amount || "0.00"}`, // Get the payment amount
    bonus: "Coming Soon!", // Placeholder for potential bonus
  }));

  const renderTableContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error loading data: {error.message}</p>;
    }

    if (activeTab === "usersLadder") {
      return (
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Earnings</th>
              <th className="px-4 py-2 text-center">Potential Bonus</th>
            </tr>
          </thead>
          <tbody>
            {usersLadderData.length > 0 ? (
              usersLadderData.map((user, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-4 py-4">{user.position}</td>
                  <td className="px-4 py-4">{user.user}</td>
                  <td className="px-4 py-4">{user.earnings}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-yellow-600 font-semibold">
                      {user.bonus}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {" "}
                      - Stay tuned for exciting bonuses!
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      );
    }

    if (activeTab === "referralLadder") {
      return (
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Earnings</th>
              <th className="px-4 py-2">Referrals</th>
            </tr>
          </thead>
          <tbody>{/* Add content for referral ladder */}</tbody>
        </table>
      );
    }

    if (activeTab === "recentCompletions") {
      return (
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">PaymentType</th>
              <th className="px-4 py-2">Earnings</th>
              <th className="px-4 py-2">Date Completed</th>
            </tr>
          </thead>
          <tbody>
            {isRecentLoading ? (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center">
                  Loading recent completions...
                </td>
              </tr>
            ) : recentError ? (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center">
                  Error loading recent completions: {recentError.message}
                </td>
              </tr>
            ) : recentPaymentsData.length > 0 ? (
              recentPaymentsData.map((payment, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-4 py-4">{payment.name || "Anonymous"}</td>
                  <td className="px-4 py-4">
                    {payment.paymentType || "Unknown Task"}
                  </td>
                  <td className="px-4 py-4">${payment.amount || "0.00"}</td>
                  <td className="px-4 py-4">{payment.timeAgo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center">
                  No recent completions available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex bg-gray-200 p-4">
          <button
            onClick={() => setActiveTab("usersLadder")}
            className={`px-4 py-2 text-gray-700 font-semibold rounded-t-lg focus:outline-none ${
              activeTab === "usersLadder" ? "bg-white" : "bg-gray-200"
            }`}
          >
            Users Ladder
          </button>
          <button
            onClick={() => setActiveTab("referralLadder")}
            className={`px-4 py-2 text-gray-700 font-semibold rounded-t-lg focus:outline-none ${
              activeTab === "referralLadder" ? "bg-white" : "bg-gray-200"
            }`}
          >
            Referral Ladder
          </button>
          <button
            onClick={() => setActiveTab("recentCompletions")}
            className={`px-4 py-2 text-gray-700 font-semibold rounded-t-lg focus:outline-none ${
              activeTab === "recentCompletions" ? "bg-white" : "bg-gray-200"
            }`}
          >
            Recent Completions
          </button>
        </div>

        {/* Filter Section */}
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <select className="border rounded p-2 mb-2 md:mb-0">
              <option>Users in my Country</option>
            </select>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Only show high paying tasks</span>
            </label>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">{renderTableContent()}</div>
      </div>
    </div>
  );
};

export default Leaderboard;
