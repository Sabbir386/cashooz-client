import React from 'react';

const VerifyEmail = () => {
 
  const handleLoginRedirect = () => {
    // Redirect to login page after verification
    window.location.href = "https://cashooz.com/login";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10 max-w-md w-full">
        <div className="text-center">
          <img
            src="https://i.ibb.co.com/T03Qzcd/cashooz-logo.png" 
            alt="Email Verification"
            className="mx-auto w-20 md:w-28 mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Verification Successful
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-6">
            Your email has been successfully verified. You can now log in to your account.
          </p>
          <button
            onClick={handleLoginRedirect}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-300 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
