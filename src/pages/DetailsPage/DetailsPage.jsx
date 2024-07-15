import React from 'react';
import { useParams } from 'react-router-dom';
import { useSingleOfferQuery } from '../offerApi';

const DetailsPage = () => {
  const params = useParams();
  const { data: singleOffer, error } = useSingleOfferQuery(params.id);

    return (
        <div className="modal-content min-h-screen">
              <div className="modal-header">
                
                  <img
                    src={"https://i.ibb.co/JjrS14H/cashooz.png"}
                   
                  />
                
                {/* <h6 className="text-lg text-white font-bold uppercase">
                  Offer Name
                </h6> */}
                <h3 className="text-buttonBackground font-bold uppercase">
                  {singleOffer?.data?.name}
                </h3>
              </div>
              <div className="modal-body grid gap-5 grid-cols-1 md:grid-cols-2">
                <div>
                  <p className='text-buttonBackground'>
                    <span className='text-white'>Points:</span>  {singleOffer?.data?.points}
                  </p>
                  <p className='text-white'>
                    <span>Price:</span> <span className='text-buttonBackground font-semibold'>$ {singleOffer?.data?.price}</span>
                  </p>
                  <p className='text-buttonBackground'>
                    <span className="text-white text-sm">
                      Daily Limit:
                    </span>{" "}
                    <br />
                    <span>{singleOffer?.data?.dailyLimit}</span>
                  </p>
                  <p className='text-buttonBackground'>
                    <span className="text-white text-sm">
                      Total Limit:
                    </span>{" "}
                    <br />
                    <span>{singleOffer?.data?.totalLimit}</span>
                  </p>
                  <p className='text-buttonBackground'>
                    <span className="text-buttonBackground text-sm">Start Date:</span>{" "}
                    <br />
                    <span className="text-white">
                    {singleOffer?.data?.startDate}
                    
                    </span>
                  </p>
                  <p>
                    <span className="text-red-600 text-sm">End Date:</span>{" "}
                    <br />
                    <span className="text-white">
                    {singleOffer?.data?.endDate}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="text-white text-sm">Description:</span>{" "} <br />
                    <span
                      className="text-grayColor font-light text-xs text-justify"
                    //  dangerouslySetInnerHTML={singleOffer?.data?.description}
                     dangerouslySetInnerHTML={{ __html: singleOffer?.data?.description }}>
                    
                       
                    </span>
                  </p>
                  {/* <p>
                    <span className="text-white text-sm">Country:</span>{" "}
                    <br />
                   
                      <span className="bg-blue-500 text-white text-xs px-5 py-1 rounded-md">
                        USA
                      </span>
                   
                  </p>

                  <p>
                    <span className="text-white text-sm">Device:</span>{" "}
                    <br />
                    
                      <span className="bg-cyan-500 text-white text-xs px-5 py-1 rounded-md">
                        android
                      </span>
                   
                  </p> */}

                  <p>
                    <span className="text-white text-sm">Offer Status:</span>{" "}
                    <br />
                    <span
                      className={`text-xs px-4 py-1 text-white rounded ${singleOffer?.data.offerStatus === 'active' ? 'bg-green-600' : 'bg-red-600'  }`}>
                      {singleOffer?.data.offerStatus}
                    </span>{" "}
                    <br />
                  </p>
                </div>
                <div>
                  <div>
                    <span className="font-bold text-sm text-white">
                      Offer Link:
                    </span>{" "}
                    <br />
                    <a
                      href={''}
                      target="_blank"
                      className="underline text-buttonBackground"
                    >
                     {/* {singleOffer?.data?.offerLink} */}
                     offer link
                    </a>
                  </div>
                </div>
              </div>
            </div>
    );
};

export default DetailsPage;