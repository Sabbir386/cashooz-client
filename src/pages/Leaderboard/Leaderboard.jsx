import React from "react";
import { FaLink } from "react-icons/fa";
import LeaderboardRow from "./LeaderboardRow";

const Leaderboard = () => {
  const users = [
    {
      rank: 1,
      name: "junsanghel05",
      earnings: "$310.50",
      prize: "$50",
      avatar: null,
    },
    {
      rank: 2,
      name: "a.ellentrahan",
      earnings: "$300",
      prize: "$35",
      avatar: null,
    },
    {
      rank: 3,
      name: "jason",
      earnings: "$299.75",
      prize: "$17.50",
      avatar: "/path/to/jason-avatar.jpg",
    },
    {
      rank: 4,
      name: "haluakhalo",
      earnings: "$273.53",
      prize: "$12.50",
      avatar: null,
    },
    {
      rank: 5,
      name: "Savannah",
      earnings: "$260.60",
      prize: "$11.25",
      avatar: "/path/to/savannah-avatar.jpg",
    },
    {
      rank: 6,
      name: "dzaiquan",
      earnings: "$255.90",
      prize: "$10",
      avatar: null,
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="w-full md:w-1/2 mx-auto my-6 rounded-full py-4 bg-cardBackground text-center">
        <h3 className="text-buttonBackground text-xl">Leaderboard</h3>
      </div>

      <div className="bg-cardBackground rounded-md py-4 overflow-x-auto">
        {/* header  */}

        <div className="flex justify-center gap-0">
          {/* rank piller */}
          <div className="mt-5">
            <div className="w-full my-4 flex flex-col gap-1 justify-center items-center">
              <img
                className="w-20 h-20 border-4 border-white object-cover rounded-full mx-auto"
                src="https://images.unsplash.com/photo-1664575600850-c4b712e6e2bf?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <h5 className="text-white text-sm text-center">MElinah</h5>
              <h6 className="px-5 py-1 rounded-full bg-buttonBackground bg-opacity-30 text-white text-xs">
                $120
              </h6>
            </div>
            <div className="relative w-32 h-60 bg-gradient-to-b from-fuchsia-400 to-fuchsia-600 text-white rounded-lg shadow-2xl flex items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-2 bg-fuchsia-300 rounded-t-lg shadow-inner"></div>
              <div className="text-4xl font-bold z-10">{2}</div>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-fuchsia-700 rounded-b-lg shadow-inner"></div>
              <div className="absolute bottom-0 left-0 w-full h-full bg-slate-800 opacity-50 rounded-lg transform rotate-2"></div>
            </div>
          </div>
          {/* rank piller */}
          <div>
            <div className="w-full my-4 flex flex-col gap-1 justify-center items-center">
              <img
                className="w-20 h-20 border-4 border-white object-cover rounded-full mx-auto"
                src="https://images.unsplash.com/photo-1706885093487-7eda37b48a60?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <h5 className="text-white text-sm text-center">Lenda Smith</h5>
              <h6 className="px-5 py-1 rounded-full bg-buttonBackground bg-opacity-30 text-white text-xs">
                $150
              </h6>
            </div>
            <div className="relative w-32 h-60 bg-gradient-to-b from-red-400 to-red-600 text-white rounded-lg shadow-2xl flex items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-2 bg-red-300 rounded-t-lg shadow-inner"></div>
              <div className="text-4xl font-bold z-10">{1}</div>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-red-700 rounded-b-lg shadow-inner"></div>
              <div className="absolute bottom-0 left-0 w-full h-full bg-yellow-800 opacity-50 rounded-lg transform rotate-2"></div>
            </div>
          </div>
          {/* rank piller */}
          <div className="mt-12">
            <div className="w-full my-4 flex flex-col gap-1 justify-center items-center">
              <img
                className="w-20 h-20 border-4 border-white object-cover rounded-full mx-auto"
                src="https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <h5 className="text-white text-sm text-center">Johm Smith</h5>
              <h6 className="px-5 py-1 rounded-full bg-buttonBackground bg-opacity-30 text-white text-xs">
                $150
              </h6>
            </div>
            <div className="relative w-32 h-60 bg-gradient-to-b from-green-400 to-green-600 text-white rounded-lg shadow-2xl flex items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-2 bg-green-300 rounded-t-lg shadow-inner"></div>
              <div className="text-4xl font-bold z-10">{3}</div>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-700 rounded-b-lg shadow-inner"></div>
              <div className="absolute bottom-0 left-0 w-full h-full bg-black opacity-50 rounded-lg transform rotate-2"></div>
            </div>
          </div>
        </div>
        {/* header  */}

        {/* rows */}
        <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-2">
          <span className="w-2/6">Rank User</span>
          <span className="w-3/6">Earnings</span>
          <span className="w-1/6">Prize</span>
        </div>
        {users.map((user) => (
          <LeaderboardRow
            key={user.rank}
            rank={user.rank}
            name={user.name}
            earnings={user.earnings}
            prize={user.prize}
            avatar={user.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
