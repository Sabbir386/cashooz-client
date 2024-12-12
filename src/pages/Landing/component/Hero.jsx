import React from "react";

const Hero = () => {
  return (
    <div className="bg-white font-sans">
      {/* Header Section */}
      <div className="text-center py-12 px-6 bg-gray-50">
        <h1 className="text-4xl font-bold mb-4">
          Swift <span className="text-blue-600">recruitment</span> for current
          pace of work
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          An all-encompassing remote hiring solution to help modern businesses
          grow with Virtual Assistants.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20 py-12">
        {/* Profile Cards */}
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="font-semibold">Olivia Wouters</p>
              <p className="text-gray-500 text-sm">Product Designer</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mb-4">
            As you are reviewing candidates for the open customer service
            position, we...
          </p>
          <p className="text-gray-600 text-xs">
            Full Time | Senior Level | Montreal
          </p>
        </div>

        <div className="bg-white shadow-lg p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="font-semibold">Natalie Monet</p>
              <p className="text-gray-500 text-sm">Recruiter</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mb-4">
            Hey, we've got a hot referral for your sales team!
          </p>
        </div>

        <div className="bg-white shadow-lg p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="font-semibold">Alex Jordan</p>
              <p className="text-gray-500 text-sm">Contractor</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mb-4">
            Task progress - 70% completed.
          </p>
        </div>
      </div>

      {/* Trusted Section */}
      <div className="text-center py-12 bg-gray-50">
        <p className="text-gray-600">Trusted by the best</p>
        <div className="flex justify-center space-x-6 mt-4">
          <img src="/loom.png" alt="Loom" className="h-6" />
          <img src="/hubspot.png" alt="Hubspot" className="h-6" />
          <img src="/ramp.png" alt="Ramp" className="h-6" />
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center py-6 bg-gray-800 text-white">
        <p>&copy; 2024 Recruitment Platform. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Hero;
