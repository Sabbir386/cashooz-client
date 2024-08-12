import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaWindowClose } from "react-icons/fa";

const Landing = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-[1440px] mx-auto px-2 md:px-0  ">
      <header className="z-[999]">
        <nav className="py-5 md:flex md:items-center md:justify-between md:place-items-center">
          <div className="flex justify-between place-items-center">
            <Link to={"/"} className="text-3xl font-semibold">
              <img src="https://i.ibb.co/JjrS14H/cashooz.png" alt="" className="w-24"/>
            </Link>
            <span
              onClick={() => setOpen(!open)}
              className="md:hidden block text-gray-800"
            >
              {open ? <FaWindowClose></FaWindowClose> : <FaBars></FaBars>}
            </span>
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:bg-transparent  left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open
                ? "top-20 bg-[#ffffff] z-[999] sm:drop-shadow-md sm:rounded-md md:drop-shadow-none"
                : "top-[-490px]"
            }`}
          >
            <li className="mx-2 my-4 md:my-0 ">
              <Link
                onClick={() => setOpen(!open)}
                to={"/"}
                className="text-base hover:text-buttonBackground text-white duration"
              >
                Home
              </Link>
            </li>

            <li className="mx-2 my-4 md:my-0">
              <Link
                onClick={() => setOpen(!open)}
                to={"/login"}
                className="text-sm hover:text-white duration bg-buttonBackground text-white px-4 py-2 rounded-md hover:shadow-sm hover:shadow-buttonBackground"
              >
                Login
              </Link>
            </li>
            <li className="mx-2 my-4 md:my-0">
              <Link
                onClick={() => setOpen(!open)}
                to={"/advertiser-register"}
                className="text-sm hover:text-white duration bg-red-400 text-white px-4 py-2 rounded-md hover:shadow-sm hover:shadow-red-400"
              >
                Adv Registration
              </Link>
            </li>
            <li className="mx-2 my-4 md:my-0">
              <Link
                onClick={() => setOpen(!open)}
                to={"/register"}
                className="text-sm hover:text-white duration border border-buttonBackground text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg hover:bg-buttonBackground duration-700"
              >
                Registration
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 py-16 items-center">
        <div className="py-8">
          <small className="bg-buttonBackground px-2 py-1 rounded-full text-white font-semibold text-xs">
            best leading network in the world
          </small>
          <h1 className="text-7xl font-bold my-4 text-white">
            Welcome to <span className="text-buttonBackground">Cashooz</span>
          </h1>
          <p className="text-xs font-medium text-justify text-white">
            An affiliate network company acts as an intermediary between
            advertisers and publishers, facilitating partnerships to promote
            products or services. They provide a platform where advertisers can
            list their offers, and publishers (affiliates) can find and join
            programs that suit their audience. The network handles tracking,
            reporting, and payments, ensuring affiliates earn commissions for
            driving traffic and sales. By leveraging a vast network of
            affiliates, advertisers can increase their reach and sales, while
            affiliates gain access to lucrative offers to monetize their
            content.
          </p>
          <div className="flex gap-5 items-center">
            <Link
              to={"/login"}
              className="px-10 py-2 rounded-md border text-white border-buttonBackground inline-block mt-4 hover:bg-buttonBackground hover:text-white duration-75 hover:shadow-md"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="px-10 py-2 rounded-md border border-buttonBackground inline-block mt-4 bg-buttonBackground text-white duration-75 hover:shadow-md"
            >
              Registration
            </Link>
          </div>
        </div>
        <div className="p-8 text-center">
          <img
            className="inline-block w-48"
            src="https://i.ibb.co/2NKK4vx/Animation-1719745288531.gif"
            alt=""
          />
        </div>
      </section>
     
    </div>
  );
};

export default Landing;
