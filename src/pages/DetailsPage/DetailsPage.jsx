import React from "react";
import { useParams } from "react-router-dom";
import { useSingleOfferQuery } from "../offerApi";

const DetailsPage = () => {
  const params = useParams();
  const { data: singleOffer, error } = useSingleOfferQuery(params.id);

  if (error) {
    return (
      <div className="modal-content min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">Failed to load offer details.</p>
      </div>
    );
  }

  return (
    <div className="modal-content min-h-screen bg-gray-900 p-5 rounded-lg shadow-lg">
      <div className="modal-header flex justify-between items-center pb-4 border-b border-gray-600">
        <img src={"https://i.ibb.co/JjrS14H/cashooz.png"} alt="Brand Logo" className="w-32" />
        <h3 className="text-buttonBackground font-bold text-xl uppercase">
          {singleOffer?.data?.name || "Offer Name"}
        </h3>
      </div>
      
      <div className="modal-body grid gap-5 grid-cols-1 md:grid-cols-2 py-5">
        <div className="space-y-3">
          <p className="text-buttonBackground text-lg">
            <span className="text-white">Points:</span> {singleOffer?.data?.points || "N/A"}
          </p>
          <p className="text-white text-lg">
            <span>Price:</span>{" "}
            <span className="text-buttonBackground font-semibold">
              $ {singleOffer?.data?.price || "N/A"}
            </span>
          </p>
          <p className="text-buttonBackground text-lg">
            <span className="text-white">Daily Limit:</span><br />
            {singleOffer?.data?.dailyLimit || "N/A"}
          </p>
          <p className="text-buttonBackground text-lg">
            <span className="text-white">Total Limit:</span><br />
            {singleOffer?.data?.totalLimit || "N/A"}
          </p>
          <p className="text-buttonBackground text-lg">
            <span className="text-white">Start Date:</span><br />
            {singleOffer?.data?.startDate || "N/A"}
          </p>
          <p className="text-red-600 text-lg">
            <span>End Date:</span><br />
            {singleOffer?.data?.endDate || "N/A"}
          </p>
        </div>
        
        <div className="space-y-3">
          <p>
            <span className="text-white text-lg">Description:</span><br />
            <span
              className="text-grayColor font-light text-sm text-justify"
              dangerouslySetInnerHTML={{ __html: singleOffer?.data?.description || "No description available." }}
            ></span>
          </p>

          <p>
            <span className="text-white text-lg">Offer Status:</span><br />
            <span
              className={`text-xs px-4 py-1 text-white rounded ${
                singleOffer?.data.offerStatus === "active"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {singleOffer?.data.offerStatus || "Unknown"}
            </span>
          </p>
        </div>
        
        <div className="space-y-3">
          <div>
            <span className="font-bold text-sm text-white">Offer Link:</span><br />
            <a
              href={singleOffer?.data?.offerLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-buttonBackground"
            >
              {singleOffer?.data?.offerLink ? "Click here to view the offer" : "No link available"}
            </a>
          </div>
          
          <button
            className="mt-3 w-auto bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-5 rounded-full shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
