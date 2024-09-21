import React, { useState, useEffect } from "react";
import { useClaimBonusMutation, useGetUserRewardQuery } from "./rewardApi";
import Swal from "sweetalert2";
const Reward = () => {
  const [activeTab, setActiveTab] = useState(1); // Track active tab (1 for week 1, etc.)

  const [userReward, setUserReward] = useState(null);
  const [currentDay, setCurrentDay] = useState(1); // Track the current day
  const [claimedDays, setClaimedDays] = useState([]); // Track claimed days

  // Extract userId from the token using useEffect to prevent re-render loops
  // Only run this effect when the token changes

  const { data: rewardData } = useGetUserRewardQuery();

  const [claimBonus, { isLoading: isClaiming }] = useClaimBonusMutation();

  useEffect(() => {
    if (rewardData) {
      console.log(rewardData);
      setUserReward(rewardData); // Store reward data in local state
      setClaimedDays(rewardData.claimedDays || []); // Assuming rewardData contains claimed days
      setCurrentDay(rewardData.currentDay || 1); // Assuming rewardData contains the current day
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
      setCurrentDay(day + 1); // Move to the next day
    } catch (error) {
      // Error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Failed to claim bonus! Try Again Tomorrow ",
      });
    }
  };

  // Function to render rewards for each day
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

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-transparent p-6 rounded-xl shadow-2xl w-full max-w-3xl mx-auto lg:max-w-5xl lg:my-12 lg:py-10">
      <div className="relative flex justify-between items-center bg-gradient-to-r from-transparent via-[#285D65] to-blue-500 p-4 rounded-lg shadow-lg mb-6 backdrop-filter backdrop-blur-md">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Daily Reward</h2>
          <p className="text-sm text-gray-200 mt-1">
            Get points for logging into the Website visit daily without
            skipping.
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
          1-Week <br /> Login Bonus
        </button>
        <button
          className={`flex-1 text-center p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-2 ${
            activeTab === 2
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold"
              : "bg-gray-800 text-white font-bold hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab(2)}
        >
          2-Week <br /> Task Completed Bonus
        </button>
        <button
          className={`flex-1 text-center p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-2 ${
            activeTab === 3
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold"
              : "bg-gray-800 text-white font-bold hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab(3)}
        >
          3-Week <br /> Affiliated Bonus
        </button>
      </div>

      {renderRewards()}
    </div>
  );
};

export default Reward;
