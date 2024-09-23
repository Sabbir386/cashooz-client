import React, { useState, useEffect } from "react";
import { useClaimBonusMutation, useGetUserRewardQuery } from "./rewardApi";
import Swal from "sweetalert2";

const Reward = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [userReward, setUserReward] = useState(null);
  const [claimedDays, setClaimedDays] = useState([]); // For daily login bonus
  const [currentDay, setCurrentDay] = useState(1); 
  const [claimedTasks, setClaimedTasks] = useState([]); // For task bonuses

  const { data: rewardData } = useGetUserRewardQuery();
  const [claimBonus, { isLoading: isClaiming }] = useClaimBonusMutation();

  useEffect(() => {
    if (rewardData) {
      setUserReward(rewardData);
      setClaimedDays(rewardData.claimedDays || []);
      setClaimedTasks(rewardData.claimedTasks || []);
    }
  }, [rewardData]);

  const handleClaimBonus = async (day) => {
    try {
      const response = await claimBonus().unwrap();

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Bonus Claimed!",
        text: response.message,
      });

      // Update the state after claiming the reward
      setClaimedDays([...claimedDays, day]); // Mark this day as claimed
      setClaimedDays(rewardData.claimedDays || []); // Assuming rewardData contains claimed days
      setCurrentDay(rewardData.currentDay || 1); // Assuming rewardData contains the current day
    } catch (error) {
      // Error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Failed to claim bonus! Try Again Tomorrow ",
      });
    }
  };

  const renderRewards = () => {
    return (
      <div className="grid grid-cols-3 gap-4 text-center">
        {[1, 2, 3, 4, 5, 6, 7].map((day, idx) => (
          <div
            key={day}
            className={`${
              day === 7
                ? "col-span-3 bg-gradient-to-l from-transparent via-[#4a6fa1] to-[#2c3e5c] "
                : "bg-gradient-to-b from-gray-800 to-gray-900"
            } p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              claimedDays.includes(day) ? "opacity-50" : ""
            } flex flex-col items-center justify-center`}
          >
            <div className="text-lg font-bold text-yellow-400 mb-2">
              Day {day}
            </div>

            {day === 7 ? (
              <img
                src="https://www.kindpng.com/picc/m/18-182340_golden-cup-prize-png-prize-png-transparent-png.png"
                alt="Exclusive Skin"
                className="w-16 h-16 object-cover mb-1 rounded-full shadow-lg"
              />
            ) : (
              <div className="text-white text-2xl">Reward: 5 CZ</div>
            )}

            {idx + 1 <= userReward?.claimCount ||
            idx + 1 > userReward?.claimCount + 1 ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 opacity-50 cursor-not-allowed"
                onClick={() => handleClaimBonus(day)}
                disabled
              >
                {idx + 1 <= userReward?.claimCount
                  ? "Claimed"
                  : idx + 1 > userReward?.claimCount + 1
                  ? "Not Available"
                  : ""}
              </button>
            ) : (
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2`}
                onClick={() => handleClaimBonus(day)}
              >
                {isClaiming
                  ? "Claiming..."
                  : claimedDays.includes(day)
                  ? "Claimed"
                  : "Claim Bonus"}
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderTaskBonuses = () => (
    <div className="grid grid-cols-2 gap-4">
      {[
        { id: 1, reward: 10 },
        { id: 2, reward: 20 },
      ].map((task) => (
        <div
          key={task.id}
          className={`p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
            claimedTasks.includes(task.id) ? "opacity-50" : ""
          } flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900`}
        >
          <div className="text-lg font-bold text-yellow-400 mb-2">
            {task.reward}-Task Bonus
          </div>
          <div className="text-white text-2xl">
            Reward: {task.reward * 2} CZ
          </div>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 ${
              claimedTasks.includes(task.id)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleClaimBonus("task", task.id)}
            disabled={claimedTasks.includes(task.id)}
          >
            {claimedTasks.includes(task.id) ? "Claimed" : "Claim Bonus"}
          </button>
        </div>
      ))}
      <div className="col-span-2 text-center text-gray-500 text-sm">
        Complete 40 Tasks to unlock the 40 CZ bonus (Coming Soon...)
      </div>
    </div>
  );

  const renderAffiliatedBonus = () => (
    <div className="flex justify-center items-center">
      <div className="text-center p-10 rounded-lg bg-gray-800 shadow-md text-white">
        <h3 className="text-2xl font-bold">Affiliated Bonus</h3>
        <p className="mt-4">
          Earn more bonuses by referring others to our platform!
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-transparent p-6 rounded-xl shadow-2xl w-full max-w-3xl mx-auto lg:max-w-5xl lg:my-12 lg:py-10">
      <div className="relative flex justify-between items-center bg-gradient-to-r from-transparent via-[#285D65] to-blue-500 p-4 rounded-lg shadow-lg mb-6 backdrop-filter backdrop-blur-md">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Rewards</h2>
          <p className="text-sm text-gray-200 mt-1">
            Claim bonuses by completing tasks, logging in, or referring others.
          </p>
        </div>
        <img
          src="https://img.freepik.com/premium-vector/cashback-rewards-icon-discount-promotion-icon_1024563-41.jpg?w=740"
          alt="Reward"
          className="w-20 h-20 object-cover rounded-full shadow-lg"
        />
      </div>

      <div className="flex justify-around bg-transparent backdrop-blur-md p-2 rounded-xl shadow-inner mb-6">
        <button
          className={`flex-1 text-center p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-2 ${
            activeTab === 1
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold"
              : "bg-gray-800 text-white font-bold hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab(1)}
        >
          7 Days  <br /> Login Bonus
        </button>
        <button
          className={`flex-1 text-center p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-2 ${
            activeTab === 2
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold"
              : "bg-gray-800 text-white font-bold hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Task <br /> Completed Bonus
        </button>
        <button
          className={`flex-1 text-center p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-2 ${
            activeTab === 3
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold"
              : "bg-gray-800 text-white font-bold hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab(3)}
        >
          Affiliated <br /> Bonus
        </button>
      </div>

      {activeTab === 1 && renderRewards()}
      {activeTab === 2 && renderTaskBonuses()}
      {activeTab === 3 && renderAffiliatedBonus()}
    </div>
  );
};

export default Reward;
