import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaWindowClose } from "react-icons/fa";

const Landing = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-[1440px] mx-auto px-2 md:px-0">
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
            <li className="mx-4 my-6 md:my-0 ">
              <Link
                onClick={() => setOpen(!open)}
                to={"/"}
                className="text-lg hover:text-orange-400 text-gray-700 duration"
              >
                Home
              </Link>
            </li>

            <li className="mx-4 my-6 md:my-0">
              <Link
                onClick={() => setOpen(!open)}
                to={"/login"}
                className="text-lg hover:text-white duration bg-red-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            </li>
            <li className="mx-4 my-6 md:my-0">
              <Link
                onClick={() => setOpen(!open)}
                to={"/register"}
                className="text-lg hover:text-white duration bg-blue-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg"
              >
                Registration
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 py-16 items-center">
        <div className="py-8">
          <small className="bg-blue-600 px-2 py-1 rounded-full text-white font-semibold text-xs">
            best leading network in the world
          </small>
          <h1 className="text-7xl font-bold my-4">
            Welcome to <span className="text-blue-600">Cashooz</span>
          </h1>
          <p className="text-sm font-medium text-justify">
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
              className="px-10 py-2 rounded-md border border-blue-400 inline-block mt-4 hover:bg-blue-600 hover:text-white duration-75 hover:shadow-md"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="px-10 py-2 rounded-md border border-blue-400 inline-block mt-4 bg-blue-600 text-white duration-75 hover:shadow-md"
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
      <section className="grid grid-cols-1 md:grid-cols-2 py-16 ">
        <div className="py-8 text-center">
          <img
            className="inline-block w-full h-76 object-cover"
            src="https://i.ibb.co/hBsPdyZ/smartworks-coworking-Uz8-THWPXwh-I-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="py-8 px-4">
          <h2 className="text-3xl font-bold mb-4">About Us </h2>
          <p className="text-sm text-gray-600 font-medium text-justify mt-7">
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
          <p className="text-sm text-gray-600 font-medium text-justify mt-7">
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
         
          <Link
              to={"/register"}
              className="px-10 py-2 rounded-md border border-blue-400 inline-block mt-4 bg-blue-600 text-white duration-75 hover:shadow-md"
            >
              Know More
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
