import React from "react";
import { useLocation } from "react-router-dom";

const PaypalBox = () => {
    const location = useLocation();
    const { selectedAmount,method } = location.state || {};
  return (
    <form className="w-full md:w-1/2 mb-4 bg-secondaryColor p-6 rounded-lg">
      <div className="mb-4">
        <label className="block text-buttonBackground text-sm font-medium mb-1">
          {method} Address for withdrawl of ${selectedAmount}
        </label>
        <input
          type="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500"
          placeholder="Enter your paypal account email"
        />
      </div>
      {/* <p className="text-buttonBackground text-sm">
        To complete your payment with Paypal, click "Save" below. You will be
        redirected to Google Pay to authorize the transaction.
      </p> */}
      <button className="bg-buttonBackground text-white border rounded-md mt-6 px-8 py-2">Withdraw</button>
    </form>
  );
};

export default PaypalBox;
