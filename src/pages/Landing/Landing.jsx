import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaCheck, FaWindowClose } from "react-icons/fa";
import Card from "./component/Card";
import One from "../../assets/img/one.svg";
import Two from "../../assets/img/two.svg";
import Three from "../../assets/img/three.svg";

import LiteCoin from '../../assets/img/Litecoin.png';
import Visa from '../../assets/img/Visa.png';
import Bitcoin from '../../assets/img/Bitcoin.png';
import GooglePlay from '../../assets/img/Google-Play.png';
import AppleApple from '../../assets/img/AppleApple.png';
import Ethereum from '../../assets/img/Ethereum.png';
import Amazon from '../../assets/img/Amazon.png';
import Spotify from '../../assets/img/Spotify.png';
import Netflix from '../../assets/img/Netflix.png';
import UberEats from '../../assets/img/UberEats.png';

const Landing = () => {
  const [open, setOpen] = useState(false);
  const cards = [
    {
      image: "https://freecash.com/public/img/homepage/netflix.png",
      title: "Netflix",
      description: "Start a trial month",
      price: "5.00",
      rating: "5.0",
    },
    {
      image: "https://freecash.com/public/img/homepage/dice-dreams.png",
      title: "Dice Dreams",
      description: "Reach level 10",
      price: "119.47",
      rating: "5.0",
    },
    {
      image: "https://freecash.com/public/img/homepage/tiktok.png",
      title: "TikTok",
      description: "Sign up",
      price: "2.00",
      rating: "5.0",
    },
  ];
  const cashouts = [
    { id: 1, name: "missa48", country: "US", amount: "$5.00" },
    { id: 2, name: "gracerozza", country: "UK", amount: "$5.00" },
    { id: 3, name: "Rashid", country: "US", amount: "$5.00" },
    { id: 4, name: "Bethany", country: "UK", amount: "$5.00" },
  ];
  return (
    <div className="bg-gradient-radial  from-[#141523] via-[#212134] to-[#222339]">
      {/* main container */}
      <div className="max-w-[1440px] mx-auto px-2 md:px-0  py-10">
        {/* banner section  */}
        <div className="min-h-screen">
          {/* naver section  */}
          <header className="z-[999] bg-cardBackground fixed w-full left-0 top-0">
            <nav className="md:w-[1440px] mx-auto  md:flex md:items-center md:justify-between md:place-items-center">
              <div className="flex justify-between place-items-center">
                <Link to={"/"} className="text-3xl font-semibold">
                  <img
                    src="https://i.ibb.co/bzNx8tb/co-logo.png"
                    alt=""
                    className="w-20"
                  />
                </Link>
                <span
                  onClick={() => setOpen(!open)}
                  className="md:hidden block text-white"
                >
                  {open ? <FaWindowClose></FaWindowClose> : <FaBars></FaBars>}
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
                    to={"/"}
                    className="text-base hover:text-buttonBackground text-white duration"
                  >
                    Home
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

                <li className="mx-2 my-4 md:my-0">
                  <Link
                    onClick={() => setOpen(!open)}
                    to={"/advertiser-register"}
                    className="text-base font-semibold text-red-400 px-4 py-2"
                  >
                    Become an Advertiser
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          {/* naver section  */}
          {/* hero section  */}
          <section className="py-24 flex flex-col md:flex-row relative z-10">
            <div className="py-8 text-left w-full md:w-5/12">
              {/* <small className="bg-buttonBackground px-2 py-1 rounded-full text-white font-semibold text-xs">
              Cashooz
            </small> */}
              <h1 className="text-6xl font-bold mt-5 text-white">
                <span className="text-buttonBackground">Get paid </span>
                for testing apps, games & surveys
              </h1>
              <p className="text-white text-sm my-4 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                accusamus error pariatur laborum cumque iste commodi ipsa
                debitis excepturi sint. Nisi quos asperiores repellendus quod
                voluptas dolor ex impedit aliquam recusandae laudantium beatae
                repellat atque voluptatem
              </p>

              <div className="flex gap-5 justify-start items-center mt-5">
                <Link
                  to={"/register"}
                  className="px-10 py-2 rounded-full border border-buttonBackground inline-block mt-4 bg-buttonBackground text-white duration-75 hover:shadow-md"
                >
                  Registration
                </Link>
                <Link
                  to={"/login"}
                  className="px-10 py-2 rounded-full border text-white border-buttonBackground inline-block mt-4 hover:bg-buttonBackground hover:text-white duration-75 hover:shadow-md"
                >
                  Login
                </Link>
              </div>

              <div className="mt-7 flex gap-5 py-4 text-white opacity-50">
                <p className="text-xs flex items-center gap-2">
                  <span>
                    <FaCheck className="text-buttonBackground" />
                  </span>{" "}
                  <span>Lorem ipsum dolor sit amet.</span>
                </p>
                <p className="text-xs flex items-center gap-2">
                  <span>
                    <FaCheck className="text-buttonBackground" />
                  </span>{" "}
                  <span>Lorem ipsum dolor sit amet.</span>
                </p>
              </div>
            </div>
            <div className="w-full md:w-7/12 md:px-16">
              <div className="flex flex-wrap justify-center space-x-4  p-8">
                {cards.map((card, index) => (
                  <Card
                    key={index}
                    image={card.image}
                    title={card.title}
                    description={card.description}
                    price={card.price}
                    rating={card.rating}
                  />
                ))}
              </div>
              <div className="overflow-hidden mt-4 mb-6 z-[97]">
                <div className="text-white p-2 rounded shadow-sm inline-flex flex-nowrap gap-5 overflow-hidden animate-infinite-scroll">
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>
                  <div className="w-[200px] flex gap-3 justify-center items-center border-r-2">
                    <div>
                      <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                        A
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm">Payout</h5>
                      <h6 className="text-xs mt-1">Game</h6>
                    </div>
                    <div>
                      <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                        $18.52
                      </span>
                    </div>
                  </div>

                  {/* Repeat the inner divs as necessary */}
                </div>
              </div>
            </div>
          </section>
          {/* hero section  */}
        </div>
        {/* banner section  */}
        {/* info section  */}
        <section className="bg-[#15172b] p-8 rounded-lg flex flex-col sm:flex-row justify-between items-center text-white gap-4">
          {/* Card 1 */}
          <div className="flex flex-col justify-center items-center  text-center">
            <div className="flex justify-center items-center text-2xl font-bold">
              <span className="mr-2">⏱️</span>
              <span>0h 17m 16s</span>
            </div>
            <p className="text-gray-400 mt-2">
              Average time until user makes first cashout
            </p>
          </div>

          {/* Divider for larger screens */}
          <div className="hidden sm:block h-16 border-l border-gray-600"></div>

          {/* Card 2 */}
          <div className="flex flex-col justify-center items-center  text-center">
            <div className="text-2xl font-bold">$49.50</div>
            <p className="text-gray-400 mt-2">
              Average money earned by users yesterday
            </p>
          </div>

          {/* Divider for larger screens */}
          <div className="hidden sm:block h-16 border-l border-gray-600"></div>

          {/* Card 3 */}
          <div className="flex flex-col justify-center items-center  text-center">
            <div className="text-2xl font-bold">$140,215,322</div>
            <p className="text-gray-400 mt-2">Total USD earned on Freecash</p>
          </div>
        </section>
        {/* info section  */}
        {/* featured section  */}
        <section className=" p-8 rounded-lg text-white">
          <h2 className="text-center text-3xl font-bold mb-8">
            We’re the #1 site to make money.{" "}
            <span className="text-green-500">Here’s why</span>
          </h2>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            {/* Feature 1 */}
            <div className="bg-[#1b1e36] p-6 rounded-lg flex flex-col items-center text-center">
              <img src={One} alt="Highest payouts icon" className="h-16 mb-4" />
              <h3 className="text-xl font-bold">Highest payouts</h3>
              <p className="text-gray-400 mt-2">
                Earn way more than on other sites. It’s our goal to help you
                make as much money as possible.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#1b1e36] p-6 rounded-lg flex flex-col items-center text-center">
              <img
                src={Two}
                alt="Instant cashouts icon"
                className="h-16 mb-4"
              />
              <h3 className="text-xl font-bold">Instant cashouts</h3>
              <p className="text-gray-400 mt-2">
                Need your earnings now? No problem. You can withdraw them almost
                instantly starting at $2.00.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#1b1e36] p-6 rounded-lg flex flex-col items-center text-center">
              <img src={Three} alt="Daily bonuses icon" className="h-16 mb-4" />
              <h3 className="text-xl font-bold">Daily bonuses</h3>
              <p className="text-gray-400 mt-2">
                Climb the daily bonus ladder, reach the leaderboard, or start a
                streak to earn extra rewards, for free.
              </p>
            </div>
          </div>
        </section>
        {/* featured section  */}
        {/* cashout section  */}
        <section className="p-8 text-white flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Cashout via</h2>
          <div className="w-full py-6 flex flex-wrap justify-between gap-6">
            <img
              src={LiteCoin}
              alt="Litecoin"
              className="h-12"
            />
            <img src={Visa} alt="Visa" className="h-12" />
            <img
              src={Bitcoin}
              alt="Bitcoin"
              className="h-12"
            />
            <img
              src={GooglePlay}
              alt="Google Play"
              className="h-12"
            />
            <img
              src={AppleApple}
              alt="Apple"
              className="h-12"
            />
            <img
              src={Ethereum}
              alt="Ethereum"
              className="h-12"
            />
            <img
              src={Amazon}
              alt="Amazon"
              className="h-12"
            />
            <img
              src={Spotify}
              alt="Spotify"
              className="h-12"
            />
            <img
              src={Netflix}
              alt="Netflix"
              className="h-12"
            />
            <img
              src={UberEats}
              alt="Uber Eats"
              className="h-12"
            />
          </div>
        </section>
        {/* cashout section  */}
        {/* live cashout section  */}
        <section className="bg-sidebarBackground p-4 rounded-lg max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Side - Stats */}
            <div className="bg-[#2A2837] p-6 rounded-lg flex flex-col justify-center items-center">
              <h2 className="text-white text-lg mb-4">
                This month users cashed out
              </h2>
              <p className="text-4xl font-bold text-white mb-4">
                $1,101,030.19
              </p>
              <div className="flex space-x-2">
                {/* Add any icons or graphics as needed here */}
                <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
                <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
                <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
              </div>
            </div>

            {/* Right Side - Live Cashouts */}
            <div className="p-6 rounded-lg">
              <h2 className="text-white text-lg mb-4">Live cashouts</h2>
              <ul className="space-y-4">
                {cashouts.map((cashout) => (
                  <li
                    key={cashout.id}
                    className="flex justify-between items-center bg-cardBackground py-1 px-4 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gray-600 rounded-full overflow-hidden flex items-center justify-center text-white">
                        <img
                          src={`https://avatars.steamstatic.com/770f2404ed922fa6adf220e5b7876d094a81411a.jpg`}
                          alt={cashout.name}
                          className="w-10 h-10 object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white flex flex-col space-x-1">
                          <h5>{cashout.name}</h5>
                          {/* <span className="text-lg">{cashout.flag}</span> */}
                          <span className="text-gray-400">
                            (less than a minute ago)
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-white font-bold">
                        {cashout.amount}
                      </span>
                      <button className="bg-blue-600 p-2 rounded-sm">
                        {/* Replace with the correct icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-2 w-2 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12l5 5L20 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* live cashout section  */}
        {/* footer section  */}
        <footer className="bg-[#1C1B29] text-gray-400 p-8 mt-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo and Trustpilot Section */}
              <div className="col-span-2">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.ibb.co/bzNx8tb/co-logo.png"
                    alt="Cashoooz Logo"
                    className="mr-2 w-20 h-20 object-cover"
                  />
                  <h1 className="text-white text-xl font-bold">CASHOOZ</h1>
                </div>
                <p>© 2020 - 2024 Cashoooz. All rights reserved.</p>
                <p className="mt-2">
                  See our <span className="text-white font-bold">111,982</span>{" "}
                  reviews on{" "}
                  <span className="text-green-400 font-bold">Trustpilot</span>
                </p>
              </div>

              {/* Language Section */}
              <div className="col-span-1">
                <h2 className="text-white text-lg mb-4">Language</h2>
                <div className="flex items-center space-x-2 bg-[#2A2837] p-2 rounded-lg">
                  <span role="img" aria-label="UK Flag">
                    🇬🇧
                  </span>
                  <span>English</span>
                </div>
              </div>

              {/* About Section */}
              <div className="col-span-1">
                <h2 className="text-white text-lg mb-4">About</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support Section */}
              <div className="col-span-1">
                <h2 className="text-white text-lg mb-4">Support</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      How does Cashoooz work?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Business Inquiries
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="mt-8 flex justify-center space-x-6">
              {/* Replace these with actual icons */}
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4h-4v4a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2h2V6a4 4 0 014-4h4a4 4 0 014 4v2h-4a2 2 0 00-2 2v2h4"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 8a3 3 0 01-3 3H9a3 3 0 01-3-3 3 3 0 013-3h6a3 3 0 013 3zm-6 8a6 6 0 00-6-6H3v2a6 6 0 0012 0v-2h-3a6 6 0 00-6 6v2a6 6 0 0012 0v-2h-3a6 6 0 00-6 6z"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V8a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2zm10 0h-2a2 2 0 01-2-2V8a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2zM7 20h10a2 2 0 002-2v-4H5v4a2 2 0 002 2z"
                  />
                </svg>
              </a>
              {/* Add more social icons as needed */}
            </div>
          </div>
        </footer>
        {/* footer section  */}
      </div>
      {/* main container */}
    </div>
  );
};

export default Landing;
