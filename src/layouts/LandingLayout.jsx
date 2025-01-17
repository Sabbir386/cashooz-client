import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaCheck, FaWindowClose } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import DashboardFooter from "./sidebar/DashboardFooter";
import ScrollToTop from "./ScrollToTop";

const LandingLayout = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Add class when scrolled
      } else {
        setIsScrolled(false); // Remove class when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="bg-gradient-radial  from-[#141523] via-[#212134] to-[#222339]">
      <ScrollToTop />
      {/* main container */}
      <div className="max-w-full mx-auto px-0">
        {/* banner section  */}
        <div className="">
          {/* naver section  */}
          <header
            className={`z-[999] ${
              isScrolled ? "bg-cardBackground" : ""
            } fixed w-full left-0 top-0`}
          >
            <nav className="md:w-[1440px] mx-auto  md:flex md:items-center md:justify-between md:place-items-center">
              <div className="flex justify-between place-items-center">
                <Link to={"/"} className="py-4">
                  <img
                    src="https://i.ibb.co.com/T03Qzcd/cashooz-logo.png"
                    alt=""
                    className="w-40"
                  />
                </Link>
                <span
                  onClick={() => setOpen(!open)}
                  className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer relative z-50"
                >
                  {/* Top Bar */}
                  <span
                    className={`w-6 h-0.5 transition-all duration-300 ${
                      open ? "rotate-45 translate-y-1 bg-red-500" : "bg-white"
                    }`}
                  ></span>

                  {/* Middle Bar (Hidden when open) */}
                  <span
                    className={`w-6 h-0.5 my-1 transition-all duration-300 ${
                      open ? "opacity-0" : "opacity-100 bg-white"
                    }`}
                  ></span>

                  {/* Bottom Bar */}
                  <span
                    className={`w-6 h-0.5 transition-all duration-300 ${
                      open ? "-rotate-45 -translate-y-2 bg-red-500" : "bg-white"
                    }`}
                  ></span>
                </span>
              </div>
              <ul
                className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:bg-transparent  left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
                  open
                    ? "top-20 bg-cardBackground z-[999] sm:drop-shadow-md sm:rounded-md md:drop-shadow-none"
                    : "top-[-490px]"
                }`}
              >
                <li className="mx-2 my-4 md:my-0 ">
                  <Link
                    onClick={() => setOpen(!open)}
                    to={"/login"}
                    className="text-base hover:text-buttonBackground text-white duration"
                  >
                    Login
                  </Link>
                </li>

                {/* <li className="mx-2 my-4 md:my-0">
                <Link
                  onClick={() => setOpen(!open)}
                  to={"/login"}
                  className="text-sm hover:text-white duration bg-buttonBackground text-white px-4 py-2 rounded-md hover:shadow-sm hover:shadow-buttonBackground"
                >
                  Login
                </Link>
              </li>*/}
                {/* <li className="mx-2 my-4 md:my-0">
                <Link
                  onClick={() => setOpen(!open)}
                  to={"/register"}
                  className="text-sm hover:text-white duration border border-buttonBackground text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg hover:bg-buttonBackground duration-700"
                >
                  Registration
                </Link>
              </li> */}

                {/* <li className="mx-2 my-4 md:my-0">
                  <Link
                    onClick={() => setOpen(!open)}
                    to={"/advertiser-register"}
                    className="text-base font-semibold text-red-400 px-4 py-2"
                  >
                    Become an Advertiser
                  </Link>
                </li> */}
                <li className="mx-2 my-4 md:my-0">
                  <Link
                    onClick={() => setOpen(!open)}
                    to={"/aboutus"}
                    className="text-base hover:text-buttonBackground text-white duration"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          {/* naver section  */}
        </div>
        {/* banner section  */}
        <Outlet></Outlet>
        {/* footer section  */}
        <DashboardFooter></DashboardFooter>
        {/* footer section  */}
      </div>
      {/* main container */}
    </div>
  );
};

export default LandingLayout;
