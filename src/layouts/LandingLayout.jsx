import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import DashboardFooter from "./sidebar/DashboardFooter";
import ScrollToTop from "./ScrollToTop";

const LandingLayout = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-gradient-radial from-[#141523] via-[#212134] to-[#222339]">
      <ScrollToTop />
      <div className="max-w-full mx-auto px-0">
        <header
          className={`z-[999] ${isScrolled ? "bg-white" : "bg-white"} fixed w-full left-0 top-0`}
        >
          <nav className="max-w-7xl mx-auto px-2 md:px-4 md:flex md:items-center md:justify-between">
            <div className="flex justify-between items-center">
              <Link to="/" className="py-4">
                <img
                  src="https://i.ibb.co.com/T03Qzcd/cashooz-logo.png"
                  alt="logo"
                  className="w-40"
                />
              </Link>
              <span
                onClick={() => setOpen(!open)}
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer relative z-50"
              >
                <span
                  className={`w-6 h-0.5 transition-all duration-300 ${open ? "rotate-45 translate-y-1 bg-red-500" : "bg-green-500"}`}
                ></span>
                <span
                  className={`w-6 h-0.5 my-1 transition-all duration-300 ${open ? "opacity-0" : "opacity-100 bg-green-500"}`}
                ></span>
                <span
                  className={`w-6 h-0.5 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2 bg-red-500" : "bg-green-500"}`}
                ></span>
              </span>
            </div>
            <ul
              className={`md:flex md:items-center absolute md:static md:bg-transparent top-20 md:top-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-5/6 md:w-auto pb-4 md:h-auto transition-all duration-500 ease-in bg-white text-center opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto ${open ? "opacity-100 pointer-events-auto rounded-md " : "opacity-0 pointer-events-none"}`}
            >
              <li className="text-center md:text-left px-5 my-3 md:my-0">
                <Link
                  onClick={() => setOpen(false)}
                  to="/"
                  className="text-lg font-medium hover:text-buttonBackground text-cardBackground"
                >
                  Home
                </Link>
              </li>
              <li className="text-center md:text-left px-5 my-3 md:my-0">
                <Link
                  onClick={() => setOpen(false)}
                  to="/aboutus"
                  className="text-lg font-medium hover:text-buttonBackground text-cardBackground"
                >
                  About
                </Link>
              </li>
              <li className="text-center md:text-left px-5 my-3 md:my-0">
                <Link
                  onClick={() => setOpen(false)}
<<<<<<< HEAD
                  to="/blog"
                  className="text-lg font-medium hover:text-buttonBackground text-cardBackground"
                >
                  Blog
                </Link>
              </li>
              <li className="text-center md:text-left px-5 my-3 md:my-0">
                <Link
                  onClick={() => setOpen(false)}
=======
>>>>>>> e8e53f16d6ca357932f34c8f5015c5ac91e1b6a5
                  to="/faq"
                  className="text-lg font-medium hover:text-buttonBackground text-cardBackground"
                >
                  FAQ
                </Link>
              </li>
              <Link
              onClick={() => setOpen(false)}
                className="inline-block md:hidden px-8 py-2 rounded-md bg-green-500 text-white"
                to="/login"
              >
                Login
              </Link>
            </ul>
            <Link
              className="hidden md:block px-8 py-2 rounded-md bg-green-500 text-white"
              to="/login"
              onClick={() => setOpen(false)}
            >
            
              Login
            </Link>
          </nav>
        </header>
        <Outlet />
        <DashboardFooter />
      </div>
    </div>
  );
};

export default LandingLayout;
