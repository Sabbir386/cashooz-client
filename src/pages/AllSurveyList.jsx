import React, { useEffect, useState } from "react";
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
import { UAParser } from "ua-parser-js";
import Loader from "../components/Loader";
import { FaStar } from "react-icons/fa";

const AllSurveyList = () => {
  // Hooks must be called inside the component body
  const [ip, setIP] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [country, setCountry] = useState("");
  const [OS, setOS] = useState("");
  const token = useAppSelector(useCurrentToken);
  const user = token ? verifyToken(token) : null;
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
  const {
    data: surveyOffers,
    error,
    isLoading,
    isError,
  } = useGetFilteredSurveysQuery(
    {
      networkName: "Survey Wall",
      userId: user?.objectId,
      userOS: OS, // Assuming 'os' is part of user object
      userCountryCode: CountryCode,
    },
    { skip: !user?.objectId || !OS || !CountryCode }
  );

  const [createSurveyCompleted] = useCreateSurveyCompletedMutation();
  const [createCompletedOffer] = useCreateCompletedOfferMutation();
  const [surveyCompleted] = useSurveyCompletedMutation();

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
    return <Loader />;
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-2">
        {offers.length > 0
          ? offers.map((offer) => (
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
            ))
          : ""}
      </div>
    </div>
  );
};

export default AllSurveyList;
