import React, { useState } from "react";

const WithdrawlHistory = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["all", "completed", "pending", "failed"];
  const [activeStatus, setActiveStatus] = useState(null);
  const allWithdrawlsData = [
    {
      name: "William Murdoch",
      date: "21 March 2021",
      time: "At 8:45 PM",
      id: "OP01214784",
      amount: "$250 USD",
      status: "completed",
      method: "paypal",
      image_url:
        "https://images.unsplash.com/photo-1627554785796-f9646d15c2da?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      paypalEmail: "user.paypal.com",
      walletAddress: "0x0a0b0c0d0e0f0g0h0i0j0k0l0m0n0o0p0q0r0s0t0u0v0w0x0y0z0",
      network: "Ethereum",
      description: "Description goes here",
    },
    {
      name: "Jack Dawson",
      date: "20 March 2021",
      time: "At 9:28 AM",
      id: "OP01214784",
      amount: "$20 USD",
      status: "pending",
      method: "btc",
      image_url:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      paypalEmail: "donald.trump@gmail.com",
      walletAddress: "0x0a0b0c0d0e0f0g0h0i0j0k0l0m0n0o0p0q0r0s0t0u0v0w0x0y0z0",
      network: "BEP-20",
      description: "Description goes here",
    },
    {
      name: "Jack Dawson",
      date: "20 March 2021",
      time: "At 9:28 AM",
      id: "OP01214784",
      amount: "-$10 USD",
      status: "failed",
      method: "eth",
      image_url:
        "https://images.unsplash.com/photo-1731433452456-27b58e5a0023?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      paypalEmail: "jack.dawson.com",
      walletAddress: "0x0a0b0c0d0e0f0g0h0i0j0k0l0m0n0o0p0q0r0s0t0u0v0w0x0y0z0",
      network: "TRC-20",
      description: "Description goes here",
    },
    // Add more rows as needed
  ];
  const [allWithdrawls, setAllWithdrawls] = useState(allWithdrawlsData);
  const handleTabClick = (tab, index) => {
    console.log(tab);
    if (tab === "all") {
      setAllWithdrawls(allWithdrawlsData);
    } else {
      setAllWithdrawls(
        allWithdrawlsData.filter((item, i) => tab === item.status)
      );
    }
    // setActiveTab (index);
    console.log(allWithdrawls);
  };
  // const content = [
  //   <table className="w-full border-collapse">
  //     <thead>
  //       <tr className="bg-gray-50 text-left text-sm font-medium text-gray-600">
  //         <th className="px-4 py-3">Name/Business</th>
  //         <th className="px-4 py-3">Date</th>
  //         <th className="px-4 py-3">Invoice ID</th>
  //         <th className="px-4 py-3">Amount</th>
  //         <th className="px-4 py-3">Status</th>
  //         <th className="px-4 py-3">Method</th>
  //         <th className="px-4 py-3">Paypal Email</th>
  //         <th className="px-4 py-3">Wallet Address</th>
  //         <th className="px-4 py-3">Network</th>
  //         <th className="px-4 py-3">Description</th>
  //       </tr>
  //     </thead>
  //     <tbody className="divide-y divide-gray-100 text-sm">
  //       $
  //       {allWithdrawls.map((row, index) => (
  //         <tr key={index} className="hover:bg-gray-50 group">
  //           <td className="px-4 py-3">
  //             <div className="flex items-center space-x-3">
  //               <div>
  //                 <img
  //                   className="h-10 w-10 rounded-full object-cover"
  //                   src={row.image_url}
  //                   alt=""
  //                 />
  //               </div>
  //               <div>
  //                 <div className="font-semibold text-buttonBackground">
  //                   {row.name}
  //                 </div>
  //                 <div className="text-gray-300 text-xs  group-hover:text-buttonBackground">
  //                   ID: {row.id}
  //                 </div>
  //               </div>
  //             </div>
  //           </td>
  //           <td className="px-4 py-3">
  //             <div className="text-white group-hover:text-buttonBackground">
  //               {row.date}
  //             </div>
  //             <div className="text-xs text-gray-300 group-hover:text-black">
  //               {row.time}
  //             </div>
  //           </td>
  //           <td className="px-4 py-3 text-white group-hover:text-buttonBackground">
  //             {row.id}
  //           </td>
  //           <td
  //             className={`px-4 py-3 ${
  //               row.status === "Completed"
  //                 ? "text-green-500"
  //                 : row.status === "Pending"
  //                 ? "text-yellow-500"
  //                 : "text-red-500"
  //             }`}
  //           >
  //             {row.amount}
  //           </td>
  //           <td
  //             className={`px-4 py-3 ${
  //               row.status === "Completed"
  //                 ? "text-green-500"
  //                 : row.status === "Pending"
  //                 ? "text-yellow-500"
  //                 : "text-red-500"
  //             }`}
  //           >
  //             <select
  //               className="bg-transparent webkit-appearance-none"
  //               defaultValue={activeStatus || row.status}
  //             >
  //               <option value="failed">Failed</option>
  //               <option value="completed">Completed</option>
  //               <option value="pending">Pending</option>
  //             </select>
  //           </td>
  //           <td className="px-4 py-3">
  //             <button className="text-blue-500 hover:underline">
  //               {row.method}
  //             </button>
  //           </td>

  //           <td className="px-4 py-3">
  //             <button className="text-xs text-gray-300 group-hover:text-black">
  //               {row.paypalEmail}
  //             </button>
  //           </td>
  //           <td className="px-4 py-3">
  //             <button className="text-xs text-gray-300 group-hover:text-black">
  //               {row.walletAddress}
  //             </button>
  //           </td>
  //           <td className="px-4 py-3">
  //             <button className="text-xs text-gray-300 group-hover:text-black">
  //               {row.network}
  //             </button>
  //           </td>
  //           <td className="px-4 py-3">
  //             <button className="text-xs text-gray-300 group-hover:text-black">
  //               {row.description}
  //             </button>
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>,
  //   <h1 className="text-white text-sm px-5 py-3">All Received Transaction</h1>,
  //   <h1 className="text-white text-sm px-5 py-3">
  //     All Transfared Transaction
  //   </h1>,
  //   <h1 className="text-white text-sm px-5 py-3">All Paid Transaction</h1>,
  //   <h1 className="text-white text-sm px-5 py-3">All Withdrawl Transaction</h1>,
  // ];

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
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Paypal Email</th>
                <th className="px-4 py-3">Wallet Address</th>
                <th className="px-4 py-3">Network</th>
                <th className="px-4 py-3">Description</th>
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
                          {row.name}
                        </div>
                        <div className="text-gray-300 text-xs  group-hover:text-buttonBackground">
                          ID: {row.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-white group-hover:text-buttonBackground">
                      {row.date}
                    </div>
                    <div className="text-xs text-gray-300 group-hover:text-black">
                      {row.time}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white group-hover:text-buttonBackground">
                    {row.id}
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
                  <td className="px-4 py-3">
                    <button className="text-blue-500 hover:underline">
                      {row.method}
                    </button>
                  </td>

                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-300 group-hover:text-black">
                      {row.paypalEmail}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-300 group-hover:text-black">
                      {row.walletAddress}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-300 group-hover:text-black">
                      {row.network}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-300 group-hover:text-black">
                      {row.description}
                    </button>
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
