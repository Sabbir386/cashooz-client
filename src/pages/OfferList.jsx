import { useState, useEffect } from "react";
import Product from "../assets/img/cashooz.png";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { FaEdit, FaRegTrashAlt, FaEye } from "react-icons/fa";
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
import ReactModal from "react-modal";
import "./modal/ModalStyles.css";

const OfferList = () => {
  const [data, setData] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState("");
  const [deviceType, setDeviceType] = useState("");
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
  const offset = currentPage * pageSize;

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
      CountryCode,
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
        const countryCode = locationData.country_code;

        deviceInfo += `, IP: ${ip}, Country: ${country}, CountryCode: ${countryCode}`;
        setCountry(country);
        setCountryCode(CountryCode);
      } catch (error) {
        console.error("Error fetching IP information:", error);
      }

      setDeviceInfo(deviceInfo);
      setDeviceType(deviceType);
    };

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
      <div className="container mx-auto overflow-auto relative">
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-800">
              <tr className="text-left">
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                  SL.
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
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedData.map((row, i) => (
                <tr key={row._id}>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {i + 1}
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
                  <td className="w-4 border-b border-gray-200 bg-white text-sm">
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
                    <div className="flex flex-col justify-center items-center md:flex-row gap-1">
                      <button
                        onClick={() => handleViewOffer(row._id)}
                        className="w-7 h-7 grid justify-center items-center bg-purple-500 rounded text-white"
                      >
                        <FaEye />
                      </button>
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
      
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="absolute w-[70%] h-[80%] md:h-[50%] top-[50%] left-[50%] right-auto bottom-auto translate-x-[-50%] translate-y-[-50%] bg-white px-4"
          contentLabel="Offer Details Modal"
        >
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
                    <span>Price:</span> {singleOffer.data.price}
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
                      {" "}
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
              <div className="modal-footer">
                <button className="button-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </ReactModal>
      </div>
    </>
  );
};

export default OfferList;
