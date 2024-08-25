import React from 'react';
import { FaLink } from 'react-icons/fa';

const LeaderboardRow = ({ rank, name, earnings, prize, avatar }) => {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-2">
      {/* Rank and User Info */}
      <div className="w-2/6 flex items-center gap-4">
        {/* Rank Badge */}
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${rank === 1 ? 'bg-yellow-600' : rank === 2 ? 'bg-gray-500' : rank === 3 ? 'bg-orange-500' : 'bg-green-600'}`}>
          <span className="text-white font-bold">{rank}</span>
        </div>
        {/* User Icon and Name */}
        <div className="flex items-center gap-2">
          {avatar ? (
            <img src={avatar} alt={`${name}'s avatar`} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold text-white">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="text-lg font-semibold">{name}</span>
            <FaLink className="text-green-400" />
          </div>
        </div>
      </div>

      {/* Earnings */}
      <div className="w-3/6 text-lg font-semibold">{earnings}</div>

      {/* Prize */}
      <div className="w-1/6 text-lg font-semibold">{prize}</div>
    </div>
  );
};

export default LeaderboardRow;
