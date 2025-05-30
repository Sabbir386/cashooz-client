import React, { useState, useEffect } from "react";
import {
  useClaimBonusMutation,
  useGetUserRewardQuery,
  useReferralCompletedRewardsMutation,
  useTaskCompletedMutation,
} from "./rewardApi";
import { verifyToken } from "../utils/verifyToken";
import { useViewCompletedOfferQuery } from "../pages/completedOfferApi";
import { useAppSelector } from "../redux/features/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { useSingleNormalUserQuery } from "../redux/features/auth/authApi";
import { useCreateBonusRewardMutation } from "../pages/BonusReward/bonusRewardApi";
import CustomSwal from "../customSwal/customSwal";

const Reward = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [userReward, setUserReward] = useState(null);
  const [userCompletedTask, setUserCompletedTask] = useState(0);
  const [userTaskClaimCount, setUserTaskClaimCount] = useState(0);
  const [claimedDays, setClaimedDays] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [claimedTasks, setClaimedTasks] = useState([]);
  const [isClaiming, setIsClaiming] = useState(false); // New state for claiming tasks

  const { data: rewardData, refetch: refetchRewardData } =
    useGetUserRewardQuery();
  //console.log("rewardData", rewardData);
  const [claimBonus] = useClaimBonusMutation();
  const token = useAppSelector(useCurrentToken);
  const [taskCompleted] = useTaskCompletedMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [referrals, setReferrals] = useState([]);
  const [claimedBonuses, setClaimedBonuses] = useState([]);
  const [claimedReferralBonuses, setClaimedReferralBonuses] = useState([]);
  const [referralData, setReferralData] = useState([]);
  const [referralCompletedRewards] = useReferralCompletedRewardsMutation();
  const [createBonusReward] = useCreateBonusRewardMutation();
  let user = null;
  if (token) {
    user = verifyToken(token);
  }

  const userId = user?.objectId || "";
  const skipQuery =
    !user ||
    !["user", "superAdmin", "admin", "advertiser"].includes(user?.role);
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useSingleNormalUserQuery(user?.objectId, { skip: skipQuery });
  //console.log(userData);
  const referralBonusTiers = [
    { referrals: 10, bonus: 100 },
    { referrals: 25, bonus: 150 },
    { referrals: 40, bonus: 200 },
    { referrals: 60, bonus: 250 },
    { referrals: 80, bonus: 300 },
    { referrals: 100, bonus: 350 },
  ];

  useEffect(() => {
    if (rewardData?.referralClaimCount) {
      // Initialize claimed bonuses based on referralClaimCount from backend
      const initialClaimedBonuses = referralBonusTiers
        .filter((tier, index) => index < rewardData.referralClaimCount)
        .map((tier) => tier.referrals); // Correct key for referral counts
      setClaimedReferralBonuses(initialClaimedBonuses);
    }
  }, [rewardData]);

  const handleReferralsClaimBonus = async (referralCount, bonusAmount) => {
    // Prevent duplicate claims
    if (!claimedReferralBonuses.includes(referralCount)) {
      try {
        await referralCompletedRewards({
          userId: userId,
          referralReward: bonusAmount,
        });
        const bonusRewardData = {
          userId: user?.objectId,
          rewardName: "referral",
          rewardPoints: bonusAmount,
          rewardFrom: "referralBonus",
        };
        await createBonusReward(bonusRewardData).unwrap();
        // Add claimed tier to state
        setClaimedReferralBonuses((prev) => [...prev, referralCount]);

        CustomSwal.fire(
          "Success!",
          `You have claimed ${bonusAmount} CZ for ${referralCount} referrals.`,
          "success"
        );

        // Update reward data from backend
      } catch (error) {
        CustomSwal.fire(
          "Error!",
          "Failed to claim bonus. Please try again.",
          "error"
        );
      }
    }
  };

  const {
    data: completedOfferData,
    isLoading: isOffersLoading,
    error: offersError,
  } = useViewCompletedOfferQuery(userId, {
    skip: !userId,
  });
  // //console.log(completedOfferData)

  useEffect(() => {
    if (completedOfferData) {
      setUserCompletedTask(completedOfferData.data.length);
    }
  }, [completedOfferData]);

  useEffect(() => {
    setIsLoading(true);
    if (rewardData) {
      setUserReward(rewardData);
      setUserTaskClaimCount(userReward?.taskClaimCount);
      setClaimedDays(rewardData.claimedDays || []);
      setClaimedTasks(rewardData?.taskClaimCount || []);
      setIsLoading(false);
    }
  }, [rewardData]);
  //console.log(rewardData);
  const handleClaimBonus = async (day) => {
    try {
      setIsClaiming(true); // Set loading state
      const response = await claimBonus().unwrap();
      const bonusRewardData = {
        userId: user?.objectId,
        rewardName: "login",
        rewardPoints: 5,
        rewardFrom: "loginBonus",
      };
      await createBonusReward(bonusRewardData).unwrap();
      CustomSwal.fire({
        icon: "success",
        title: "Bonus Claimed!",
        html: `<p class="custom-swal-text">${response.message}</p>`,
      });

      // Update the state after claiming the reward
      setClaimedDays([...claimedDays, day]);
      setCurrentDay(rewardData.currentDay || 1);
    } catch (error) {
      CustomSwal.fire({
        icon: "error",
        title: "Oops...",
        html: `<p class="custom-swal-text">${error.message || "Failed to claim bonus! Try Again Tomorrow"}</p>`,
      });
    } finally {
      setIsClaiming(false); // Reset loading state
    }
  };

  const handleClaimTaskBonus = async (taskId, taskReward) => {
    if (!userId) {
      CustomSwal.fire({
        icon: "error",
        title: "User ID Not Found",
        html: `<p>Unable to claim task bonus. Please try logging in again.</p>`,
      });
      return; // Exit the function if userId is not available
    }

    try {
      setIsClaiming(true); // Set loading state
      const response = await taskCompleted({ userId, taskReward }).unwrap();
      const bonusRewardData = {
        userId: user?.objectId,
        rewardName: "taskReward",
        rewardPoints: taskReward,
        rewardFrom: "taskBonus",
      };
      await createBonusReward(bonusRewardData).unwrap();
      CustomSwal.fire({
        icon: "success",
        title: "Bonus Claimed!",
        html: `<p>${response.message} </p>`,
      });

      // Update claimed tasks state to include the newly claimed task
      setClaimedTasks((prev) =>
        Array.isArray(prev) ? [...prev, taskId] : [taskId]
      );

      // Refetch user rewards to get updated claimedTasks from the server
      await refetchRewardData();
    } catch (error) {
      CustomSwal.fire({
        icon: "error",
        title: "Oops...",
        html: `<p>${error.message} || "Failed to claim task reward!"</p>`,
      });
    } finally {
      setIsClaiming(false); // Reset loading state
    }
  };

  const renderRewards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        {[1, 2, 3, 4, 5, 6, 7].map((day, idx) => (
          <div
            key={day}
            className={`${
              day === 7
                ? "bg-gradient-to-l from-transparent via-[#4a6fa1] to-[#2c3e5c] "
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
            {!userReward ? (
              <div className="flex flex-row gap-2 py-5">
                <div className="w-4 h-4 rounded-full bg-buttonBackground animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-buttonBackground animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-buttonBackground animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : idx + 1 <= userReward?.claimCount ||
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
  const renderTaskBonuses = () => {
    // Ensure claimedTasks is an array (default to an empty array if undefined)
    const validClaimedTasks = Array.isArray(claimedTasks) ? claimedTasks : [];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { id: 1, reward: 100, requiredTasks: 10, totalClaimCount: 1 },
          { id: 2, reward: 250, requiredTasks: 25, totalClaimCount: 2 },
          { id: 3, reward: 400, requiredTasks: 40, totalClaimCount: 3 },
          { id: 4, reward: 600, requiredTasks: 60, totalClaimCount: 4 },
          { id: 5, reward: 800, requiredTasks: 80, totalClaimCount: 5 },
          { id: 6, reward: 1000, requiredTasks: 100, totalClaimCount: 6 },
        ].map((task, idx) => (
          <div
            key={task.id}
            className={`relative flex flex-col justify-between items-center p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              validClaimedTasks.includes(task.id) ||
              userTaskClaimCount === task.id
                ? "opacity-50"
                : ""
            } bg-gradient-to-b from-gray-800 to-gray-900`}
          >
            {/* Task Details */}
            <div>
              <div className="text-lg font-bold text-yellow-400 mb-2">
                {task.requiredTasks}-Task Bonus
              </div>
              <div className="text-white text-2xl">
                Reward: {task.reward} CZ
              </div>
            </div>

            {/* Task Progress */}
            <div className="flex justify-center items-center mt-4 mb-4">
              <div className="grid grid-cols-10 gap-2">
                {[...Array(task.requiredTasks)].map((_, index) => {
                  const step = index + 1;
                  return (
                    <div
                      key={step}
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        userCompletedTask >= step
                          ? "bg-purple-600 text-white"
                          : "border-2 border-gray-400 text-gray-400"
                      }`}
                    >
                      {userCompletedTask >= step ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span className="text-sm">{step}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tasks Completed and Claim Button */}
            <div className="w-full text-center mt-auto">
              <div className="text-sm text-gray-400">
                <span className="font-bold text-green-300">
                  {Math.min(userCompletedTask, task.requiredTasks)}
                </span>
                /<span className="text-yellow-400">{task.requiredTasks}</span>{" "}
                Tasks Completed
              </div>
              {userCompletedTask >= task.requiredTasks ? (
                rewardData?.taskClaimCount < task.totalClaimCount ? (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer"
                    onClick={() => handleClaimTaskBonus(task.id, task.reward)}
                  >
                    Claim
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2 opacity-50 cursor-not-allowed"
                    disabled
                  >
                    Claimed
                  </button>
                )
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2 opacity-50 cursor-not-allowed"
                  disabled
                >
                  {userCompletedTask < task.requiredTasks
                    ? "Not Available"
                    : "Claimed"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAffiliatedBonus = () => (
    <div className="flex justify-start items-center">
      <div className="text-center p-6 md:p-10 rounded-lg bg-gray-800 shadow-md text-white w-full">
        <h3 className="text-2xl font-bold">Affiliated Bonus</h3>
        <p className="mt-4">
          Earn more bonuses by referring others to our platform!
        </p>
        <div className="mt-6">
          {/* Bonus Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-white border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 border border-gray-600">
                    Referral Count
                  </th>
                  <th className="px-4 py-2 border border-gray-600">
                    Bonus (CZ)
                  </th>
                  <th className="px-4 py-2 border border-gray-600 text-center">
                    Claim
                  </th>
                </tr>
              </thead>
              <tbody>
                {referralBonusTiers.map((tier, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                    } hover:bg-gray-500`}
                  >
                    <td className="px-4 py-2 border border-gray-600">
                      {tier.referrals}
                    </td>
                    <td className="px-4 py-2 border border-gray-600">
                      {tier.bonus} CZ
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      {/* Display claim button or status */}
                      {userData?.data?.refferCount >= tier.referrals &&
                      !claimedReferralBonuses.includes(tier.referrals) ? (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-4 rounded"
                          onClick={() =>
                            handleReferralsClaimBonus(
                              tier.referrals,
                              tier.bonus
                            )
                          }
                        >
                          Claim
                        </button>
                      ) : claimedReferralBonuses.includes(tier.referrals) ? (
                        <span className="text-gray-400">Claimed</span>
                      ) : (
                        <span className="text-gray-400">Not Eligible</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

      <div className="flex gap-3 flex-wrap justify-start bg-transparent backdrop-blur-md p-2 rounded-xl shadow-inner mb-6">
        <button
          className={`text-center w-full md:w-40 text-sm p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-2 ${
            activeTab === 1
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold"
              : "bg-gray-800 text-white font-bold hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Daily Bonus
        </button>
        <button
          className={`text-center w-full md:w-40 text-sm p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-2 ${
            activeTab === 2
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold"
              : "bg-gray-800 text-white font-bold hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Task <br /> Completed Bonus
        </button>
        <button
          className={`text-center w-full md:w-40 text-sm p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-2 ${
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
