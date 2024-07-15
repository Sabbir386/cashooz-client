import React from 'react';
import { useTotalOfferQuery } from '../dashboardApi';
import { Link } from 'react-router-dom';

const OfferView = ({networkOffers}) => {

    return (
        <div>
           {networkOffers.map((networkOffer, idx) => (
        <div key={idx} className="my-8">
          <h2 className="text-3xl font-bold text-white  border-b-[1px] border-b-secondaryColor pb-4">{networkOffer.networkName}</h2>
          <div className="grid gap-4 mt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
            {networkOffer.offers.map((offer, offerIdx) => (
              
              <Link
                key={offer._id}
                to={`/dashboard/view-offer/${offer._id}`}
                className="bg-cardBackground p-4 rounded-md"
              
              >
                <div className="relative">
                  <img
                    src="https://main-p.agmcdn.com/offers/1126583-cwTa2k02.jpg"
                    alt=""
                    className="w-full relative h-24 object-cover rounded-md"
                  />
                  <div className="absolute w-9 rounded-full h-5 bg-black bg-opacity-50 top-2 right-3 flex items-center justify-center font-bold">
                    <span className="text-white">A</span>
                  </div>
                </div>
                <div className="mt-4 text-white">
                  <h4 className="font-bold text-base">{offer?.name ? offer.name : "Offer Name"}</h4>
                  <h6 className="text-grayColor text-sm">{offer?.categoryName ? offer.categoryName : offer.category }</h6>
                  <h3 className="font-semibold">$17.89</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))} 
        </div>
    );
};

export default OfferView;