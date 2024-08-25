import React from "react";
import { FaArrowAltCircleDown, FaRegClock } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-cardBackground p-4 rounded-md my-4">
        <div className="py-4 flex flex-col md:flex-row gap-3 justify-between">
          <div>
            <h3 className="text-xl font-bold text-white border-l-4 border-buttonBackground pl-3 ">
              Details Information
            </h3>
          </div>
          <div className="flex flex-col lg:flex-row gap-3">
            <select
              name=""
              id=""
              className="w-[190px] cursor-pointer bg-transparent border py-2 px-4 rounded-md text-sm text-white text-center"
            >
              <option value="">this year</option>
            </select>
            <button className="w-[190px] bg-buttonBackground px-4 py-2 text-sm text-white rounded-md font-semibold flex items-center justify-center gap-2">
              {" "}
              <span>Download Info</span> <FaArrowAltCircleDown />
            </button>
          </div>
        </div>
        <div className="py-4 flex flex-col lg:flex-row gap-3">
          <div>
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-xl text-white font-bold">Nilufa Yesmean</h4>
            <div className="flex flex-col md:flex-row gap-10 my-5">
              <div>
                <h5 className="text-gray-300 text-sm font-medium">Role</h5>
                <h6 className="font-semibold text-white text-base capitalize">
                  Backend Dev
                </h6>
              </div>
              <div>
                <h5 className="text-gray-300 text-sm font-medium">
                  Phone Number
                </h5>
                <h6 className="font-semibold text-white text-base capitalize">
                  +880 174 093 454
                </h6>
              </div>
              <div>
                <h5 className="text-gray-300 text-sm font-medium">
                  Email Address
                </h5>
                <h6 className="font-semibold text-white text-base capitalize">
                  john.doe.2024@gmail.com
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-center justify-start">
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-cardBackground p-4 rounded-md my-4">
        <div className="py-4 flex flex-col md:flex-row gap-3 justify-between">
          <div>
            <h3 className="text-xl font-bold text-white border-l-4 border-buttonBackground pl-3 ">
              Information Overview
            </h3>
          </div>
        </div>
        <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 items-center justify-center">
          <div className="bg-primaryColor text-white  px-4 py-3 rounded-lg">
            <div className="flex w-full justify-between">
              <div className="flex gap-3 items-center">
                <FaRegClock />
                <h5 className="text-white font-semibold text-sm">
                  March 08 2024
                </h5>
              </div>
              <div className="rounded-full py-1 px-2 text-xs bg-red-400">
                Cancelled
              </div>
            </div>
            <div className="flex w-full justify-start my-4">
              <div className="w-1/2">
                <p className="text-gray-300 text-xs font-semibold">
                  Total Attendence
                </p>
                <h5 className="text-white font-bold text-base">309</h5>
              </div>
              <div>
                <p className="text-gray-300 text-xs font-semibold">
                  Total Attendence
                </p>
                <h5 className="text-white font-bold text-base">309</h5>
              </div>
            </div>
          </div>
          <div className="bg-primaryColor text-white  px-4 py-3 rounded-lg">
            <div className="flex w-full justify-between">
              <div className="flex gap-3 items-center">
                <FaRegClock />
                <h5 className="text-white font-semibold text-sm">
                  March 08 2024
                </h5>
              </div>
              <div className="rounded-full py-1 px-2 text-xs bg-yellow-400">
                Pending
              </div>
            </div>
            <div className="flex w-full justify-start my-4">
              <div className="w-1/2">
                <p className="text-gray-300 text-xs font-semibold">
                  Total Attendence
                </p>
                <h5 className="text-white font-bold text-base">309</h5>
              </div>
              <div>
                <p className="text-gray-300 text-xs font-semibold">
                  Total Attendence
                </p>
                <h5 className="text-white font-bold text-base">309</h5>
              </div>
            </div>
          </div>
          <div className="bg-primaryColor text-white  px-4 py-3 rounded-lg">
            <div className="flex w-full justify-between">
              <div className="flex gap-3 items-center">
                <FaRegClock />
                <h5 className="text-white font-semibold text-sm">
                  March 08 2024
                </h5>
              </div>
              <div className="rounded-full py-1 px-2 text-xs bg-buttonBackground">
                On time
              </div>
            </div>
            <div className="flex w-full justify-start my-4">
              <div className="w-1/2">
                <p className="text-gray-300 text-xs font-semibold">
                  Total Attendence
                </p>
                <h5 className="text-white font-bold text-base">309</h5>
              </div>
              <div>
                <p className="text-gray-300 text-xs font-semibold">
                  Total Attendence
                </p>
                <h5 className="text-white font-bold text-base">309</h5>
              </div>
            </div>
          </div>
          <div className="bg-primaryColor text-white  px-4 py-3 rounded-lg">
            <div className="flex w-full justify-between">
              <div className="flex gap-3 items-center">
                <FaRegClock />
                <h5 className="text-white font-semibold text-sm">
                  March 08 2024
                </h5>
              </div>
              <div className="rounded-full py-1 px-2 text-xs bg-buttonBackground">
                On time
              </div>
            </div>
            <div className="flex w-full justify-start my-4">
              <div className="w-1/2">
                <p className="text-gray-300 text-xs font-semibold">
                  Total Attendence
                </p>
                <h5 className="text-white font-bold text-base">309</h5>
              </div>
              <div>
                <p className="text-gray-300 text-xs font-semibold">
                  Total Attendence
                </p>
                <h5 className="text-white font-bold text-base">309</h5>
              </div>
            </div>
          </div>
          <div className="bg-primaryColor text-white  px-4 py-3 rounded-lg">
            <div className="flex w-full justify-between">
              <div className="flex gap-3 items-center">
                <FaRegClock />
                <h5 className="text-white font-semibold text-sm">
                  March 08 2024
                </h5>
              </div>
              <div className="rounded-full py-1 px-2 text-xs bg-buttonBackground">
                On time
              </div>
            </div>
            <div className="flex w-full justify-start my-4">
              <div className="w-1/2">
                <p className="text-gray-300 text-xs font-semibold">
                  Total Attendence
                </p>
                <h5 className="text-white font-bold text-base">309</h5>
              </div>
              <div>
                <p className="text-gray-300 text-xs font-semibold">
                  Total Attendence
                </p>
                <h5 className="text-white font-bold text-base">309</h5>
              </div>
            </div>
          </div>
          <div className="bg-primaryColor text-white  px-4 py-3 rounded-lg">
            <div className="flex w-full justify-between">
              <div className="flex gap-3 items-center">
                <FaRegClock />
                <h5 className="text-white font-semibold text-sm">
                  March 08 2024
                </h5>
              </div>
              <div className="rounded-full py-1 px-2 text-xs bg-buttonBackground">
                On time
              </div>
            </div>
            <div className="flex w-full justify-start my-4">
              <div className="w-1/2">
                <p className="text-gray-300 text-xs font-semibold">
                  Total Attendence
                </p>
                <h5 className="text-white font-bold text-base">309</h5>
              </div>
              <div>
                <p className="text-gray-300 text-xs font-semibold">
                  Total Attendence
                </p>
                <h5 className="text-white font-bold text-base">309</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
