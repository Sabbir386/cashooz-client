import React, { useState, useEffect } from "react";
import { useClaimBonusMutation, useGetUserRewardQuery } from "./rewardApi";

const Reward = () => {
  const [activeTab, setActiveTab] = useState(1); // Track active tab (1 for week 1, etc.)
  const [userId, setUserId] = useState("66b8b79678c3977d24564b59"); // Replace with actual user ID or context
  const [userReward, setUserReward] = useState(null);

  const { data: rewardData, error: fetchError } = useGetUserRewardQuery(userId);
  const [claimBonus, { isLoading: isClaiming, error: claimError }] =
    useClaimBonusMutation();

  useEffect(() => {
    if (rewardData) {
      setUserReward(rewardData);
    }
  }, [rewardData]);

  const handleClaimBonus = async () => {
    try {
      const response = await claimBonus({ userId }).unwrap();
      alert(response.message);
      setUserReward(response); // Update local state with new reward data
    } catch (error) {
      console.error("Failed to claim bonus:", error);
      alert("Error claiming bonus. Please try again.");
    }
  };

  const isRewardClaimable = (day) => {
    if (!userReward) return false;
    // Check if the reward for the given day is claimable
    const today = new Date().getDate();
    return day === today && !userReward.claimedDays.includes(day);
  };

  const renderRewards = () => {
    switch (activeTab) {
      case 1:
        return (
          <div className="grid grid-cols-3 gap-4 text-center">
            {[1, 2, 3, 4, 5, 6].map((day) => (
              <div
                key={day}
                className={`bg-gradient-to-b from-gray-800 to-gray-900 p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                  isRewardClaimable(day) ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="text-lg font-bold text-yellow-400 mb-2">
                  Day {day}
                </div>
                <div className="text-white text-2xl">5 CZ</div>
                {isRewardClaimable(day) && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    onClick={() =>
                      handleClaimBonus(
                        day,
                        new Date().toLocaleString("default", { month: "long" })
                      )
                    }
                    disabled={isClaiming}
                  >
                    {isClaiming ? "Claiming..." : "Claim Bonus"}
                  </button>
                )}
              </div>
            ))}
            {/* Day 7: Exclusive rewards */}
            <div className="col-span-3 bg-gradient-to-l from-transparent via-[#4a6fa1] to-[#2c3e5c] p-4 h-36 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
              <div className="text-lg font-bold text-yellow-400 mb-1">
                Day 7
              </div>
              <img
                src="https://www.kindpng.com/picc/m/18-182340_golden-cup-prize-png-prize-png-transparent-png.png"
                alt="Exclusive Skin"
                className="w-16 h-16 object-cover mb-1 rounded-full shadow-lg"
              />
              <div className="text-white text-xl font-semibold">
                Exclusive Rewards
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-3 gap-4 text-center">
            {/* Week 2 rewards */}
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <div className="text-lg font-bold text-yellow-400 mb-2">
                Day 1
              </div>
              <div className="text-white text-2xl">500K</div>
            </div>
            {/* Add more cards for Week 2 */}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-3 gap-4 text-center">
            {/* Week 3 rewards */}
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <div className="text-lg font-bold text-yellow-400 mb-2">
                Day 1
              </div>
              <div className="text-white text-2xl">1M</div>
            </div>
            {/* Add more cards for Week 3 */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-transparent p-6 rounded-xl shadow-2xl w-full max-w-3xl mx-auto lg:max-w-5xl lg:my-12 lg:py-10">
      {/* Header Section */}
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

      {/* Week Tabs */}
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

      {/* Rewards Content */}
      {renderRewards()}

      {/* Footer Button */}
      <div className="mt-6 text-center">
        <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-4 rounded-full shadow-xl hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800 transition-transform transform hover:scale-105">
          Come back tomorrow
        </button>
      </div>
    </div>
  );
};

export default Reward;
