import { useState, useEffect } from "react";
import Product from "../assets/img/cashooz.png";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import {
  useDeleteOfferMutation,
  useSingleOfferQuery,
  useViewOfferQuery,
} from "./offerApi";
import UAParser from "ua-parser-js";
import { detect } from "detect-browser";
import { useCreateCompletedOfferMutation } from "./completedOfferApi";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { useAppSelector } from "../redux/features/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import Swal from "sweetalert2";

const OfferList = () => {
  const [data, setData] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [country, setCountry] = useState("");
  const [offerStatus, setOfferStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const token = useAppSelector(useCurrentToken);
  const pageSize = 5;
  const [deleteOffer] = useDeleteOfferMutation();
  const offset = currentPage * pageSize;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const {
    data: offersForAdmin,
    isLoadingOffersForAdmin,
    isFetchingOffersForAdmin,
  } = useViewOfferQuery(
    {
      offerStatus,
      country,
    },
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );
  console.log(data);
  const {
    data: offers,
    isLoading,
    isFetching,
    refetch,
  } = useViewOfferQuery(
    {
      offerStatus,
      device: deviceType,
      country,
      role: userRole,
    },
    { skip: !(userRole === "user" || userRole === "advertiser") }
  );
  useEffect(() => {
    if (token) {
      const user = verifyToken(token);
      console.log(user);
      setUserRole(user?.role);
      console.log("offerlist", user?.role);
    }
    // user Agent
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
        setCountry(country); // Set the country here
      } catch (error) {
        console.error("Error fetching IP information:", error);
      }

      setDeviceInfo(deviceInfo);
      setDeviceType(deviceType);
    };

    // data
    if (offersForAdmin) {
      setData(offersForAdmin.data);
    }
    if (offers) {
      setData(offers.data);
    }

    getDeviceInfo();
  }, [token, offersForAdmin, offers]);

  // console.log(offers);
  // const [createCompletedOffer] = useCreateCompletedOfferMutation();
  const handleDeleteOffer = async (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure you want to delete this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        try {
          await deleteOffer(_id).unwrap();
          toast.success("Offer successfully deleted", {
            id: toastId,
            duration: 2000,
          });
        } catch (error) {
          toast.error("Something went wrong", {
            id: toastId,
            duration: 2000,
          });
          console.log("Error:", error);
        }
      }
    });
  };
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  // Call the hook only if selectedOfferId is set
  const { data: singleOffer, error } = useSingleOfferQuery(selectedOfferId, {
    skip: !selectedOfferId,
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch the offer");
    }
  }, [error]);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOfferId(null);
  };
  const handleViewOffer = (_id) => {
    setSelectedOfferId(_id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (singleOffer) {
      console.log("Single Offer Data:", singleOffer);
    }
  }, [singleOffer]);
  console.log(deviceInfo);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleStatusChange = (event) => {
    setOfferStatus(event.target.value);
    // refetch(); // Manually refetch data when status changes
  };

  const paginatedData = data.slice(offset, offset + pageSize);

  if (isLoading || isFetching) {
    return <div>Loading...</div>; // Show loading state
  }
  if (isLoadingOffersForAdmin || isFetchingOffersForAdmin) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between items-center my-4">
          <h3 className="font-bold text-base">All Offer List</h3>
          <select
            className="px-2 py-3 border-none rounded text-xs"
            id="publish-status"
            value={offerStatus}
            onChange={handleStatusChange}
          >
            <option value="All">All</option>
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
                  {/* {row._id} */}
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
                    className={`py-1 px-2 block w-full text-center rounded text-white ${
                      row.offerStatus === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {row.offerStatus}
                  </span>
                </td>
                <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm">
                  <div>
                    {(userRole === "superAdmin" || userRole === "admin") && (
                      <>
                        <Link
                          to={`/dashboard/edit-offer/${row._id}`}
                          className="py-1 px-2 bg-blue-500 rounded text-white"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteOffer(row._id)}
                          className="py-1 px-2 bg-red-500 rounded text-white ml-2"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleViewOffer(row._id)}
                      className="py-0 px-2 h-7 bg-blue-500 rounded text-white ml-2"
                    >
                      View
                      <ReactModal
                      isOpen={isModalOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Offer Details Modal"
                    >
                      {singleOffer ? (
                        <div>
                          <h2>{singleOffer?.title}</h2>
                          <p>{singleOffer?.description}</p>
                          {/* Display other offer details */}
                          <button onClick={closeModal}>Close</button>
                        </div>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </ReactModal>

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
