import React, { useEffect, useRef, useState } from "react";
import { HiOutlineStar } from "react-icons/hi";
import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa";
import { FcSurvey } from "react-icons/fc";
import {
  useCreateSurveyCompletedMutation,
  useGetFilteredSurveysQuery,
} from "./surveyWallApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Loader from "../components/Loader";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useAppSelector } from "../redux/features/hooks";
import { useCreateCompletedOfferMutation } from "./completedOfferApi";
import { useSurveyCompletedMutation } from "../rewards/rewardApi";
import CustomSwal from "../customSwal/customSwal";
import OfferPartners from "./OfferView/OfferPartners";
const SurveyList = () => {
  const [createCompletedOffer] = useCreateCompletedOfferMutation();
  const [surveyCompleted] = useSurveyCompletedMutation();

  const [surveyOffers, setSurveyOffers] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const token = useAppSelector(useCurrentToken);
  const user = token ? verifyToken(token) : null;
  const [createSurveyCompleted] = useCreateSurveyCompletedMutation();
  // console.log(user);
  const {
    data: surveys,
    error,
    isLoading,
    isError,
  } = useGetFilteredSurveysQuery({
    networkName: "Survey Wall",
  });
  console.log("surveys", surveys);
  const offers = surveys?.data?.[0]?.offers || [];
  useEffect(() => {
    if (Array.isArray(offers) && offers.length) {
      setSurveyOffers(offers);
    } else if (offers.length === 0) {
      console.log("No surveys available");
    }
  }, [offers]);

  // survey completeion
  const handleSurveyCompletion = async (offer) => {
    // Redirect to Toluna survey
    window.open("https://www.toluna.com/", "_blank");

    // Display success notification with specific offer details
    // console.log("survey", offer);
    try {
      console.log(offer?._id, user?.objectId, offer?.points);
      await createCompletedOffer({
        clickId: "clickIdValue",
        offerId: offer?._id,
        userId: user?.objectId,
        points: offer?.points,
      }).unwrap();

      await surveyCompleted({
        userId: user?.objectId,
        surveyReward: offer?.points,
      }).unwrap();
      const response = await createSurveyCompleted({
        name: offer?.name,
        offerId: offer?._id,
        userId: user?.objectId,
        points: offer?.points,
        network: offer?.network,
        category: offer?.category,
      }).unwrap();

      // console.log("Response:", response);
      CustomSwal.fire({
        icon: "success",
        title: `Survey Completed!`,
        html: `<strong>${offer.name}</strong><br>You earned <strong>${offer.points} CZ</strong> for completing this survey!`,
        confirmButtonText: "Claim",
      });
    } catch (err) {
      console.log("Error completing survey:", err);
      CustomSwal.fire({
        title: "Error!",
        text: "Failed to complete offer.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
    // Save the survey completion in the backend (assumes a backend function to update rewards)
    // For example, if you have a function like `saveSurveyCompletion`:
    // await saveSurveyCompletion({ offerId: offer._id, userId: user?.objectId, points: offer.points });
  };
  if (isLoading) {
    return <Loader></Loader>;
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
      </div>

      {surveyOffers?.length === 0 ? (
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
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
            disabledClass: "opacity-25 cursor-not-allowed",
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            1368: { slidesPerView: 6, spaceBetween: 10 },
            1024: { slidesPerView: 5, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 25 },
            510: { slidesPerView: 2, spaceBetween: 20 },
            0: { slidesPerView: 2, spaceBetween: 5 },
          }}
        >
          {surveyOffers?.length > 0 ? (
            surveyOffers.map((offer) => (
              <SwiperSlide key={offer._id} className="text-white">
                <div
                  className="p-4 rounded-lg shadow-md bg-gradient-to-b from-[#1f1f2e] to-[#0f0f1f] transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col items-center gap-3"
                  onClick={() => handleSurveyCompletion(offer)}
                >
                  {offer.image && (
                    <img
                      src={offer.image}
                      alt={offer.name}
                      className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-md border border-gray-700"
                    />
                  )}
                  <div className="text-center text-white">
                    <h4 className="font-bold text-sm truncate max-w-[100px] sm:max-w-[120px] md:max-w-full">
                      {offer?.name ? offer.name.slice(0, 15) : "Offer Name"}
                      {offer.name?.length > 15 && "..."}
                    </h4>
                    <h5 className="text-base font-semibold text-green-400 mt-1">
                      CZ {offer?.points || "0"}
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-white text-center">
              No surveys available to display.
            </p>
          )}
        </Swiper>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-6 mt-6">
        {/* Previous Button */}
        <button
          ref={prevRef}
          className="flex items-center space-x-2 font-semibold"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded bg-green-700">
            <FaArrowLeft className="text-white hover:text-white" />
          </div>
          <span className="text-white hidden sm:inline">PREVIOUS</span>
        </button>

        {/* Results Info */}
        {/* <span className="text-white font-semibold">
          1 - {surveyOffers.length} 
        </span> */}

        {/* Next Button */}
        <button
          ref={nextRef}
          className="flex items-center space-x-2 font-semibold"
        >
          <span className="text-white hidden sm:inline">NEXT</span>
          <div className="flex items-center justify-center w-8 h-8 rounded bg-green-700">
            <FaArrowRight className="text-white" />
          </div>
        </button>
      </div>
      {/* Survey Partners Section */}
      <div>
       
        <OfferPartners></OfferPartners>
      </div>
    </div>
  );
};

export default SurveyList;
