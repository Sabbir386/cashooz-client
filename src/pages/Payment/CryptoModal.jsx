import React, { useState } from "react";

const CryptoModal = ({ onClose, onSubmit }) => {
  const [bitcoinAddress, setBitcoinAddress] = useState("");
  const [amountUSD, setAmountUSD] = useState(0);
  const BTC_RATE = 90455.59; // Example BTC rate
  const MIN_WITHDRAWAL = 5;
  const FEE = 1.56; // Example fee
  const BONUS = 0;

  const calculateBTC = () => {
    if (amountUSD < MIN_WITHDRAWAL) return 0;
    return (amountUSD - FEE) / BTC_RATE;
  };

  const handleWithdraw = () => {
    const data = {
      bitcoinAddress,
      amountUSD,
      btcAmount: calculateBTC(),
    };

    onSubmit(data); // Pass the data to the parent
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bitcoin</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <p className="bg-blue-600 text-sm rounded-md p-3 mb-4">
          Crypto withdrawals take a few minutes to be sent. New users have to
          earn $2.00 to make their first withdrawal.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Bitcoin Address
          </label>
          <input
            type="text"
            value={bitcoinAddress}
            onChange={(e) => setBitcoinAddress(e.target.value)}
            placeholder="Enter Bitcoin Address..."
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <small className="text-gray-400">
            The Bitcoin Address for your Bitcoin Wallet.
          </small>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Amount in USD
          </label>
          <input
            type="number"
            value={amountUSD}
            onChange={(e) => setAmountUSD(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <small className="text-gray-400">Minimum $5.00</small>
        </div>

        <div className="mb-6">
          <p>
            <strong>You’ll receive (BTC):</strong> {calculateBTC() || "0"}
          </p>
        </div>

        <button
          onClick={handleWithdraw}
          disabled={!bitcoinAddress || amountUSD < MIN_WITHDRAWAL}
          className={`w-full py-2 rounded-md ${
            bitcoinAddress && amountUSD >= MIN_WITHDRAWAL
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-700 cursor-not-allowed"
          }`}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default CryptoModal;
