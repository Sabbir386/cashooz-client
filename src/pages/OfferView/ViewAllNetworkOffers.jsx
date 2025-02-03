import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSpecificAllOfferByNetworkQuery } from "../dashboardApi";
import Loader from "../../components/Loader";
import { useCreateCompletedOfferMutation } from "../completedOfferApi";
import { FaStar, FaStarHalf } from "react-icons/fa";
import CustomSwal from "../../customSwal/customSwal";
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useOfferCompletedRewardsMutation } from "../../rewards/rewardApi";

function ViewAllNetworkOffers() {
  const { networkId } = useParams();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [createCompletedOffer] = useCreateCompletedOfferMutation();
  const [offerCompletedRewards] = useOfferCompletedRewardsMutation();
  const token = useAppSelector(useCurrentToken);
  const user = token ? verifyToken(token) : null;

  const { data, isLoading, isError, error } = useSpecificAllOfferByNetworkQuery(
    { networkId, userId: user?.objectId },
    { skip: !user?.objectId } // Skip the query if userId is missing
  );
  const toggleModal = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(!isModalOpen);
  };
  const toggleMoreInfo = () => {
    setIsMoreInfoOpen(!isMoreInfoOpen);
  };
  const truncatedDescription = (description) => {
    if (!description) return "No description available.";
    const words = description.split(" ");
    return words.length > 35
      ? `${words.slice(0, 35).join(" ")}...`
      : description;
  };
  const handleCompleteOffer = async () => {
    console.log(selectedOffer);
    try {
      await createCompletedOffer({
        clickId: "clickIdValue",
        offerId: selectedOffer?._id || params.id,
        userId: user?.objectId,
        points: selectedOffer?.points,
        payout: selectedOffer?.points,
      }).unwrap();

      CustomSwal.fire({
        title: "Success!",
        text: "Offer completed successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      const response = await offerCompletedRewards({
        userId: user?.objectId, // Assuming `user` contains the logged-in user's details
        offerReward: selectedOffer?.points, // Use the points as the task reward
      }).unwrap();
      // console.log('response offer',response)
    } catch (err) {
      console.log(err);
      CustomSwal.fire({
        title: "Error!",
        text: "Failed to complete offer.",
        icon: "error",
        confirmButtonText: "Try Again",
      }).then(() => {
        // Close the modal after success notification
        setIsModalOpen(false);
      });
    }
  };
  if (isLoading) {
    return <Loader></Loader>;
  }

  if (isError) {
    return <div>Error: {error?.data?.message || "Failed to fetch offers"}</div>;
  }

  const offers = data?.data?.offers || [];
  // Function to animate each character
  const renderAnimatedText = (text) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="inline-block animate-up-down"
        style={{
          animationDelay: `${index * 0.1}s`, // Delay each character's animation
        }}
      >
        {char === " " ? "\u00A0" : char} {/* Non-breaking space */}
      </span>
    ));
  };

  return (
    <div>
      <h1 className="text-white text-center mb-5 text-3xl font-bold">
        {" "}
        {data?.data?.networkName && renderAnimatedText(data?.data?.networkName)}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div
              className="cursor-pointer bg-cardBackground p-4 rounded-md"
              onClick={() => toggleModal(offer)}
            >
              <img
                src={
                  offer.image ||
                  "https://main-p.agmcdn.com/offers/1126583-cwTa2k02.jpg"
                }
                alt={offer.name}
                className="w-full h-24 object-cover rounded-md"
              />
              <div className="mt-4 text-white">
                <h4 className="font-bold text-base">
                  {offer?.name ? offer.name.slice(0, 11) : "Offer Name"}
                  {offer.name.length > 11 && "..."}
                </h4>
                <h6 className="text-grayColor text-sm">
                  {offer?.categoryName || offer.category}
                </h6>
                <h3 className="font-semibold">{offer?.points || "00"} CZ</h3>
              </div>
            </div>
          ))
        ) : (
          <div className="text-white">
            No offers available for this network.
          </div>
        )}
      </div>
      {/* Modal for displaying selected offer details */}
      {isModalOpen && selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[999]">
          <div className="bg-[#1f2029] p-6 rounded-lg w-full max-w-md h-[600px] shadow-lg relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4 sticky h-[50px]">
              <h2 className="text-white text-xl font-bold">
                {selectedOffer.name
                  ? selectedOffer.name.split(" ").slice(0, 7).join(" ") +
                    (selectedOffer.name.split(" ").length > 7 ? "..." : "")
                  : "Not Available!"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white text-2xl bg-red-500 w-8 h-8 rounded-full cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col mb-4  h-[430px] overflow-y-auto ">
              {/* Offer Image */}
              <div className="flex flex-col items-start justify-between gap-3 mb-4">
                <img
                  src={
                    selectedOffer.image ||
                    "https://i.ibb.co/JjrS14H/cashooz.png"
                  }
                  alt="Offer"
                  className="block mx-auto w-32 h-40 object-cover rounded-full"
                />
                <div>
                  {/* <p className="text-white text-2xl font-bold">
                        CZ {selectedOffer.points || "0"}
                      </p>{" "} */}
                  <div className="text-cyan-400 text-sm">
                    <div className="text-yellow-400 flex gap-1">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </div>{" "}
                    <p> Popularity Score</p>
                  </div>{" "}
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 bg-gray-700 p-2 rounded-md">
                <p className="text-white font-semibold">Description</p>

                <div className="text-gray-300 text-sm mb-2">
                  {/* Always display truncated description, even when More Info is clicked */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: truncatedDescription(selectedOffer.description),
                    }}
                  ></p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-white font-semibold mb-2">Terms</p>
                <p className="text-white text-sm">{selectedOffer.terms} </p>
              </div>
            </div>
            {/* Earn Button */}
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
              onClick={handleCompleteOffer}
            >
              Earn CZ {selectedOffer.points || "0"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewAllNetworkOffers;
