import { useState, useEffect } from "react";
import Product from "../assets/img/cashooz.png";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useViewOfferQuery } from "./offerApi";
import UAParser from "ua-parser-js";
import { detect } from "detect-browser";
const OfferList = () => {
  // Use the Redux query hook to fetch data

  const [data, setData] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDeviceInfo = async () => {
      // Use ua-parser-js to parse the user agent
      const parser = new UAParser();
      const result = parser.getResult();

      const os = result.os.name || "Unknown OS";
      let deviceType = result.device.type || "Desktop";
      const browser = result.browser.name || "Unknown Browser";

      // Custom function to detect device name
      const userAgent = navigator.userAgent.toLowerCase();
      let deviceName = "Unknown Device";

      if (userAgent.includes("iphone")) {
        deviceName = "iPhone";
      } else if (userAgent.includes("ipad")) {
        deviceName = "iPad";
      } else if (userAgent.includes("samsung")) {
        deviceName = "Samsung";
      } else if (
        userAgent.includes("xiaomi") ||
        userAgent.includes("redmi") ||
        userAgent.includes("mi")
      ) {
        deviceName = "Xiaomi";
      } else if (userAgent.includes("huawei")) {
        deviceName = "Huawei";
      } else if (userAgent.includes("pixel")) {
        deviceName = "Google Pixel";
      } else if (userAgent.includes("oneplus")) {
        deviceName = "OnePlus";
      } else if (userAgent.includes("nokia")) {
        deviceName = "Nokia";
      } else if (userAgent.includes("sony")) {
        deviceName = "Sony";
      } else if (userAgent.includes("lg")) {
        deviceName = "LG";
      } else if (userAgent.includes("htc")) {
        deviceName = "HTC";
      } else if (userAgent.includes("motorola")) {
        deviceName = "Motorola";
      }

      let deviceInfo = `OS: ${os}, Device Type: ${deviceType}, Device Name: ${deviceName}, Browser: ${browser}`;

      // Fetch IP address using ipify
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        if (!ipResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

        // Fetch location information using ipapi
        const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        if (!locationResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const locationData = await locationResponse.json();
        const country = locationData.country_name;

        deviceInfo += `, IP: ${ip}, Country: ${country}`;
      } catch (error) {
        console.error("Error fetching IP information:", error);
      }

      setDeviceInfo(deviceInfo);
      if (deviceInfo) {
        console.log("oKeu");

        setDeviceType(deviceType);
        setCountry(country);
      }
      // console.log("user track", deviceInfo);
    };
    console.log("user track", deviceInfo, deviceType);

    getDeviceInfo();
  }, [deviceInfo]);

  // Pagination

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5; // Number of items per page
  const offset = currentPage * pageSize;

  // Handle page click
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // If data is still loading

  const { data: offers } = useViewOfferQuery({ device: deviceType, country });
  useEffect(() => {
    if (offers) {
      setData(offers.data);
    }
  }, [offers]);

  console.log(deviceInfo, country, deviceType);
  // Paginated data
  const paginatedData = data.slice(offset, offset + pageSize);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching data
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }
  return (
    <div className="container mx-auto">
      <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-800">
          <tr className="text-left">
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              ID
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              Offer
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              Category
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              Network
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              Price
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              Publish Status
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {paginatedData.map((row) => (
            <tr key={row._id}>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                {row._id}
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-lg object-cover"
                      src={Product}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium whitespace-no-wrap">
                      {row.name}
                    </p>
                    <p className="text-gray-600 whitespace-no-wrap">
                      {row.date}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                {row.categoryInfo?.categoryName}
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                {row.networkInfo?.networkName}
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                {row.price}
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <span
                  className={`py-0.5 px-1.5 font-medium rounded text-white ${
                    row.offerStatus === "active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {row.offerStatus}
                </span>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <span
                  className={`py-0.5 px-1.5 font-medium rounded text-white ${
                    row.offerStatus === "active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {deviceInfo}
                </span>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <div>
                  <Link
                    to={`/dashboard/edit-offer/${row._id}`}
                    className="py-1 px-2 bg-blue-500 rounded text-white"
                  >
                    Edit
                  </Link>
                  <Link className="py-1 px-2 bg-red-500 rounded text-white ml-2">
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        className="flex mt-5 gap-3"
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(data.length / pageSize)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default OfferList;
