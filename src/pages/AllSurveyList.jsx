import React from "react";
import { FcSurvey } from "react-icons/fc";
import {
  useCreateSurveyCompletedMutation,
  useGetFilteredSurveysQuery,
} from "./surveyWallApi";
import { useCreateCompletedOfferMutation } from "./completedOfferApi";
import { useSurveyCompletedMutation } from "../rewards/rewardApi";
import { useAppSelector } from "../redux/features/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import CustomSwal from "../customSwal/customSwal";

const AllSurveyList = () => {
  // Hooks must be called inside the component body
  const token = useAppSelector(useCurrentToken);
  const user = token ? verifyToken(token) : null;

  const {
    data: surveyOffers,
    isLoading,
    isError,
  } = useGetFilteredSurveysQuery({
    networkName: "Survey Wall",
  });
  const [createSurveyCompleted] = useCreateSurveyCompletedMutation();
  const [createCompletedOffer] = useCreateCompletedOfferMutation();
  const [surveyCompleted] = useSurveyCompletedMutation();

  const handleSurveyCompletion = async (offer) => {
    window.open("https://www.toluna.com/", "_blank");

    try {
      await createCompletedOffer({
        clickId: "clickIdValue",
        offerId: offer._id,
        userId: user?.objectId,
        points: offer.points,
      }).unwrap();

      await surveyCompleted({
        userId: user?.objectId,
        surveyReward: offer.points,
      }).unwrap();

      await createSurveyCompleted({
        name: offer.name,
        offerId: offer._id,
        userId: user?.objectId,
        points: offer.points,
        network: offer.network,
        category: offer.category,
      }).unwrap();

      CustomSwal.fire({
        icon: "success",
        title: `Survey Completed!`,
        html: `<strong>${offer.name}</strong><br>You earned <strong>${offer.points} CZ</strong> for completing this survey!`,
        confirmButtonText: "Claim",
      });
    } catch (err) {
      console.error("Error completing survey:", err);
      CustomSwal.fire({
        title: "Error!",
        text: "Failed to complete offer.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  if (isLoading) {
    return <p className="text-white">Loading surveys...</p>;
  }

  if (isError) {
    return (
      <p className="text-white">
        Failed to load surveys. Please try again later.
      </p>
    );
  }

  const offers = surveyOffers?.data?.[0]?.offers || [];

  return (
    <div className="min-h-screen bg-[#212134] p-4 md:p-6 lg:p-10 text-center rounded mt-5">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <FcSurvey className="w-6 h-6 md:w-8 md:h-8 mr-2" />
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            All Surveys Offer
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div
              key={offer._id}
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
                  {offer.name ? offer.name.slice(0, 15) : "Offer Name"}
                  {offer.name?.length > 15 && "..."}
                </h4>
                <h5 className="text-base font-semibold text-green-400 mt-1">
                  CZ {offer.points || "0"}
                </h5>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">
            No surveys available to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllSurveyList;
