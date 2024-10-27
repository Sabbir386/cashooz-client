import React, { useRef } from "react";
import { HiOutlineStar } from "react-icons/hi";
import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa";
import { MdSort } from "react-icons/md";
import { FcSurvey } from "react-icons/fc";
import { useGetFilteredSurveysQuery } from "./surveyWallApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SurveyList = () => {
  const {
    data: surveys,
    error,
    isLoading,
  } = useGetFilteredSurveysQuery({
    networkName: "Survey Wall",
  });

  const offers = surveys?.data[0]?.offers || [];
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load surveys</p>;
  }

  return (
    <div className="min-h-screen bg-[#212134] p-4 md:p-6 lg:p-10 text-center rounded mt-5">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <FcSurvey className="w-6 h-6 md:w-8 md:h-8 mr-2" />
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Surveys Wall
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm md:text-base text-white">Sort by</span>
          <div className="flex items-center bg-gray-800 px-2 py-2 md:px-3 md:py-2 rounded-md">
            <MdSort className="text-white mr-1 md:mr-2" />
            <span className="text-sm md:text-base text-white">Recommended</span>
          </div>
        </div>
      </div>

      {offers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 mb-8">
          <FcSurvey className="w-10 h-10 md:w-12 md:h-12 mb-4" />
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            You've cleared the board!
          </h2>
          <p className="text-sm md:text-lg text-gray-400 mt-2 text-center">
            You've completed all the surveys we have for you right now. More
            surveys might be available soon.
          </p>
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={3}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 10 },
          }}
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer._id} className="text-white">
              <div className="p-5 rounded-xl shadow-lg bg-gradient-to-b from-[#1f1f2e] to-[#0f0f1f] transition-transform duration-300 hover:scale-105 cursor-pointer">
                {offer.image && (
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="h-52 w-full object-cover rounded-md mb-3"
                  />
                )}

                <h4 className="font-bold text-base">
                  {offer?.name ? offer.name.slice(0, 11) : "Offer Name"}
                  {offer.name.length > 11 && "..."}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-6 mt-6">
        {/* Previous Button */}
        <button
          ref={prevRef}
          className="flex items-center space-x-2 font-semibold"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded border border-gray-600 hover:bg-green-700">
            <FaArrowLeft className="text-[#3D4F58] hover:text-white" />
          </div>
          <span className="text-[#3D4F58] hidden sm:inline">PREVIOUS</span>
        </button>

        {/* Results Info */}
        <span className="text-white font-semibold">
          1 - {offers.length} of results
        </span>

        {/* Next Button */}
        <button
          ref={nextRef}
          className="flex items-center space-x-2 font-semibold"
        >
          <span className="text-[#3D4F58] hidden sm:inline">NEXT</span>
          <div className="flex items-center justify-center w-8 h-8 rounded bg-green-700">
            <FaArrowRight className="text-white" />
          </div>
        </button>
      </div>

      {/* Survey Partners Section */}
      <div className="mt-10">
        <h3 className="text-xl md:text-2xl font-semibold text-white text-left flex items-center">
          Survey Partners
        </h3>
        <div className="grid gap-3 mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="relative h-64 rounded-xl shadow-lg flex flex-col justify-center items-center text-center text-white transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#1f1f2e] to-[#0f0f1f] transition-filter duration-300 hover:blur-sm z-0"></div>
              <div className="absolute inset-0 flex justify-center items-center z-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-green-600 rounded-full p-3">
                  <FaPlay className="text-white text-lg" />
                </div>
              </div>
              <div className="relative z-30">
                <p className="text-sm transition-transform duration-300 transform hover:scale-110">
                  View surveys
                </p>
                <h5 className="font-bold mt-2 transition-transform duration-300 transform hover:scale-110">
                  Prime
                </h5>
              </div>
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
