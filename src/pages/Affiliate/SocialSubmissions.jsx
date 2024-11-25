import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSnapchatGhost,
  FaTwitter,
  FaRegCopy,
  FaCheck,
} from "react-icons/fa";
import Swal from "sweetalert2";

// Platform data
const platforms = [
  {
    name: "Facebook",
    description: "Submit posts, stories or reels.",
    reward: "CZ 20",
    color: "text-blue-500",
    icon: <FaFacebook size={28} />,
  },
  {
    name: "Instagram",
    description: "Submit posts, stories or reels.",
    reward: "CZ 25",
    color: "text-pink-500",
    icon: <FaInstagram size={28} />,
  },
  {
    name: "YouTube",
    description: "Submit videos or shorts.",
    reward: "CZ 35",
    color: "text-red-500",
    icon: <FaYoutube size={28} />,
  },
  {
    name: "TikTok",
    description: "Submit TikTok videos.",
    reward: "CZ 40",
    color: "text-gray-400",
    icon: <FaTiktok size={28} />,
  },
  {
    name: "Snapchat",
    description: "Submit spotlights and more.",
    reward: "CZ 45",
    color: "text-yellow-500",
    icon: <FaSnapchatGhost size={28} />,
  },
  {
    name: "Twitter",
    description: "Submit spotlights and more.",
    reward: "CZ 50",
    color: "text-blue-400",
    icon: <FaTwitter size={28} />,
  },
];

const SocialSubmissions = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null); // Manage selected platform
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const [isCopied, setIsCopied] = useState(false);
  const [postURL, setPostURL] = useState(""); // Manage post URL input

  // Open modal with the selected platform's data
  const handleCardClick = (platform) => {
    setSelectedPlatform(platform);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlatform(null);
    setPostURL(""); // Reset post URL on close
  };

  const copyToClipboard = () => {
    const textToCopy = `Ready to earn big? Check out ${selectedPlatform.name}! Earn ${selectedPlatform.reward} today. Click here to get started.`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true); // Update state to show the check mark
      setTimeout(() => setIsCopied(false), 2000); // Reset to copy icon after 2 seconds
    });
  };
  const handleSubmitPost = async () => {
    if (!postURL) return; // Don't submit if URL is empty

    try {
      // const response = await submitPost({ postURL }); // Call the submitPost mutation
      if (response?.data?.success) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your post was successfully submitted.",
          background: "#2e3b4e", // Custom background color
          confirmButtonColor: "#4CAF50", // Green confirm button
          confirmButtonText: "Great!",
        });
      } else {
        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Failed to submit post. Please try again.",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error("Error submitting post:", err);
      // Show error alert in case of any error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while submitting your post.",
        confirmButtonText: "OK",
      });
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
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex flex-col justify-between items-start p-6 rounded-lg shadow-lg bg-[#374151] bg-opacity-50 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
              onClick={() => handleCardClick(platform)} // Handle card click
            >
              {/* Icon Section */}
              <div className="flex items-center gap-6 mb-4">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md bg-gray-800 CZ ${platform.color}`}
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

              {/* Reward Button */}
              <button className="w-1/2 text-sm font-semibold text-white bg-[#01D676] hover:bg-green-600 px-2 py-3 rounded-lg shadow-md transition-colors duration-300 mx-auto">
                Earn {platform.reward}
              </button>
            </div>
          ))}
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

            {/* Step 2: Copy Caption Instructions */}
            <p className="text-sm text-gray-400 mb-4">
              <strong>Step 2:</strong> Use this caption for your post on
              Facebook, Instagram, or any social platform.
            </p>
            <div className="mb-4">
              <textarea
                className="w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 text-gray-300 bg-[#121A25] cursor-not-allowed"
                rows="4"
                readOnly
                value={`Join Cashooz now and start cashing in! Cashooz is the way to go. 
Join now at https://cashooz-838b0.web.app/register and get ${selectedPlatform.reward} bonus #Cashooz #so #easymoney #viral #explore #fyp`}
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
                className="w-1/4 bg-[#01D676] hover:bg-green-600 text-white py-2 rounded-lg"
                disabled={!postURL} // Disable button if URL is empty
                onClick={() => {
                  // Logic for URL submission (e.g., save the URL, claim reward)
                  handleSubmitPost();
                  closeModal(); // Close modal after submission
                }}
              >
                Submit Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialSubmissions;