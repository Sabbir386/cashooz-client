import React from "react";
import { Link } from "react-router-dom";

const Earning = () => {
  const points = [
    { label: "10 POINTS = $0.1", bgColor: "bg-green-500" },
    { label: "100 POINTS = $1", bgColor: "bg-red-500" },
    { label: "1,000 POINTS = $10", bgColor: "bg-black" },
    { label: "10,000 POINTS = $100", bgColor: "bg-blue-500" },
  ];
  return (
    <div className="relative bg-secondaryColor py-28">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/18066330/pexels-photo-18066330/free-photo-of-us-dollar-banknotes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-75"></div>

      {/* Content Section */}
      <div className="relative text-center max-w-3xl mx-auto px-4">
        <h2 className="text-6xl font-bold text-white">Get an Instant Bonus</h2>
        <p className="text-buttonBackground mt-4 text-5xl font-bold">500 CZ</p>

        {/* Points Worth Section */}
        <div className="mt-12">
          <div className="flex flex-wrap justify-center gap-4 mt-6 px-4">
            <Link
              to={"/register"}
              className="inline-block px-5 py-2 rounded-md bg-buttonBackground text-white hover:bg-green-500 duration-75"
            >
              Sign Up
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earning;
