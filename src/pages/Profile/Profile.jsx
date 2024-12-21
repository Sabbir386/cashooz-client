import React, { useEffect, useState } from "react";
import { FaArrowAltCircleDown, FaRegClock, FaEdit } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

import { FaCalendarCheck } from "react-icons/fa";
import { verifyToken } from "../../utils/verifyToken";
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Line } from "react-chartjs-2";
import UserDashboard from "./UserDashboard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetPaymentInfoQuery } from "../Payment/paymentApi";
import EditProfile from "./EditProfile";
import Loader from "../../components/Loader";
import { useUserMultipleWithdrawalsQuery } from "../Withdrawl/withDrawalApi";
import {
  useGetAllSocialMediaPostsQuery,
  useGetUserSpecificPostsQuery,
} from "../SocialMedia/socialmediaPostApi";
import { useGetReferredUsersQuery } from "../Affiliate/affiliateApi";
import { useSingleNormalUserQuery } from "../../redux/features/auth/authApi";
import { useUserTotalRewardsQuery } from "../../rewards/rewardApi";
import { useGetAllSurveyCompletedQuery } from "../surveyWallApi";
import { useBonusRewardByUserQuery } from "../BonusReward/bonusRewardApi";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TabOneComponent = ({ userEarningFieldData }) => {
  if (!userEarningFieldData) return null;

  // Generate dynamic labels and data
  const labels = Object.keys(userEarningFieldData)
    .filter(
      (key) =>
        key !== "message" &&
        key !== "userTotalRewards" &&
        typeof userEarningFieldData[key] === "number"
    )
    .map(
      (key) =>
        key
          .replace(/([A-Z])/g, " $1") // Convert camelCase to spaced text
          .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    );

  const values = Object.keys(userEarningFieldData)
    .filter(
      (key) =>
        key !== "message" &&
        key !== "userTotalRewards" && // Exclude userTotalRewards field
        typeof userEarningFieldData[key] === "number"
    )
    .map((key) => userEarningFieldData[key]);

  const data = {
    labels,
    datasets: [
      {
        label: "Earnings",
        data: values,
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.1,
        fill: false,
        pointBorderColor: "rgba(16, 185, 129, 1)",
        pointBackgroundColor: "rgba(16, 185, 129, 1)",
        pointHoverBackgroundColor: "rgba(16, 185, 129, 1)",
        pointHoverBorderColor: "rgba(16, 185, 129, 1)",
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Recent Earnings (30 days)",
        color: "#ffffff",
      },
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8" },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: "#94a3b8",
          callback: function (value) {
            // Custom labels for y-axis
            if (value === 0) return "0";
            if (value <= 500) return `${value}`;
            if (value <= 1000) return "500";
            return value;
          },
        },
        grid: {
          color: "#334155",
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-gray-900 rounded-lg h-72">
      <Line data={data} options={options} />
    </div>
  );
};
const TabTwoComponent = ({ withdrawals }) => (
  <div className="w-full overflow-x-scroll p-4 bg-gray-900 rounded-lg">
    <table className="w-full text-left text-sm text-gray-400">
      <thead className="text-xs uppercase text-buttonBackground border-b border-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">
            Method
          </th>
          <th scope="col" className="px-6 py-3">
            Amount
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Wallet Address
          </th>
          <th scope="col" className="px-6 py-3">
            Transaction ID
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Requested Date
          </th>
        </tr>
      </thead>
      <tbody>
        {withdrawals.length > 0 ? (
          withdrawals.map((withdrawal) => (
            <tr key={withdrawal._id} className="bg-gray-800">
              <td className="px-6 py-4 text-white">{withdrawal.method}</td>
              <td className="px-6 py-4 text-white">
                ${withdrawal.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-white">
                {withdrawal.paypalEmail || "N/A"}
              </td>
              <td className="px-6 py-4 text-white">
                {withdrawal.btcAddress || "N/A"}
              </td>
              <td className="px-6 py-4 text-white">
                {withdrawal.transactionId}
              </td>
              <td
                className={`px-6 py-4 ${
                  withdrawal.status === "pending"
                    ? "text-yellow-500"
                    : withdrawal.status === "completed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {withdrawal.status.charAt(0).toUpperCase() +
                  withdrawal.status.slice(1)}
              </td>

              <td className="px-6 py-4 text-white">
                {new Date(
                  withdrawal.timestamps.requestedAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))
        ) : (
          <tr className="bg-gray-800">
            <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
              No withdrawal records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
const TabThreeComponent = ({ bonusReward }) => (
  <div className="w-full overflow-x-scroll p-4 bg-gray-900 rounded-lg">
    <table className="w-full text-left text-sm text-gray-400">
      <thead className="text-xs uppercase text-buttonBackground border-b border-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">Reward Name</th>
          <th scope="col" className="px-6 py-3">Reward Points</th>
          <th scope="col" className="px-6 py-3">Reward Status</th>
          <th scope="col" className="px-6 py-3">Reward From</th>
          <th scope="col" className="px-6 py-3">Date</th>
        </tr>
      </thead>
      <tbody>
        {bonusReward && bonusReward.length > 0 ? (
          bonusReward.map((reward) => (
            <tr key={reward._id} className="bg-gray-800">
              <td className="px-6 py-4 text-white">{reward.rewardName}</td>
              <td className="px-6 py-4 text-white">{reward.rewardPoints}</td>
              <td className="px-6 py-4 text-white">{reward.rewardStatus}</td>
              <td className="px-6 py-4 text-white">{reward.rewardFrom}</td>
              <td className="px-6 py-4 text-white">
                {new Date(reward.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))
        ) : (
          <tr className="bg-gray-800">
            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
              No bonus rewards found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
const TabFourComponent = ({ surveys }) => (
  <div className="w-full overflow-x-scroll p-4 bg-gray-900 rounded-lg">
    <table className="w-full text-left text-sm text-gray-400">
      <thead className="text-xs uppercase text-buttonBackground border-b border-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">Survey Name</th>
          <th scope="col" className="px-6 py-3">Reward</th>
          <th scope="col" className="px-6 py-3">Reward Status</th>
          <th scope="col" className="px-6 py-3">Date</th>
        </tr>
      </thead>
      <tbody>
        {surveys && surveys.length > 0 ? (
          surveys.map((survey) => (
            <tr key={survey._id} className="bg-gray-800">
              <td className="px-6 py-4 text-white">{survey.name || "N/A"}</td>
              <td className="px-6 py-4 text-white">{survey.points || "N/A"} points</td>
              <td className="px-6 py-4 text-white">{survey.rewardStatus || "N/A"}</td>
              <td className="px-6 py-4 text-white">
                {new Date(survey.createdAt).toLocaleDateString() || "N/A"}
              </td>
            </tr>
          ))
        ) : (
          <tr className="bg-gray-800">
            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
              No surveys found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);


const TabFiveComponent = ({ referrals }) => (
  <div className="bg-gray-900  p-6 rounded-lg shadow-md w-full overflow-x-auto box-border">
    <h3 className="text-white text-lg font-bold mb-4">Referrals History</h3>

    {referrals?.referredUsers?.length > 0 ? (
      <>
        {/* Summary Section */}
        <div className="flex justify-between items-center bg-gray-700 p-4 rounded-lg mb-6">
          <div className="text-center">
            <h4 className="text-white text-sm font-medium">Total Referrals</h4>
            <p className="text-green-400 text-xl font-bold">
              {referrals.totalReferrals}
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-white text-sm font-medium">Total Earnings</h4>
            <p className="text-green-400 text-xl font-bold">
              {referrals.totalEarnings.toFixed(2)} CZ
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-white text-sm font-medium">Active Users</h4>
            <p className="text-green-400 text-xl font-bold">
              {referrals.totalReferrals}
            </p>
          </div>
        </div>

        {/* Referral List */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-white">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2">Commission Earnings</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals.referredUsers.map((ref, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                  } hover:bg-gray-500`}
                >
                  <td className="px-4 py-2">{ref.name}</td>
                  <td className="px-4 py-2">{ref.country}</td>
                  <td className="px-4 py-2">
                    CZ {ref.fifteenPercentOfRewards?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-4 py-2 flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2"></span>
                    Active
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ) : (
      // No referrals fallback
      <div className="text-center text-white text-lg font-medium">
        No referral earnings yet
      </div>
    )}
  </div>
);

const TabSixComponent = ({ socialMediaLinks }) => (
  <div className="w-full overflow-x-scroll p-4 bg-gray-900 rounded-lg">
    <table className="w-full text-left text-sm text-gray-400">
      <thead className="text-xs uppercase text-buttonBackground border-b border-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">User Name</th>
          <th scope="col" className="px-6 py-3">Platform</th>
          <th scope="col" className="px-6 py-3">Link</th>
          <th scope="col" className="px-6 py-3">Reward Points</th>
          <th scope="col" className="px-6 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {socialMediaLinks?.posts && socialMediaLinks.posts.length > 0 ? (
          socialMediaLinks.posts.map((link) => (
            <tr key={link._id} className="bg-gray-800">
              <td className="px-6 py-4 text-white">{link.userName || "N/A"}</td>
              <td className="px-6 py-4 text-white">{link.platform || "Unknown"}</td>
              <td className="px-6 py-4 text-blue-400">
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {link.link || "No link available"}
                </a>
              </td>
              <td className="px-6 py-4 text-white">{link.rewardPoint || "N/A"}</td>
              <td className="px-6 py-4 text-white">{link.status || "Pending"}</td>
            </tr>
          ))
        ) : (
          <tr className="bg-gray-800">
            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
              No social media rewards found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);


const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useAppSelector(useCurrentToken);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // Decode the token to get user information
  let user;
  if (token) {
    user = verifyToken(token);
    console.log("User email:", user?.email);
  }

  // Fetch user's specific posts
  const {
    data: socialMediaLinks,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
    refetch,
  } = useGetUserSpecificPostsQuery(user?.objectId, {
    skip: !user?.objectId, // Skip the query if userId is not available
  });

  // Fetch withdrawal history
  const {
    data: withdrawalData,
    error: withdrawalError,
    isLoading: isWithdrawalLoading,
  } = useUserMultipleWithdrawalsQuery(user?.email);

  // Fetch single normal user data
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useSingleNormalUserQuery(user?.objectId);

  console.log("User data:", userData);

  // Fetch referrals
  const {
    data: referralData,
    isLoading: isReferralsLoading,
    error: referralsError,
  } = useGetReferredUsersQuery({
    referralId: userData?.data?.referralId || "", // Ensure referralId is passed correctly
  });

  // console.log("Referrals:", referralData);
  const {
    data: userEarningFieldData,
    error: userEarningFieldError,
    isLoading: isUserEarningFieldLoading,
  } = useUserTotalRewardsQuery(user?.objectId, {
    skip: user?.role !== "user",
  });

  console.log("userEarningFieldData", userEarningFieldData);
  //survey completed data user
  const {
    data: surveysData,
    isLoading: issurveysDataLoading,
    isError: isSurveysDataError,
    error: surveysDataError,
  } = useGetAllSurveyCompletedQuery(
    { userId: user?.objectId }, // Ensure this parameter matches the API signature
    { skip: !user?.objectId || user?.role !== "user" }
  );

  //reward tabThree
  const {
    data: bonusRewardsData,
    isLoading: isBonusRewardsLoading,
    isError: isBonusRewardsError,
    error: bonusRewardsError,
  } = useBonusRewardByUserQuery( user?.objectId ,
    { skip: !user?.objectId || user?.role !== "user" });
  

  // Handle loading states
  if (
    isPostsLoading ||
    isWithdrawalLoading ||
    isUserLoading ||
    isReferralsLoading ||
    issurveysDataLoading || isBonusRewardsLoading||
    isUserEarningFieldLoading
  ) {
    return <Loader />;
  }

  // Handle errors
  if (isPostsError || withdrawalError || userError || referralsError || isBonusRewardsError) {
    return (
      <p>
        Error:{" "}
        {postsError?.message ||
          withdrawalError?.message ||
          userError?.message ||
          userEarningFieldError ||
          isSurveysDataError ||isBonusRewardsError||
          referralsError?.message}
      </p>
    );
  }

  const withdrawals = withdrawalData?.data || [];
  const referrals = referralData?.data || [];
  const surveys = surveysData?.data || [];
  const bonusReward = bonusRewardsData?.rewards || [];
  console.log('bonusRewardsData',bonusReward)
  console.log("Surveys Data:", surveys);
  // Array of components corresponding to each tab
  const tabComponents = [
    <TabOneComponent userEarningFieldData={userEarningFieldData} />,
    <TabTwoComponent withdrawals={withdrawals} />,
    <TabThreeComponent bonusReward={bonusReward}/>,
    <TabFourComponent surveys={surveys} />,
    <TabFiveComponent referrals={referrals} />,
    <TabSixComponent socialMediaLinks={socialMediaLinks} />,
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-cardBackground p-4 rounded-md my-4">
        <div className="py-4 flex flex-col md:flex-row gap-3 justify-between">
          <div>
            <h3 className="text-xl font-bold text-white border-l-4 border-buttonBackground pl-3 ">
              Details Information
            </h3>
          </div>
          <div className="flex flex-col items-center lg:flex-row gap-3">
            <div
              className="flex justify-center items-center gap-2 text-white cursor-pointer"
              onClick={() => toggleModal()}
            >
              <CiSettings className="block hover:rotate-45 transition-transform duration-300" />

              <small className="block text-sm">Edit profile</small>
            </div>
            {/* <select
              name=""
              id=""
              className="w-[190px] cursor-pointer bg-transparent border py-2 px-4 rounded-md text-sm text-white text-center"
            >
              <option value="">this year</option>
            </select> */}
            <button className="w-[190px] bg-buttonBackground px-4 py-3 text-sm text-white rounded-md font-semibold flex items-center justify-center gap-2 cursor-not-allowed">
              {" "}
              <span>Download Info</span> <FaArrowAltCircleDown />
            </button>
          </div>
        </div>
        <div className="py-4 flex flex-col lg:flex-row gap-3">
          <div>
            <img
              src={
                userData?.data?.profileImg
                  ? userData.data.profileImg
                  : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          <div>
            <h4 className="text-xl text-white font-bold">
              {/* {user.email.match(/^([^@]*)@/)[1]} */}
              {userData?.data?.name}
            </h4>
            <div className="flex flex-col md:flex-row gap-10 my-5">
              {/* <div>
                <h5 className="text-gray-300 text-sm font-medium">Role</h5>
                <h6 className="font-semibold text-white text-base capitalize">
                  Backend Dev
                </h6>
              </div> */}
              <div>
                <h5 className="text-gray-300 text-sm font-medium">
                  Phone Number
                </h5>
                <h6 className="font-semibold text-white text-base capitalize">
                  {userData?.data?.contactNo}
                </h6>
              </div>
              <div>
                <h5 className="text-gray-300 text-sm font-medium">
                  Email Address
                </h5>
                <h6 className="font-semibold text-white text-base capitalize">
                  {userData?.data?.email}
                </h6>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-center justify-start">
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
        </div> */}
      </div>

      <UserDashboard />

      <div className="bg-cardBackground p-4 rounded-md my-4">
        <div className="py-4 flex flex-col md:flex-row gap-3 justify-between">
          <div>
            <h3 className="text-xl font-bold text-white border-l-4 border-buttonBackground pl-3 ">
              Information Overview
            </h3>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-4">
            {[
              "Earnings",
              "Withdraw",
              "Rewards",
              "Survey",
              "Referrals",
              "SocialMedia-Rewards",
            ].map((tabTitle, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm -mb-px transition-colors duration-300 ease-in-out ${
                  activeTab === index
                    ? "text-buttonBackground bg-buttonBackground bg-opacity-20 border-buttonBackground border-b-2"
                    : "text-gray-400 bg-gray-700 hover:text-buttonBackground hover:bg-buttonBackground hover:bg-opacity-20"
                }`}
              >
                {tabTitle}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 mt-4">{tabComponents[activeTab]}</div>
      </div>
      {isModalOpen && (
        <div
          className={`w-full min-h-screen fixed inset-0 bg-black bg-opacity-75 z-[99999] p-0 md:p-6 overflow-y-scroll transition-opacity duration-700 ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full md:w-3/4 mx-auto p-3 relative">
            {/* <button
              onClick={handleCloseModal} // This should be bound correctly
              className="text-white text-2xl bg-red-500 w-8 h-8 rounded-full cursor-pointer absolute left-0 z-50"
            >
              ×
            </button> */}
            <EditProfile onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
