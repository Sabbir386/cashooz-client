import React, { useState } from "react";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("usersLadder");
  const usersLadderData = [
    { position: 1, user: 'tb224873530', country: 'Turkey', earnings: '$26', bonus: '$38' },
    { position: 2, user: 'tb222796625', country: 'Italy', earnings: '$21.13', bonus: '$33' },
    { position: 3, user: 'tb123456789', country: 'Germany', earnings: '$21.13', bonus: '$24' },
  ];

  const referralLadderData = [
    { position: 1, user: 'referralUser1', earnings: '$30', referrals: 12 },
    { position: 2, user: 'referralUser2', earnings: '$25', referrals: 10 },
  ];

  const recentCompletionsData = [
    { task: 'Task A', user: 'User A', earnings: '$10', completed: '2024-09-20' },
    { task: 'Task B', user: 'User B', earnings: '$15', completed: '2024-09-21' },
  ];

  const renderTableContent = () => {
    if (activeTab === "usersLadder") {
      return (
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Earnings</th>
              <th className="px-4 py-2">Potential Bonus</th>
            </tr>
          </thead>
          <tbody>
            {usersLadderData.map((user, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-4">{user.position}</td>
                <td className="px-4 py-4">{user.user}</td>
                <td className="px-4 py-4">{user.earnings}</td>
                <td className="px-4 py-4">{user.bonus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTab === "referralLadder") {
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
          <tbody>
            {referralLadderData.map((referral, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-4">{referral.position}</td>
                <td className="px-4 py-4">{referral.user}</td>
                <td className="px-4 py-4">{referral.earnings}</td>
                <td className="px-4 py-4">{referral.referrals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTab === "recentCompletions") {
      return (
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Recent Task</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Earnings</th>
              <th className="px-4 py-2">Date Completed</th>
            </tr>
          </thead>
          <tbody>
            {recentCompletionsData.map((task, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-4">{task.task}</td>
                <td className="px-4 py-4">{task.user}</td>
                <td className="px-4 py-4">{task.earnings}</td>
                <td className="px-4 py-4">{task.completed}</td>
              </tr>
            ))}
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
