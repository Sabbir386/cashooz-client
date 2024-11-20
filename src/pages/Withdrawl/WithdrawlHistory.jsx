import React, { useEffect, useState } from "react";
import { useViewWithdrawalsQuery } from "./withDrawalApi";

const WithdrawlHistory = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["all", "completed", "pending", "failed"];
  const [allWithdrawls, setAllWithdrawls] = useState([]);

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useViewWithdrawalsQuery();

  useEffect(() => {
    if (apiResponse?.data) {
      console.log(apiResponse?.data);
      setAllWithdrawls(apiResponse.data); // Ensure `data` is an array from API response
    }
  }, [apiResponse]);

  const handleTabClick = (tab, index) => {
    setActiveTab(index);
    if (tab === "all") {
      setAllWithdrawls(apiResponse?.data || []); // Reset to all data
    } else {
      setAllWithdrawls(
        (apiResponse?.data || []).filter((item) => tab === item.status)
      );
    }
  };

  if (isLoading) {
    return <p>Loading withdrawals...</p>;
  }

  if (isError) {
    return (
      <p>Error fetching withdrawals: {error?.data?.message || error.message}</p>
    );
  }

  return (
    <div className="p-4 min-h-screen">
      <div className="overflow-x-auto bg-secondaryColor shadow-md rounded-lg">
        <div className="flex flex-wrap gap-4 justify-between items-center p-4">
          <ul className="flex flex-wrap gap-4 text-sm font-medium">
            {tabs.map((tab, index) => (
              <li
                key={tab}
                className={`px-4 py-2 cursor-pointer rounded transition duration-200 ${
                  activeTab === index
                    ? "bg-buttonBackground text-white"
                    : "bg-primaryColor text-gray-200 hover:bg-buttonBackground"
                }`}
                onClick={() => handleTabClick(tab, index)}
              >
                {tab}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Past 90 Days</span>
            <span>17 Jun 2021</span>
            <span>15 Sep 2021</span>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          {/* {content[activeTab]} */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-sm font-medium text-gray-600">
                <th className="px-4 py-3">Name/Business</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Invoice ID</th>
                <th className="px-4 py-3">Paypal Email</th>
                <th className="px-4 py-3">Wallet Address</th>
                <th className="px-4 py-3">Network</th>
                <th className="px-4 py-3">description</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              $
              {allWithdrawls.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 group">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div>
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={row.image_url}
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-buttonBackground">
                          {/* {row.name} */}
                        </div>
                        <div className="text-gray-300 text-xs  group-hover:text-buttonBackground">
                          ID: {row.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-white group-hover:text-buttonBackground">
                      {/* Format the requestedAt date */}
                      {new Date(row.createdAt).toLocaleDateString() || "N/A"}
                    </div>
                    <div className="text-xs text-gray-300 group-hover:text-black">
                      {/* Format the requestedAt time */}
                      {new Date(row.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) || "N/A"}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white group-hover:text-buttonBackground">
                    {row.invoiceId}
                  </td>

                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-300 group-hover:text-black">
                      {row.paypalEmail ? row.paypalEmail : "N/A"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-300 group-hover:text-black">
                      {row.method !== "paypal" ? (
                        <div>{row.btcAddress || "N/A"}</div>
                      ) : (
                        <div>N/A</div>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-300 group-hover:text-black">
                      {row.networkType}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-300 group-hover:text-black">
                      {row.description}
                    </button>
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      row.status === "Completed"
                        ? "text-green-500"
                        : row.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {row.amount}
                  </td>

                  <td className="px-4 py-3">
                    <button className="text-blue-500 hover:underline">
                      {row.method}
                    </button>
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      row.status === "completed"
                        ? "text-green-500"
                        : row.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    <select
                      className="bg-transparent webkit-appearance-none"
                      defaultValue={row.status}
                    >
                      <option value="failed">Failed</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawlHistory;
