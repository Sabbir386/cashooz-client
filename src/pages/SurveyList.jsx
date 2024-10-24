import React from "react";
import { HiOutlineStar } from "react-icons/hi";
import { FaArrowLeft, FaArrowRight, FaLinux, FaPlay } from "react-icons/fa"; // For pagination arrows
import { MdSort } from "react-icons/md"; // For sort icon
import { FcSurvey } from "react-icons/fc";
import { useGetFilteredSurveysQuery } from "./surveyWallApi";

const SurveyList = () => {
  const {
    data: surveys,
    error,
    isLoading,
  } = useGetFilteredSurveysQuery({
    networkName: "Survey Wall",
  });

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load surveys</p>;
  }
  const offers = surveys?.data[0]?.offers || [];
  return (
    <div className="min-h-screen bg-[#212134] p-4 md:p-6 lg:p-10 text-center rounded mt-5">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <FcSurvey className="w-6 h-6 md:w-8 md:h-8 mr-2" />
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Surveys Wall
          </h1>
        </div>
        {/* Sort by */}
        <div className="flex items-center space-x-2">
          <span className="text-sm md:text-base text-white">Sort by</span>
          <div className="flex items-center bg-gray-800 px-2 py-2 md:px-3 md:py-2 rounded-md">
            <MdSort className="text-white mr-1 md:mr-2" />
            <span className="text-sm md:text-base text-white">Recommended</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Empty State Message */}
        {offers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 mb-8">
            <FcSurvey className="w-10 h-10 md:w-12 md:h-12 mb-4" />
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              You've cleared the board!
            </h2>
            <p className="text-sm md:text-lg text-gray-400 mt-2 text-center">
              You've completed all the surveys we have for you right now. More
              surveys might be available through our survey partners below.
            </p>
          </div>
        ) : (
          // Survey Offers Section
          <div className="grid gap-3 mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className="relative p-5 rounded-xl shadow-lg flex flex-col justify-center items-center text-center text-white transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                {/* Background with blur effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#1f1f2e] to-[#0f0f1f] transition-filter duration-300 hover:blur-sm z-0"></div>

                {/* Play button - appears on hover */}
                <div className="absolute inset-0 flex justify-center items-center z-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-green-600 rounded-full p-3">
                    {/* <FaPlay className="text-white text-lg" /> */}
                  </div>
                </div>

                {/* Text content - always visible */}
                <div className="relative z-30">
                  
                  <h5 className="font-bold mt-2 transition-transform duration-300 transform hover:scale-110">
                    {offer.name}
                  </h5>
                  {/* Offer image */}
                  {offer.image && (
                    <img
                      src={offer.image}
                      alt={offer.name}
                      className="mt-2 h-52 w-full object-cover rounded-md"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination for All Surveys Section */}
      <div className="flex justify-between items-center mt-10 text-white">
        {/* Left Pagination */}
        <button className="p-2 bg-[#01D676] rounded-full mr-2">
          <FaArrowLeft className="text-white" />
        </button>

        {/* Current Page Info */}
        <p className="text-white text-sm md:text-lg">Page 1 of X</p>

        {/* Right Pagination */}
        <button className="p-2 bg-[#01D676] rounded-full">
          <FaArrowRight className="text-white" />
        </button>
      </div>

      {/* Survey Partners Section */}
      <div className="mt-10">
        <h3 className="text-xl md:text-2xl font-semibold text-white text-left flex items-center">
          <FaLinux
            className="w-5 h-5 md:w-6 md:h-6 mr-2"
            style={{ color: "#01D676" }} // Set icon color here
          />
          Survey Partners
        </h3>
        <div className="grid gap-3 mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="relative h-64 rounded-xl shadow-lg flex flex-col justify-center items-center text-center text-white transition-transform duration-300 hover:scale-105 cursor-pointer" // Cursor pointer for all devices
            >
              {/* Background with blur effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#1f1f2e] to-[#0f0f1f] transition-filter duration-300 hover:blur-sm z-0"></div>

              {/* Play button - appears on hover */}
              <div className="absolute inset-0 flex justify-center items-center z-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-green-600 rounded-full p-3">
                  <FaPlay className="text-white text-lg" />
                </div>
              </div>

              {/* Text content - always visible */}
              <div className="relative z-30">
                <p className="text-sm transition-transform duration-300 transform hover:scale-110">
                  View surveys
                </p>
                <h5 className="font-bold mt-2 transition-transform duration-300 transform hover:scale-110">
                  Prime
                </h5>
              </div>

              {/* Stars at the bottom */}
              <div className="absolute bottom-0 w-full py-3 text-center text-white font-semibold capitalize text-xs md:text-base z-30">
                <div className="w-full text-center flex justify-center mt-2">
                  <HiOutlineStar style={{ color: "#01D679" }} />
                  <HiOutlineStar style={{ color: "#01D676" }} />
                  <HiOutlineStar style={{ color: "#01D676" }} />
                  <HiOutlineStar style={{ color: "#01D676" }} />
                  <HiOutlineStar style={{ color: "#01D676" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyList;
