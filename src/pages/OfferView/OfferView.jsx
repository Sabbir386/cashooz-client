import React, { useEffect, useState } from 'react';
import { useOfferByNetworkQuery } from '../dashboardApi';
import { useSingleOfferQuery } from '../offerApi';
import { useCreateCompletedOfferMutation } from '../completedOfferApi';
import Swal from 'sweetalert2'; // SweetAlert for notifications
import { verifyToken } from '../../utils/verifyToken';
import { useAppSelector } from '../../redux/features/hooks';
import { useCurrentToken } from '../../redux/features/auth/authSlice';
import { Link, useParams } from 'react-router-dom';

const OfferView = () => {
  const [networkOffers, setNetworkOffers] = useState([]); // Holds network offers data
  const [selectedOffer, setSelectedOffer] = useState(null); // Holds selected offer details for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility

  const params = useParams(); // To access offer ID from URL params
  const token = useAppSelector(useCurrentToken); // Get token from Redux state

  // Fetch selected offer details based on selectedOffer ID or URL params
  const { data: singleOffer, error: singleOfferError } = useSingleOfferQuery(selectedOffer?._id || params.id); 
  const [createCompletedOffer] = useCreateCompletedOfferMutation(); // Mutation hook for completing offers
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);

  // Function to toggle more info
  const toggleMoreInfo = () => {
    setIsMoreInfoOpen(prevState => !prevState);
  };

  const  truncatedDescription = (description) => {
    if (!description) return 'No description available.';
    const words = description.split(' ');
    return words.length > 35 ? words.slice(0, 35).join(' ') : description;
  };
  // Decode token to get user information
  let user;
  if (token) {
    user = verifyToken(token);
  }

  // Fetch offers by network from backend
  const { data: offers, isLoading, isFetching, error: offerError, refetch } = useOfferByNetworkQuery();

  useEffect(() => {
    if (offers?.data) {
      setNetworkOffers(offers.data); // Set fetched offers in state
    }
  }, [offers]);

  // Handle offer completion and show SweetAlert notification
  const handleCompleteOffer = async () => {
    try {
      await createCompletedOffer({
        clickId: 'clickIdValue', // Replace with actual value
        offerId: selectedOffer?._id || params.id,
        userId: user?.objectId,
        points: selectedOffer?.points,
      }).unwrap();

      Swal.fire({
        title: 'Success!',
        text: 'Offer completed successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to complete offer.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  // Toggle modal and set selected offer details
  const toggleModal = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(!isModalOpen);
  };

  if (isLoading || isFetching) {
    return <p>Loading offers...</p>;
  }

  if (offerError) {
    return <p>Error loading offers. Please try again later.</p>;
  }

  return (
    <div>
      {networkOffers.length > 0 ? (
        networkOffers.map((networkOffer, idx) => (
          <div key={idx} className="my-8">
            <h2 className="text-3xl font-bold text-white border-b-[1px] border-b-secondaryColor pb-4">
              {networkOffer.networkName}
            </h2>

            <div className="grid gap-4 mt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
              {networkOffer.offers.map((offer) => (
                <div
                  key={offer._id}
                  className="cursor-pointer bg-cardBackground p-4 rounded-md"
                  onClick={() => toggleModal(offer)} // Open modal on offer click
                >
                  <div className="relative">
                    <img
                      src={offer.image || 'https://main-p.agmcdn.com/offers/1126583-cwTa2k02.jpg'}
                      alt={offer.name}
                      className="w-full h-24 object-cover rounded-md"
                    />
                  </div>
                  <div className="mt-4 text-white">
                    <h4 className="font-bold text-base">
                      {offer?.name ? offer.name.slice(0, 19) : 'Offer Name'}
                      {offer.name.length > 19 && '...'}
                    </h4>
                    <h6 className="text-grayColor text-sm">
                      {offer?.categoryName || offer.category}
                    </h6>
                    <h3 className="font-semibold">{offer?.points || '00'} CZ</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No offers available.</p>
      )}

      {/* Modal for displaying selected offer details */}
      {/* Modal for displaying selected offer details */}
{isModalOpen && selectedOffer && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  <div className="bg-gray-800 p-5 rounded-lg w-full max-w-md shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-white text-xl font-bold">
        {selectedOffer.name || 'Offer Title'}
      </h2>
      <button
        onClick={() => setIsModalOpen(false)}
        className="text-white text-xl"
      >
        ×
      </button>
    </div>

    {/* Offer Image */}
    <img
      src={selectedOffer.image || 'https://i.ibb.co/JjrS14H/cashooz.png'}
      alt="Offer Image"
      className="w-16 mb-4"
    />

    <div className="mb-4">
      {/* Price and Popularity Score in the same line */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-green-400 text-lg font-semibold">
          $ {selectedOffer.price || 'N/A'}
        </p>
        <p className="text-yellow-300">
          Popularity Score: ⭐⭐⭐⭐⭐
        </p>
      </div>
      <p className="text-white text-sm mb-4">
        {truncatedDescription}
      </p>
    </div>

    {/* More Info Toggle */}
    <div className="text-blue-400 mt-2 cursor-pointer flex items-center" onClick={toggleMoreInfo}>
      <span>More Info</span>
      <span className="ml-1">{isMoreInfoOpen ? '▲' : '▼'}</span>
    </div>
    {isMoreInfoOpen && (
      <div className="text-gray-300 mt-2">
        {/* Additional details content */}
        <p>{selectedOffer.description || 'Extra details about the offer can go here...'}</p>
      </div>
    )}

    {/* Rewards section */}
    <div className="mb-4">
      <p className="text-white font-semibold">Rewards</p>
      <div className="flex items-center justify-between bg-gray-700 p-2 rounded-md">
        <p className="text-green-400 font-bold">$0.10</p>
        <p className="text-white">Complete Quiz - (30 questions)</p>
      </div>
    </div>

    {/* Steps section */}
    <div className="mb-4">
      <p className="text-white font-semibold">Steps</p>
      <p className="text-white">Complete Quiz - (30 questions)</p>
    </div>

    {/* Earn button */}
    <button
      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
      onClick={handleCompleteOffer}
    >
      Earn $0.10
    </button>
  </div>
</div>
)}

    </div>
  );
};

export default OfferView;
