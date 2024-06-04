import { useState, useEffect } from "react";
import Product from "../assets/img/cashooz.png";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useViewOfferQuery } from "./offerApi";
import UAParser from "ua-parser-js";
import { detect } from "detect-browser";
import { useCreateCompletedOfferMutation } from "./completedOfferApi";
import { toast } from "sonner";

const OfferList = () => {
  const [data, setData] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [country, setCountry] = useState("");
  const [offerStatus, setOfferStatus] = useState('');
  // const [isLoading, setIsLoading] = useState(true);
  const [createCompletedOffer] = useCreateCompletedOfferMutation();

  const handleCompletedOffer = async (_id) => {
    const toastId = toast.loading("Completing....");
    try {
      const completedOfferInfo = { offerId: _id };
      await createCompletedOffer(completedOfferInfo);
      toast.success("Offer Successfully Completed", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.log("err-", error);
    }
  };

  useEffect(() => {
    const getDeviceInfo = async () => {
      const parser = new UAParser();
      const result = parser.getResult();

      const os = result.os.name || "Unknown OS";
      let deviceType = result.device.type || "desktop";
      const browser = result.browser.name || "Unknown Browser";

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

      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        if (!ipResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

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
      setDeviceType(deviceType);
      setCountry(country);
    };

    getDeviceInfo();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const offset = currentPage * pageSize;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleStatusChange = (event) => {
    setOfferStatus(event.target.value);
  };

  const {
    data: offers,
    isLoading,
    isFetching,
  } = useViewOfferQuery({ offerStatus, device: deviceType, country });

  useEffect(() => {
    if (offers) {
      setData(offers.data);
      // setIsLoading(false); // Set loading to false when data is fetched
    }
  }, [offers]);

  const paginatedData = data.slice(offset, offset + pageSize);

  if (isLoading || isFetching) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="my-4">
          <label htmlFor="publish-status">Select Publish Status: </label>
          <select
            id="publish-status"
            value={offerStatus}
            onChange={handleStatusChange}
          >
            <option value="active">active</option>
            <option value="draft">draft</option>
            <option value="deleted">deleted</option>
            <option value="completed">completed</option>
            <option value="non completed">non completed</option>
          </select>
        </div>
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
                Status
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
                      row.offerStatus === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {row.offerStatus}
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
                    <button
                      onClick={() => handleCompletedOffer(row._id)}
                      style={{
                        margin: "10px",
                        padding: "8px 20px",
                        border: "1px solid #000",
                        backgroundColor: "blue",
                        color: "white",
                      }}
                    >
                      Completed
                    </button>
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
    </>
  );
};

export default OfferList;
