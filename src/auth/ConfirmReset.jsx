import React from "react";
import { useLocation } from "react-router-dom";


const ConfirmReset = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  
    // Retrieve specific query parameters
    const email = queryParams.get("email"); // replace "paramName" with the actual query key
    const token = queryParams.get("token"); // replace "paramName" with the actual query key
  
    console.log(email,token);
  return (
    <div className="w-full h-screen grid place-items-center justify-center">
      <div>
        <h3 className="text-base text-slate-400">Please confirm your email address to reset your password within 10 minutes</h3>
        <div className="mb-4">
          <label className="block text-buttonBackground text-sm font-medium mb-1">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="*********"
          />
         
        </div>
        <div className="mb-4">
          <label className="block text-buttonBackground text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="*********"
          />
         
        </div>
        <button className="inline-block bg-buttonBackground py-2 px-4 text-white rounded mt-2">
            Reset Password
        </button>
      </div>
    </div>
  );
};

export default ConfirmReset;
