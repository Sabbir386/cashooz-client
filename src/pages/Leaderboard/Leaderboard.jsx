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
