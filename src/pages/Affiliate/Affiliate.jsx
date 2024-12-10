import React, { useState, useEffect } from "react";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/features/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { useSingleNormalUserQuery } from "../../redux/features/auth/authApi";
import {
  FaEnvelope,
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaTelegram,
  FaRegCopy,
  FaShareAlt,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faUsers,
  faCalendar,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import SocialSubmissions from "./SocialSubmissions";
import {
  useClaimAffiliateRewardsQuery,
  useCreateAffiliateRewardMutation,
  useGetReferredUsersQuery,
} from "./affiliateApi";
import Swal from "sweetalert2";

const Affiliate = () => {
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);

  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    try {
      user = verifyToken(token);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  // Fetch user data
  const { data: userData, isLoading: isUserLoading } = useSingleNormalUserQuery(
    user?.objectId
  );

  useEffect(() => {
    if (userData?.data?.id) {
      setReferralLink(
        `https://cashooz-838b0.web.app/register?refId=CZ${userData.data.id}`
      );
    }
  }, [userData]);

  // Fetch referrals
  const { data: referralData } = useGetReferredUsersQuery({
    referralId: userData?.data?.referralId || "",
  });
  const referrals = referralData?.data || [];

  // Claim affiliate rewards
  const { data: totalReferralRewards, refetch: refetchClaimedRewards } =
    useClaimAffiliateRewardsQuery(
      { userId: userData?.data?.user },
      { skip: !userData?.data?.user } // Skip the query if userId is not defined
    );
  console.log(totalReferralRewards);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Use the mutation hook
  const [createAffiliateReward, { isLoading: isCreating, error: createError }] =
    useCreateAffiliateRewardMutation();

  const handleClaimRewards = async () => {
    // Check if user data and total earnings are present
    if (!userData?.data?.user || !referrals?.totalEarnings) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Data",
        text: "User ID or earnings data is missing. Cannot proceed with claiming rewards.",
        confirmButtonColor: "#d33",
      });
      return; // Exit early if the required data is not available
    }

    try {
      // Log the data you're sending to the API for debugging purposes
      const userId = userData?.data?.user;
      const referralId = userData?.data?.referralId;
      const claimedAmount = referrals?.totalEarnings;

      console.log("API Request Data:", { userId, referralId, claimedAmount });

      // Make the API call to claim rewards
      const response = await createAffiliateReward({
        userId: userId,
        referralId: referralId,
        claimedAmount: claimedAmount,
      }).unwrap();

      // Log the API response for debugging
      console.log("API Response:", response);

      // Success alert on successful API call
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Reward claimed successfully!",
        confirmButtonColor: "#01D676",
      });
    } catch (error) {
      console.error("Error claiming reward:", error);

      // Display the error message from the API or a general failure message
      let errorMessage = "Failed to claim reward. Please try again.";

      // Check if the error object contains response data with a message
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message; // Show specific error from the API
      }

      // Error alert for API failure
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center text-white">
          <div className="rounded-full bg-[#01D676] h-16 w-16 flex items-center justify-center text-3xl font-bold">
            {userData?.data?.name?.charAt(0).toUpperCase() || "N/A"}
          </div>
          <h3 className="mt-4 text-xl font-semibold">
            {userData?.data?.name || "Guest"}
          </h3>
          <div className="text-green-300 mt-1 text-center">
            You'll get 15% of your friend's task reward as referral commission
          </div>
          <div className="flex mt-4">
            {/* Display the value with proper formatting */}
            <p className="text-lg font-bold">
              CZ{" "}
              {(
                (referrals?.totalEarnings ?? 0) -
                (totalReferralRewards?.data?.totalRewards ?? 0)
              ).toFixed(2)}
            </p>

            {/* Claim Button */}
            <button
              onClick={handleClaimRewards}
              className={`bg-[#01D676] hover:bg-green-600 text-white rounded-md ml-2 px-4 py-1 ${
                isCreating ||
                Number(
                  (
                    (referrals?.totalEarnings ?? 0) -
                    (totalReferralRewards?.data?.totalRewards ?? 0)
                  ).toFixed(2)
                ) === 0
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={
                isCreating ||
                Number(
                  (
                    (referrals?.totalEarnings ?? 0) -
                    (totalReferralRewards?.data?.totalRewards ?? 0)
                  ).toFixed(2)
                ) === 0
              }
            >
              {isCreating ? "Claiming..." : "Claim"}
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-800 p-4 rounded-lg text-white">
          <div className="flex items-center mb-2">
            <FontAwesomeIcon
              icon={faChartLine}
              className="text-[#FFFFFF] mr-2"
              size="lg"
            />
            <h3 className="font-semibold text-lg text-[#01D676]">Statistics</h3>
          </div>

          {/* Total Earnings */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faDollarSign}
                className="text-green-500 mr-2"
                size="lg"
              />
              <p>Total Earnings</p>
            </div>
            <p>
              {totalReferralRewards?.data?.totalRewards?.toFixed(2) ?? "0.00"}{" "}
              CZ
            </p>
          </div>

          {/* Users Referred */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-blue-400 mr-2"
                size="lg"
              />
              <p>Users Referred</p>
            </div>
            <p>{userData?.data?.refferCount}</p>
          </div>
        </div>
      </div>

      {/* Referral Section */}
      {/* <div className="bg-gray-800 text-white p-6 mt-6 rounded-lg flex flex-col md:flex-row items-center justify-between"> */}
      {/* Referral Link Section */}
      {/* <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-gray-400 mb-1">
            Your referral link
          </p>
          <div className="flex items-center bg-gray-700 p-2 rounded-md">
            <span className="text-gray-300 text-sm">{referralLink}</span>
            <button
              className="ml-2 p-2 bg-gray-600 hover:bg-gray-500 text-gray-200 rounded-md"
              onClick={copyToClipboard}
            >
              <FaRegCopy size={20} className="text-[#01D676]" />
            </button>
          </div>
          {copied && (
            <span className="text-green-500 text-xs mt-1">Copied!</span>
          )}
        </div> */}

      {/* Social Sharing Section */}
      {/* <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <p className="text-sm font-medium text-gray-400">
            Share your referral link
          </p>
          <div className="flex space-x-3">
            <a
              href="#email"
              className="p-2 bg-gray-600 hover:bg-gray-500 rounded-md"
            >
              <FaEnvelope size={20} className="text-gray-200" />
            </a>
            <a
              href="#whatsapp"
              className="p-2 bg-gray-600 hover:bg-gray-500 rounded-md"
            >
              <FaWhatsapp size={20} className="text-gray-200" />
            </a>
            <a
              href="#twitter"
              className="p-2 bg-gray-600 hover:bg-gray-500 rounded-md"
            >
              <FaTwitter size={20} className="text-gray-200" />
            </a>
            <a
              href="#facebook"
              className="p-2 bg-gray-600 hover:bg-gray-500 rounded-md"
            >
              <FaFacebook size={20} className="text-gray-200" />
            </a>
            <a
              href="#telegram"
              className="p-2 bg-gray-600 hover:bg-gray-500 rounded-md"
            >
              <FaTelegram size={20} className="text-gray-200" />
            </a>
          </div>
        </div> */}
      {/* </div> */}

      <div className="bg-gray-800 text-white p-6 mt-6 rounded-lg flex flex-col md:flex-row items-center justify-between">
        {/* Referral Link Section */}
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-gray-400 mb-1">
            Your referral link
          </p>
          <div className="flex items-center bg-gray-700 p-2 rounded-md">
            <span className="text-gray-300 text-sm">{referralLink}</span>
            <button
              className="ml-2 p-2 bg-gray-600 hover:bg-gray-500 text-gray-200 rounded-md"
              onClick={copyToClipboard}
            >
              <FaRegCopy size={20} className="text-[#01D676]" />
            </button>
          </div>
          {copied && (
            <span className="text-green-500 text-xs mt-1">Copied!</span>
          )}
        </div>

        {/* Social Sharing Section */}
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 mt-4 md:mt-0">
          <p className="text-sm font-medium text-gray-400">
            Share your referral link
          </p>
          {/* Share Referral Link Button */}
          <button
            className="p-2 bg-gray-600 hover:bg-gray-500 rounded-md text-gray-200 flex items-center"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: "Join me on Cashooz",
                    text: "Earn rewards by completing simple tasks!",
                    url: referralLink,
                  })
                  .then(() => console.log("Shared successfully"))
                  .catch((error) => console.error("Sharing failed", error));
              } else {
                alert("Sharing not supported on this browser.");
              }
            }}
          >
            <FaShareAlt size={20} className="mr-2" />
            Share referral link
          </button>
        </div>
      </div>

      <SocialSubmissions></SocialSubmissions>
    </div>
  );
};

export default Affiliate;
