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
    window.open("https://www.toluna.com/", "_blank");

    try {
      await createCompletedOffer({
        clickId: "clickIdValue",
        offerId: offer._id,
        userId: user?.objectId,
        points: offer.points,
        payout: offer.points,
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
          ''
        )}
      </div>
    </div>
  );
};

export default AllSurveyList;
