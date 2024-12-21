import React from "react";
import { useParams } from "react-router-dom";
import { useSpecificAllOfferByNetworkQuery } from '../dashboardApi';
import Loader from "../../components/Loader";

function ViewAllNetworkOffers() {
  const { networkId } = useParams(); 
  const { data, isLoading, isError, error } = useSpecificAllOfferByNetworkQuery(
    { networkId }
  ); // Updated hook
  if (isLoading) {
    return <Loader></Loader>;
  }

  if (isError) {
    return <div>Error: {error?.data?.message || "Failed to fetch offers"}</div>;
  }

  const offers = data?.data?.offers || [];
   // Function to animate each character
   const renderAnimatedText = (text) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="inline-block animate-up-down"
        style={{
          animationDelay: `${index * 0.1}s`, // Delay each character's animation
        }}
      >
        {char === ' ' ? '\u00A0' : char} {/* Non-breaking space */}
      </span>
    ));
  };

  return (
    <div>
      <h1 className="text-white text-center mb-5 text-3xl font-bold animate-pulse"> {data?.data?.networkName && renderAnimatedText(data?.data?.networkName)}</h1>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
      {offers.length > 0 ? (
        offers.map((offer) => (
          <div
            key={offer._id}
            className="cursor-pointer bg-cardBackground p-4 rounded-md"
          >
            <img
              src={
                offer.image ||
                "https://main-p.agmcdn.com/offers/1126583-cwTa2k02.jpg"
              }
              alt={offer.name || ""}
              className="w-full h-24 object-cover rounded-md"
            />
            <div className="mt-4 text-white">
              <h4 className="font-bold text-base">
                {offer?.name ? offer.name.slice(0, 11) : "Offer Name"}
              </h4>
              <h6 className="text-grayColor text-sm">
                {offer?.categoryName || offer.category || ""}
              </h6>
              <h3 className="font-semibold">{offer?.points || "00"} CZ</h3>
            </div>
          </div>
        ))
      ) : (
        <div className="text-white">No offers available for this network.</div>
      )}
    </div>
    </div>
  );
}

export default ViewAllNetworkOffers;
