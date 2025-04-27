import { useState, useEffect } from "react";
import Product from "../assets/img/cashooz.png";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { FaEdit, FaRegTrashAlt, FaEye } from "react-icons/fa";
import {
  useDeleteOfferMutation,
  useSingleOfferQuery,
  useToggleOfferStatusMutation,
  useViewOfferQuery,
} from "./offerApi";
import UAParser from "ua-parser-js";
import { detect } from "detect-browser";
import { useCreateCompletedOfferMutation } from "./completedOfferApi";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { useAppSelector } from "../redux/features/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import ReactModal from "react-modal";

import OfferView from "./OfferView/OfferView";
import Loader from "../components/Loader";
import CustomSwal from "../customSwal/customSwal";
import Blog from "./Blog/Blog";

const BlogList = () => {
  const [data, setData] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [OSdeviceType, setOSdeviceType] = useState("");
  const [country, setCountry] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [offerStatus, setOfferStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const token = useAppSelector(useCurrentToken);
  const pageSize = 5;
  const [deleteOffer] = useDeleteOfferMutation();
  const [toggleOfferStatus] = useToggleOfferStatusMutation();
  const offset = currentPage * pageSize;

  const handleToggle = async (id) => {
    //console.log(id, "id");
    //console.log(offerStatus, "offerStatus");

    try {
      await toggleOfferStatus({ id });
      // Optionally, handle additional logic after successful mutation
    } catch (error) {
      console.error("Failed to toggle offer status:", error);
    }
  };
  const {
    data: offersForAdmin,
    isLoadingOffersForAdmin,
    isFetchingOffersForAdmin,
  } = useViewOfferQuery(
    {
      offerStatus,
    },
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );
  // // //console.log(data);
  const {
    data: offers,
    isLoading,
    isFetching,
    refetch,
  } = useViewOfferQuery(
    {
      offerStatus,
      device: OSdeviceType,
      CountryCode,
      role: userRole,
    },
    { skip: !(userRole === "user" || userRole === "advertiser") }
  );
  if (offersForAdmin) {
    //console.log(offersForAdmin);
  }
  useEffect(() => {
    if (token) {
      const user = verifyToken(token);
      // //console.log(user);
      setUserRole(user?.role);
      // //console.log("FaqList", user?.role);
    }

    const getDeviceInfo = async () => {
      const parser = new UAParser();
      const result = parser.getResult();
      const os = result.os.name || "Unknown OS";
      let deviceType = result.device.type || "desktop";
      const browser = result.browser.name || "Unknown Browser";

      const userAgent = navigator.userAgent.toLowerCase();
      let deviceName = "Unknown Device";

      if (userAgent.includes("iphone")) deviceName = "iPhone";
      else if (userAgent.includes("ipad")) deviceName = "iPad";
      else if (userAgent.includes("samsung")) deviceName = "Samsung";
      // Add other device checks...

      let deviceInfo = `OS: ${os}, Device Type: ${deviceType}, Device Name: ${deviceName}, Browser: ${browser}`;

      try {
        // Use an alternative API or your proxy
        const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
        if (!response.ok) throw new Error("Failed to fetch geolocation data");

        const data = await response.json();
        const ip = data.ip;
        const country = data.country || "Unknown Country";
        const countryCode = data.country_code || "XX";

        deviceInfo += `, IP: ${ip}, Country: ${country}, CountryCode: ${countryCode}`;
        setCountry(country);
        setCountryCode(countryCode);
      } catch (error) {
        console.error("Error fetching IP information:", error);
      }

      setDeviceInfo(deviceInfo);
      setDeviceType(deviceType);
      setOSdeviceType(os);
    };

    if (offersForAdmin) {
      setData(offersForAdmin.data);
    }
    if (offers) {
      setData(offers.data);
    }

    getDeviceInfo();
  }, [token, offersForAdmin, offers]);

  // const [createCompletedOffer] = useCreateCompletedOfferMutation();
  const handleDeleteOffer = async (_id) => {
    // //console.log(_id);
    CustomSwal.fire({
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
          // //console.log("Error:", error);
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
      // //console.log("Single Offer Data:", singleOffer);
    }
  }, [singleOffer]);
  // //console.log(deviceInfo);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleStatusChange = (event) => {
    setOfferStatus(event.target.value);
    //console.log(event.target.value)
    // refetch(); // Manually refetch data when status changes
  };

  const paginatedData = data.slice(offset, offset + pageSize);

  // if (isLoading || isFetching) {
  //   return <Loader></Loader>; // Show loading state
  // }
  if (isLoadingOffersForAdmin || isFetchingOffersForAdmin) {
    return <Loader></Loader>; // Show loading state
  }

  return userRole === "superAdmin" || userRole === "admin" ? (
    <div className="min-h-screen">
      <div className="container mx-auto overflow-auto relative">
        <div className="flex justify-between items-center my-4">
          <h3 className="font-bold text-base text-white">All BLOG List</h3>
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-secondaryColor border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-secondaryColor text-buttonBackground">
              <tr className="text-left">
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                  SL.
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                  Offer
                </th>
              
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedData.map((row, i) => (
                <tr key={row._id} className="bg-secondaryColor">
                  <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                    {currentPage * pageSize + i + 1}
                  </td>
                 
                  <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                    {row.categoryInfo?.categoryName}
                  </td>
               
                
                  <td className="px-1 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                    <div className="flex flex-col justify-center items-center md:flex-row gap-1">
                      {/* <button
                        onClick={() => handleViewOffer(row._id)}
                        className="w-7 h-7 grid justify-center items-center bg-purple-500 rounded text-white"
                      >
                        <FaEye />
                      </button> */}
                      {(userRole === "superAdmin" || userRole === "admin") && (
                        <div className="flex flex-col md:flex-row gap-1 justify-center items-center">
                          <Link
                            to={`/dashboard/edit-offer/${row._id}`}
                            className="w-7 h-7 grid justify-center items-center bg-blue-500 rounded text-white"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDeleteOffer(row._id)}
                            className="w-7 h-7 grid justify-center items-center bg-red-500 rounded text-white "
                          >
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          className="flex mt-5 gap-3 text-buttonBackground"
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
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="modal"
          contentLabel="Offer Details Modal"
        >
          <button className="button-close" onClick={closeModal}>
            &times;
          </button>
          {isLoading ? (
            <div>Loading...</div>
          ) : singleOffer?.data ? (
            <div className="modal-content">
              <div className="modal-header">
                {singleOffer.data.image && (
                  <img
                    src={"https://i.ibb.co/JjrS14H/cashooz.png"}
                    alt={singleOffer.data.name}
                  />
                )}
                <h6 className="text-lg text-blue-600 font-bold uppercase">
                  {singleOffer.data.name}
                </h6>
              </div>
              <div className="modal-body grid grid-cols-1 md:grid-cols-2">
                <div>
                  <p>
                    <span>Points:</span> {singleOffer.data.points}
                  </p>
                  <p>
                    <span>Points:</span> {singleOffer.data.points}
                  </p>
                  <p>
                    <span className="text-blue-600 text-sm">
                      Completion Limit:
                    </span>{" "}
                    <br />
                    <span>{singleOffer.data.completionLimit}</span>
                  </p>
                  <p>
                    <span className="text-blue-600 text-sm">
                      Completion Count:
                    </span>{" "}
                    <br />
                    <span>{singleOffer.data.completedCount}</span>
                  </p>
                  <p>
                    <span className="text-blue-600 text-sm">Start Date:</span>{" "}
                    <br />
                    <span className="text-green-600">
                      {new Date(
                        singleOffer.data.startDate
                      ).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    <span className="text-blue-600 text-sm">End Date:</span>{" "}
                    <br />
                    <span className="text-red-600">
                      {new Date(singleOffer.data.endDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="text-blue-600 text-sm">Description:</span>{" "}
                    <span
                      className="text-gray-600 font-light text-xs text-justify"
                      dangerouslySetInnerHTML={{
                        __html: singleOffer.data.description,
                      }}
                    ></span>
                  </p>
                  <p>
                    <span className="text-blue-600 text-sm">Country:</span>{" "}
                    <br />
                    {singleOffer.data.country?.map((c) => (
                      <span className="bg-blue-500 text-white text-xs px-5 py-1 rounded-md">
                        {c.label}
                      </span>
                    ))}
                  </p>

                  <p>
                    <span className="text-blue-600 text-sm">Device:</span>{" "}
                    <br />
                    {singleOffer.data.device?.map((d) => (
                      <span className="bg-cyan-500 text-white text-xs px-5 py-1 rounded-md">
                        {d.label}
                      </span>
                    ))}
                  </p>

                  <p>
                    <span className="text-blue-600 text-sm">Offer Status:</span>{" "}
                    <br />
                    <span
                      className={`text-xs px-4 py-1 text-white rounded ${
                        singleOffer.data.offerStatus === "active"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {singleOffer.data.offerStatus}
                    </span>{" "}
                    <br />
                  </p>
                </div>
                <div>
                  <div>
                    <span className="font-bold text-sm text-blue-600">
                      Offer Link:
                    </span>{" "}
                    <br />
                    <a
                      href={singleOffer.data.offerLink}
                      target="_blank"
                      className="underline"
                    >
                      offer link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </ReactModal>
      </div>
    </div>
  ) : userRole === "user" ? (
    <OfferView />
  ) : (
    ""
  );
};

export default BlogList;
