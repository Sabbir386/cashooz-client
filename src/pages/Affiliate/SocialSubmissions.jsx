import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSnapchatGhost,
  FaTwitter,
  FaRegCopy,
  FaCheck,
  FaTelegram,
  FaPinterest,
} from "react-icons/fa";
import {
  useCreateSocialMediaPostMutation,
  useGetUserSpecificPostsQuery,
} from "../SocialMedia/socialmediaPostApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useSingleNormalUserQuery } from "../../redux/features/auth/authApi";
import CustomSwal from "../../customSwal/customSwal";

// Platform data
const platforms = [
  {
    name: "Facebook",
    description: "Submit posts, stories or reels.",
    reward: "100 CZ",
    color: "text-blue-500",
    icon: <FaFacebook size={28} />,
  },
  {
    name: "Instagram",
    description: "Submit posts, stories or reels.",
    reward: "100 CZ",
    color: "text-pink-500",
    icon: <FaInstagram size={28} />,
  },
  {
    name: "YouTube",
    description: "Submit videos or shorts.",
    reward: "100 CZ",
    color: "text-red-500",
    icon: <FaYoutube size={28} />,
  },
  {
    name: "TikTok",
    description: "Submit TikTok videos.",
    reward: "100 CZ",
    color: "text-gray-400",
    icon: <FaTiktok size={28} />,
  },
  {
    name: "Snapchat",
    description: "Submit spotlights and more.",
    reward: "100 CZ",
    color: "text-yellow-500",
    icon: <FaSnapchatGhost size={28} />,
  },
  {
    name: "Twitter",
    description: "Submit spotlights and more.",
    reward: "100 CZ",
    color: "text-blue-400",
    icon: <FaTwitter size={28} />,
  },
  {
    name: "Telegram",
    description: "Submit spotlights and more.",
    reward: "100 CZ",
    color: "text-blue-400",
    icon: <FaTelegram size={28} />,
  },
  {
    name: "Pinterest",
    description: "Submit spotlights and more.",
    reward: "100 CZ",
    color: "text-blue-400",
    icon: <FaPinterest size={28} />,
  },
];

const SocialSubmissions = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null); // Manage selected platform
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const [isCopied, setIsCopied] = useState(false);
  const [postURL, setPostURL] = useState(""); // Manage post URL input
  const [imagePreview, setImagePreview] = useState(null);
  const [referralLink, setReferralLink] = useState("");
  const [createSocialMediaPost, { isLoading, isError, isSuccess }] =
    useCreateSocialMediaPostMutation();
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    try {
      user = verifyToken(token);
      // //console.log(user)
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  // Fetch user's specific posts
  const {
    data: userCompletedSocialMediaLinks,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
  } = useGetUserSpecificPostsQuery(user?.objectId, {
    skip: !user?.objectId, // Skip the query if userId is not available
  });
  // //console.log("userCompletedSocialMediaLinks", userCompletedSocialMediaLinks);

  // Function to match platforms with posts
  const getMatchedPosts = (platformName) => {
    return (
      userCompletedSocialMediaLinks?.posts?.filter(
        (post) => post.platform === platformName
      ) || []
    );
  };
  const isCardDisabled = (platformName) => {
    const matchedPosts = getMatchedPosts(platformName);
    return matchedPosts.some(
      (post) => post.status === "completed" || post.status === "pending"
    );
  };

  const skipQuery =
    !user ||
    !["user", "superAdmin", "admin", "advertiser"].includes(user?.role);
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useSingleNormalUserQuery(user?.objectId, { skip: skipQuery });
  //console.log(userData);
  useEffect(() => {
    if (userData?.data?.id) {
      // Dynamically set the referral link when userData is available
      setReferralLink(
        `https://cashooz-838b0.web.app/register?refId=CZ${userData?.data?.id}`
      );
    }
  }, [userData]);
  if (referralLink) {
    //console.log(referralLink);
  }
  // Open modal with the selected platform's data
  const handleCardClick = (platform) => {
    // setSelectedPlatform(platform);
    // // //console.log(selectedPlatform)
    // setIsModalOpen(true);
    if (!isCardDisabled(platform.name)) {
      setSelectedPlatform(platform);
      setIsModalOpen(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlatform(null);
    setPostURL(""); // Reset post URL on close
  };

  // Get Open Graph image from URL (This is a simplified approach)
  const fetchImagePreview = async () => {
    try {
      const response = await fetch(
        `https://opengraph.io/api/og?url=${encodeURIComponent(postUrl)}`
      );
      const data = await response.json();
      setImagePreview(data.ogImage?.url); // This returns the Open Graph image URL
    } catch (error) {
      console.error("Failed to fetch image preview:", error);
    }
  };
  useEffect(() => {
    if (postURL) {
      fetchImagePreview();
    }
  }, [postURL]);

  const copyToClipboard = () => {
    const textToCopy = `Earn money from 
💲Cashooz.com💰 where you can earn cash by completing various tasks like games, survey, install, watching, shopping that you already do online everyday. It's free. Get your signup bonus ${selectedPlatform.reward} and Start earning now...
${selectedPlatform.name}!  #Cashooz #workfromhome #earnmoney #makemoney #easymoney #makemoneyonline #earnmoneyonline`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true); // Update state to show the check mark
      setTimeout(() => setIsCopied(false), 2000); // Reset to copy icon after 2 seconds
    });
  };
  const handleSubmitPost = async () => {
    if (!postURL) return; // Don't proceed if the URL is empty

    const postDetails = {
      userName: userData?.data?.name,
      email: user?.email,
      userId: user?.objectId,
      link: postURL,
      platform: selectedPlatform.name,
      rewardPoint: selectedPlatform.reward,
      status: "pending",
    };

    //console.log(postDetails);
    try {
      const response = await createSocialMediaPost(postDetails).unwrap();
      //console.log(response);
      if (response.message) {
        CustomSwal.fire({
          icon: "success",
          title: "Pending!",
          text: "Your post was successfully submitted.",
          background: "#2e3b4e",
          confirmButtonColor: "#4CAF50", // Button background color
          confirmButtonText: "Great!",
          customClass: {
            confirmButton: "text-white", // Button text color
            title: "text-white", // Title text color
            text: "text-blue-400", // Change text color for message
            htmlContainer: "text-blue-400", // Ensure content text matches
          },
        });

        closeModal();
      } else {
        throw new Error(response.message || "Submission failed");
      }
    } catch (err) {
      console.error("Error submitting post:", err);
      CustomSwal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.message || "Failed to submit post. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };
  // const sharePost = (platform) => {
  //   //console.log(platform)
  //   const postUrl = `https://cashooz-838b0.web.app/register?refId=`; // Replace with the URL of the post you want to share
  //   const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  //     postUrl
  //   )}`;

  //   // Open Facebook share modal
  //   window.open(facebookShareUrl, "_blank", "width=600,height=400");
  // };

  const sharePost = (platformName) => {
    const postUrl = `https://cashooz-838b0.web.app/register?refId=`; // Base URL for sharing

    // Define share URLs for each platform
    const platformShareUrls = {
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        postUrl
      )}`,
      Instagram: `https://www.instagram.com/?url=${encodeURIComponent(
        postUrl
      )}`, // Instagram doesn't support direct sharing via URL
      YouTube: `https://www.youtube.com/share?url=${encodeURIComponent(
        postUrl
      )}`, // Hypothetical sharing URL
      TikTok: `https://www.tiktok.com/share?url=${encodeURIComponent(postUrl)}`, // Hypothetical sharing URL
      Snapchat: `https://www.snapchat.com/share?url=${encodeURIComponent(
        postUrl
      )}`, // Hypothetical sharing URL
      Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        postUrl
      )}&text=Check+this+out!`,
      Telegram: `https://t.me/share/url?url=${encodeURIComponent(
        postUrl
      )}&text=Check+this+out!`,
      Pinterest: `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
        postUrl
      )}&description=Check+this+out!`,
    };

    // Get the share URL for the selected platform
    const shareUrl = platformShareUrls[platformName];

    if (shareUrl) {
      //console.log(`Sharing on ${platformName}: ${shareUrl}`);
      // Optionally open the share URL in a new tab
      // window.open(shareUrl, "_blank");
      window.open(shareUrl, "_blank", "width=600,height=400");
    } else {
      //console.log(`Platform "${platformName}" is not supported for sharing.`);
    }
  };

  return (
    <div className="mt-6 shadow-lg bg-gray-800 text-white p-6 rounded-lg">
      <div className="max-w-6xl mx-auto">
        {/* Heading Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            # Social Media Submissions
          </h2>
          <p className="text-gray-400">
            Click a platform below to submit your post &amp; earn!
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => {
            const matchedPosts = getMatchedPosts(platform.name);
            const status = matchedPosts.find(
              (post) => post.status === "completed" || post.status === "pending"
            )?.status;

            const buttonText =
              status === "completed"
                ? "Completed"
                : status === "pending"
                ? "Pending"
                : `Earn ${platform.reward}`;

            const disabled = status === "completed" || status === "pending";

            return (
              <div
                key={platform.name}
                className={`flex flex-col justify-between items-start p-6 rounded-lg shadow-lg ${
                  disabled
                    ? "bg-gray-600 cursor-not-allowed opacity-50"
                    : "bg-[#374151] bg-opacity-50 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                }`}
                onClick={() => !disabled && handleCardClick(platform)} // Handle card click if not disabled
              >
                {/* Platform Icon and Details */}
                <div className="flex items-center gap-6 mb-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md bg-gray-800 ${platform.color}`}
                  >
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {platform.description}
                    </p>
                  </div>
                </div>
                <button
                  className={`w-1/2 text-sm font-semibold text-white px-2 py-3 rounded-lg shadow-md mx-auto ${
                    disabled
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[#01D676] hover:bg-green-600"
                  }`}
                  disabled={disabled} // Disable button if status is completed or pending
                >
                  {buttonText} {/* Dynamically display the button text */}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Section */}
      {isModalOpen && selectedPlatform && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                {selectedPlatform.name}
              </h3>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white text-2xl hover:bg-gray-600 transition duration-300"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            <p className="text-gray-300 mb-4">{selectedPlatform.description}</p>

            {/* Step 1: Copy Caption Instructions */}
            <p className="text-sm text-gray-400 mb-4">
              <strong>Step 1:</strong> Use this caption for your post on
              {" " + selectedPlatform.name} platform.
            </p>
            <div className="mb-4">
              <textarea
                className="w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 text-gray-300 bg-[#121A25] cursor-not-allowed"
                rows="4"
                readOnly
                value={`Earn money from 
💲Cashooz.com💰 where you can earn cash by completing various tasks like games, survey, install, watching, shopping that you already do online everyday. It's free. Get your bonus ${selectedPlatform.reward} and Start earning now...
#Cashooz #workfromhome #earnmoney #makemoney #easymoney #makemoneyonline #earnmoneyonline 
`}
              ></textarea>
              <button
                className="mt-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                onClick={copyToClipboard}
              >
                {isCopied ? (
                  <FaCheck className="inline-block mr-2 text-green-500" /> // Show check mark when copied
                ) : (
                  <FaRegCopy className="inline-block mr-2" /> // Show copy icon initially
                )}
                {isCopied ? "Copied!" : "Copy Post Caption"}
              </button>
            </div>
            {/* Step 2: Copy Caption Instructions */}
            <div className="flex gap-4 justify-between items-center py-4">
              <p className="text-sm text-gray-400">
                <strong>Step 2:</strong> Share to {selectedPlatform.name}
              </p>
              <button
                className="bg-buttonBackground px-3 py-1 rounded-lg text-sm"
                onClick={() => sharePost(selectedPlatform.name)}
              >
                share
              </button>
            </div>
            {/* Step 3: Provide URL to Claim Reward */}
            <p className="text-sm text-gray-400">
              <strong>Step 3:</strong> After you've posted, simply provide the
              URL of your {selectedPlatform.name} story or post in the field
              below to claim your reward of {selectedPlatform.reward}.
            </p>
            <input
              type="text"
              placeholder="Enter your post link..."
              className="w-full mt-2 p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 text-gray-300 bg-[#121A25]"
              value={postURL}
              onChange={(e) => setPostURL(e.target.value)} // Track URL input
            />
            <div className="flex justify-end mt-4">
              <button
                className="w-full md:w-1/4 bg-[#01D676] hover:bg-green-600 text-white py-2 rounded-lg"
                disabled={!postURL} // Disable button if URL is empty
                onClick={() => {
                  // Logic for URL submission (e.g., save the URL, claim reward)
                  handleSubmitPost();
                  // closeModal(); // Close modal after submission
                }}
              >
                {isLoading ? "Submitting..." : "Submit Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialSubmissions;
