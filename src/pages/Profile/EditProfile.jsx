import React, { useState } from "react";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ); // Replace with actual image URL

  const handleChangePhoto = () => {
    // Handle changing the photo
    console.log("Change Photo clicked");
  };

  const handleDeletePhoto = () => {
    // Handle deleting the photo
    setProfileImage("https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  };
  return (
    <div className="w-full flex flex-col items-start  min-h-screen p-6">
      <div className="w-full  bg-secondaryColor rounded-lg shadow-md p-6 space-y-6">
        <div className="bg-primaryColor p-6 rounded-lg shadow-sm">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleChangePhoto}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition"
              >
                Change photo
              </button>
              <button
                onClick={handleDeletePhoto}
                className="bg-white text-red-500 px-4 py-2 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition"
              >
                <span className="flex items-center space-x-1">
                  <span>🗑️</span> <span>Delete</span>
                </span>
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              Cashooz keeps your profile private
            </p>
          </div>
        </div>
        {/* Edit Profile and Change Password Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Edit Profile */}
          <div className="bg-primaryColor p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Edit Profile
            </h2>
            <div className="space-y-4">
              <InputField label="Your Name" placeholder="Ismail Hossain" />
              <InputField label="Store Name" placeholder="Maxima Studio" />
              <SelectField label="Location" options={["United States"]} />
              <SelectField label="Currency" options={["US Dollar ($)"]} />
              <InputField
                label="Email"
                placeholder="Amjinaina@gmail.com"
                type="email"
              />
              <InputField label="Phone" placeholder="0197836547" />
              <InputField
                label="Address"
                placeholder="813 Howard Street, Oswego NY, 13126, USA"
              />
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-primaryColor p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <div className="space-y-4">
              <InputField label="Current Password" type="password" />
              <InputField label="New Password" type="password" />
              <InputField label="Confirm Password" type="password" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-buttonBackground text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Input field component
const InputField = ({ label, placeholder, type = "text" }) => (
  <div>
    <label className="block text-buttonBackground mb-1 text-sm">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full text-primaryColor border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-buttonBackground"
    />
  </div>
);

// Select field component
const SelectField = ({ label, options }) => (
  <div>
    <label className="block text-buttonBackground mb-1">{label}</label>
    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
      {options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default EditProfile;
