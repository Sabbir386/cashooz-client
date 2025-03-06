import React, { useEffect, useRef, useState } from "react";
import { HiOutlineStar } from "react-icons/hi";
import { FaArrowLeft, FaArrowRight, FaPlay, FaStar } from "react-icons/fa";
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
import { Link } from "react-router-dom";
import { UAParser } from "ua-parser-js";
const SurveyList = () => {
  const [createCompletedOffer] = useCreateCompletedOfferMutation();
  const [partnerOffers, setPartnerOffers] = useState([]);
  const [surveyPartnerOffers, setSurveyPartnerOffers] = useState([]);
  const [isNetworkPresent, setIsNetworkPresent] = useState(false);
  const [surveyCompleted] = useSurveyCompletedMutation();
  const [ip, setIP] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [country, setCountry] = useState("");
  const [OS, setOS] = useState("");
  const [surveyOffers, setSurveyOffers] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const token = useAppSelector(useCurrentToken);
  const user = token ? verifyToken(token) : null;
  const [createSurveyCompleted] = useCreateSurveyCompletedMutation();
  // //console.log(user);
  // country tracking ..
  useEffect(() => {
    const getDeviceInfo = async () => {
      const parser = new UAParser();
      const result = parser.getResult();

      const os = result.os.name || "Unknown OS";
      setOS(result.os.name || "Unknown OS");
      let deviceType = result.device.type || "desktop";
      const browser = result.browser.name || "Unknown Browser";

      const userAgent = navigator.userAgent.toLowerCase();
      let deviceName = "Unknown Device";

      if (userAgent.includes("iphone")) deviceName = "iPhone";
      else if (userAgent.includes("ipad")) deviceName = "iPad";
      else if (userAgent.includes("samsung")) deviceName = "Samsung";
      else if (userAgent.includes("xiaomi")) deviceName = "Xiaomi";
      else if (userAgent.includes("huawei")) deviceName = "Huawei";
      else if (userAgent.includes("pixel")) deviceName = "Google Pixel";
      else if (userAgent.includes("oneplus")) deviceName = "OnePlus";
      else if (userAgent.includes("nokia")) deviceName = "Nokia";
      else if (userAgent.includes("sony")) deviceName = "Sony";
      else if (userAgent.includes("lg")) deviceName = "LG";
      else if (userAgent.includes("htc")) deviceName = "HTC";
      else if (userAgent.includes("motorola")) deviceName = "Motorola";

      let deviceInfo = `OS: ${os}, Device Type: ${deviceType}, Device Name: ${deviceName}, Browser: ${browser}`;

      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        setIP(ip);

        const response = await fetch(`https://ipwhois.app/json/${ip}`);
        const locationData = await response.json();
        const country = locationData.country;
        const countryCode = locationData.country_code;

        deviceInfo += `, IP: ${ip}, Country: ${country}, CountryCode: ${countryCode}`;
        setCountry(country);
        setCountryCode(countryCode);
      } catch (error) {
        console.error("Error fetching IP information:", error);
      }

      setDeviceInfo(deviceInfo);
      setDeviceType(deviceType);
    };
    getDeviceInfo();
  }, [user?.objectId]);

  // const {
  //   data: surveys,
  //   error,
  //   isLoading,
  //   isError,
  // } = useGetFilteredSurveysQuery(
  //   {
  //     networkName: "Survey Wall",
  //     userId: user?.objectId,
  //     userOS: OS, // Assuming 'os' is part of user object
  //     userCountryCode: CountryCode, // Assuming 'countryCode' is part of user object
  //   },
  //   { skip: !user?.objectId || !OS || !CountryCode } // Skip the query if userId is missing
  // );

  const {
    data: surveys,
    error,
    isLoading,
    isError,
  } = useGetFilteredSurveysQuery(
    {
      userId: user?.objectId,
      userOS: OS,
      userCountryCode: CountryCode,
    },
    { skip: !user?.objectId || !OS || !CountryCode }
  );

  useEffect(() => {
    //console.log(surveys?.data)

    if (Array.isArray(surveys?.data) && surveys.data.length) {
      let surveyOffers = [];
      let surveyPartnerOffers = [];

      // Single loop for separte networkName offer
      surveys.data.forEach((item) => {
        if (item.networkName === "Survey Wall") {
          surveyOffers = [...surveyOffers, ...item.offers];
        } else if (item.networkName === "Survey Partners") {
          surveyPartnerOffers = [...surveyPartnerOffers, ...item.offers];
        }
      });

      // extracted offers
      setSurveyOffers(surveyOffers);
      setSurveyPartnerOffers(surveyPartnerOffers);
      setIsNetworkPresent(
        surveyOffers.length > 0 || surveyPartnerOffers.length > 0
      );

      // Debug logs
      //console.log("Survey Wall Offers:", surveyOffers);
      //console.log("Survey Partner Offers:", surveyPartnerOffers);
    } else {
      //console.log("No surveys available");
    }
  }, [surveys?.data]);

  // survey completeion
  const handleSurveyCompletion = async (offer) => {
    //console.log(offer);
    const linkParams = `&user_id=${user?.objectId}&s1=${offer._id}&s2=${user?.objectId}`;
    const finalURL = offer?.offerLink + linkParams;
    window.open(finalURL, "_blank");
    // try {
    // // Redirect to Toluna survey
    // const linkParams = `&user_id=${user?.objectId}&s1=${offer._id}&s2=${user?.objectId}`;
    // const finalURL = offer?.offerLink + linkParams;
    // window.open(finalURL, "_blank");
    // // API calls for completing the survey
    // await createCompletedOffer({
    //   clickId: "clickIdValue",
    //   offerId: offer?._id,
    //   userId: user?.objectId,
    //   points: offer?.points,
    //   payout: offer?.points,
    // }).unwrap();

    // await surveyCompleted({
    //   userId: user?.objectId,
    //   surveyReward: offer?.points,
    // }).unwrap();

    // await createSurveyCompleted({
    //   name: offer?.name,
    //   offerId: offer?._id,
    //   userId: user?.objectId,
    //   points: offer?.points,
    //   network: offer?.network,
    //   category: offer?.category,
    // }).unwrap();

    // // Remove the completed offer from the list
    // setSurveyOffers((prevOffers) =>
    //   prevOffers.filter((o) => o._id !== offer._id)
    // );

    // // Display success notification
    // CustomSwal.fire({
    //   icon: "success",
    //   title: `Survey Completed!`,
    //   html: `<strong>${offer.name}</strong><br>You earned <strong>${offer.points} CZ</strong> for completing this survey!`,
    //   confirmButtonText: "Claim",
    // });

    // } catch (err) {
    //   console.error("Error completing survey:", err);
    //   CustomSwal.fire({
    //     title: "Error!",
    //     text: "Failed to complete offer.",
    //     icon: "error",
    //     confirmButtonText: "Try Again",
    //   });
    // }
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load surveys</p>;
  }
  return (
    <div className="min-h-screen bg-[#212134] p-4 md:p-6 lg:p-10 text-center rounded mt-5">
      {surveyOffers?.length > 0 &&
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <FcSurvey className="w-6 h-6 md:w-8 md:h-8 mr-2" />
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Survey Wall
          </h1>
        </div>
      </div>}
      {surveyOffers?.length > 0 && (
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-3xl font-bold text-white border-b-[1px] border-b-secondaryColor pb-4"></h2>
          <Link
            to="/dashboard/survey-list/all"
            className="text-white flex justify-center items-center gap-3 hover:text-buttonBackground"
          >
            <span>View All</span>
            <FaArrowRight />
          </Link>
        </div>
      )}

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
          1368: { slidesPerView: 8, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 10 },
          610: { slidesPerView: 4, spaceBetween: 20 },
          492: { slidesPerView: 3, spaceBetween: 25 },
          0: { slidesPerView: 2, spaceBetween: 15 },
        }}
      >
        {isNetworkPresent ? (
          surveyOffers?.length > 0 ? (
            surveyOffers.map((offer) => (
              <SwiperSlide key={offer._id} className="text-white">
                {/* <div
                  className="rounded-lg shadow-md bg-gradient-to-b from-[#1f1f2e] to-[#0f0f1f] transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col items-center gap-3"
                  onClick={() => handleSurveyCompletion(offer)}
                >
                  {offer.image && (
                    <img
                      src={offer.image}
                      alt={offer.name}
                      className="w-full h-40 md:h-48 object-cover rounded-md border border-gray-700"
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
                </div> */}
                <div className="max-w-[200px] bg-white/20 shadow-sm shadow-white p-4 rounded-lg cursor-pointer" onClick={() => handleSurveyCompletion(offer)}>
                  {/* Product Image */}
                  <div className="w-full h-[180px] flex justify-center rounded-md">
                    <img
                        src={offer.image}
                        alt={offer.name} // Replace with actual image URL
                    
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="mt-3 rounded-b-md">
                    <h3 className="text-white font-medium text-sm">
                    {offer?.name ? offer.name.slice(0, 15) : "Offer Name"}
                    {offer.name?.length > 15 && "..."}
                    </h3>
                    <p className="text-buttonBackground font-bold text-sm"> CZ {offer?.points || "0"}</p>

                    {/* Star Ratings */}
                    <div className="flex justify-center mt-1 text-yellow-500">
                      {[...Array(5)].map((_, index) => (
                        <FaStar key={index} />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 mb-8">
              <FcSurvey className="w-10 h-10 md:w-12 md:h-12 mb-4" />
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                No Survey Available!
              </h2>
              <p className="text-sm md:text-lg text-gray-400 mt-2 text-center">
                Surveys might be Available soon.Come Back Tomorrow
              </p>
            </div>
          )
        ) : (
         <></>
        )}
      </Swiper>
      {/* Pagination Controls */}
      { surveyOffers?.length > 0 && (
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
      )}
     
      {/* Survey Partners Section */}
      {setPartnerOffers?.length > 0 && (
         <div className="mt-16">
         <OfferPartners
           title={"Survey Partners"}
           partnerOffers={surveyPartnerOffers}
           user={user}
         ></OfferPartners>
       </div>
      )}
     
    </div>
  );
};

export default SurveyList;
