import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAirbnb, FaBell, FaChartBar } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";

const fadeImage = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const h4Variant = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const pVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.6 } },
};

const buttonVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.8 } },
};

const h1Variant = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 20, transition: { duration: 0.5 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const Hero = () => {
  const heroRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });

      gsap.from(leftCardRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1,
      });

      gsap.from(rightCardRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1.2,
      });
    });
    return () => ctx.revert();
  }, []);

  const swiperSlides = [
    {
      id: 1,
      backgroundImage:
        "https://images.unsplash.com/photo-1515180711443-f8685c6d6a74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Earn Points by Testing Apps, Games, and Surveys",
      subtitle: "CASHOOZ",
      description:
        "Test apps and games, answer surveys, and earn points to redeem for rewards and cash.",
      link: "/register",
      rightImage: "https://i.ibb.co.com/TW5gTCk/3-01.png",
    },
    {
      id: 2,
      backgroundImage:
        "https://images.unsplash.com/photo-1517097473408-c0d7983cb95c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Get Paid to Watch Videos",
      subtitle: "CASHOOZ",
      description:
        "Watch videos and get paid for your time, enjoying content while earning extra cash.",
      link: "/register",
      rightImage: "https://i.ibb.co.com/tmqgMm4/2-01.png",
    },
    {
      id: 3,
      backgroundImage:
        "https://images.unsplash.com/photo-1518183214770-9cffbec72538?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Get Paid for Completing Multiple Tasks",
      subtitle: "CASHOOZ",
      description:
        " Complete simple tasks like data entry, surveys, or testing apps to earn money and rewards.",
      link: "/register",
      rightImage: "https://i.ibb.co.com/pxPShpd/1-01.png",
    },
    {
      id: 4,
      backgroundImage:
        "https://images.unsplash.com/photo-1518183214770-9cffbec72538?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Claim Free Money Available to All",
      subtitle: "CASHOOZ",
      description:
        "Access offers that let anyone claim free money or rewards through easy online tasks.",
      link: "/register",
      rightImage: "https://i.ibb.co.com/JkdhHv8/4-01.png",
    },
    {
      id: 5,
      backgroundImage:
        "https://images.unsplash.com/photo-1518183214770-9cffbec72538?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Get Cash Back When You Shop Online",
      subtitle: "CASHOOZ",
      description:
        "Earn cashback on purchases when shopping through certain websites and apps.",
      link: "/register",
      rightImage: "https://i.ibb.co.com/wrv2stH/6-01.png",
    },
    {
      id: 6,
      backgroundImage:
        "https://images.unsplash.com/photo-1518183214770-9cffbec72538?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Finish More Tasks to Earn More Money",
      subtitle: "CASHOOZ",
      description:
        "The more tasks you complete, the more money you can make through various platforms and offers.",
      link: "/register",
      rightImage: "https://i.ibb.co.com/tXqzdP8/5-01.png",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="pt-24 md:pt-40 pb-8 md:pb-0 px-6 md:px-0 text-center relative bg-gray-50">
      <div  ref={heroRef}>
        <div className="text-center flex justify-center items-center gap-2">
          <div className="w-7 h-7 bg-white shadow-md rounded-md grid items-center justify-center">
            {/* <FaAirbnb className="text-white" /> */}
            <img src="https://i.ibb.co.com/bg28g6LM/cashooz-logo-ico.png" alt="" className="w-4 h-4"/>
            
          </div>
          <h3 className="bg-gray-200 px-3 py-1 text-sm rounded-md">
            Welcome to Cashooz
          </h3>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 my-4">
          <Typewriter
            options={{
              strings: swiperSlides.map((slide) => slide.title),
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <p className="w-full md:w-1/3 mx-auto text-center text-sm text-gray-500 mt-4">
          {/* {swiperSlides.map((slide) => slide.description + " ")} */}
          Turn everyday activities into earning opportunities! Earn rewards and cash by installing apps, answering surveys, playing games and completing simple tasks like data entry. Watch videos and get paid for your time, enjoy content, and earn extra money. Access online offers for free rewards and cashback on purchases. The more you do, the more you earn across different platforms.
        </p>
        <Link
          className="w-56 mx-auto flex justify-center items-center gap-6 text-white font-medium  bg-green-500 py-3 rounded-xl mt-8 "
          to="/login"
        >
          <span> Start Earning Now</span>{" "}
          <div className="w-7 h-7 bg-white shadow-md rounded-md grid items-center justify-center">
            {/* <FaAirbnb className="text-white" /> */}
            <img src="https://i.ibb.co.com/bg28g6LM/cashooz-logo-ico.png" alt="" className="w-4 h-4"/>
            
          </div>
        </Link>
        <img
          src="https://i.ibb.co.com/XfbK3kYT/working.png"
          alt=""
          className="mx-auto"
        />
      </div>

      <div ref={leftCardRef} className="mt-6 md:mt-0 max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-sm border border-gray-100 relative md:absolute md:left-[7%] lg:left-[15%] bottom-[10%]">
        <div className="flex flex-col items-center">
          <div className="w-full px-7">
            <h2 className="text-lg font-semibold text-gray-900 text-left">
              Top User
            </h2>
          </div>
          <div className="w-full bg-white rounded-xl shadow-sm p-4 mt-4 flex flex-col items-center">
            <div className="w-full flex items-center justify-start px-6">
              <img
                src="https://i.ibb.co.com/8nX2FVfQ/avatar-holder.png"
                alt="Profile"
                className="w-12 h-12 rounded-full mb-2"
              />
              <div>
                <h3 className="text-gray-900 font-medium">Amy D. Wills</h3>
                <p className="text-gray-500 text-sm">@amy.wills</p>
              </div>
            </div>
            <div className="flex justify-around w-full mt-3 text-center">
              <div>
                <p className="text-gray-900 font-semibold">230</p>
                <p className="text-gray-500 text-xs">Offer</p>
              </div>
              <div>
                <p className="text-gray-900 font-semibold">$2648</p>
                <p className="text-gray-500 text-xs">Earn</p>
              </div>
              <div>
                <p className="text-gray-900 font-semibold">768</p>
                <p className="text-gray-500 text-xs">completed</p>
              </div>
            </div>
          </div>
          <div className="w-full mt-4 text-center flex justify-between items-center">
            <p className="text-gray-900 font-medium">Top Earnings</p>
            <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full text-sm mt-2 inline-block">
              +83.7%
            </span>
          </div>
        </div>
      </div>
      <div ref={rightCardRef} className="mt-6 md:mt-0 max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-lg border border-gray-200  relative md:absolute md:right-[7%] lg:right-[15%] bottom-[10%]">
        <div className="absolute -top-4 -left-4 bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
          <FaBell className="w-6 h-6" />
          <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">
            96
          </span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Weekly Insight</h2>
        <div className="flex justify-between items-center mt-1 gap-2">
          <p className="text-gray-500 text-sm">Mar 01 - Mar 07</p>
          {/* <select className="bg-gray-100 text-gray-900 text-sm p-1 rounded-lg">
            <option>Week 1</option>
          </select> */}
          <span className="text-xs text-green-600 font-light bg-green-100 px-3 py-1 rounded-full inline-block">
              This Week
            </span>
        </div>
        <div className="">
          <div className="w-full flex justify-between items-end mt-4">
            {[60, 80, 50, 30, 70, 40, 90].map((height, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-3 bg-gray-200 rounded-full relative"
                  style={{ height: "100px" }}
                >
                  <div
                    className="absolute bottom-0 w-3 bg-green-500 rounded-full h-${height}%"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {["S", "M", "T", "W", "T", "F", "S"][index]}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <FaChartBar className="w-3 h-3 text-gray-900" />
            <div>
              <p className="text-gray-900 font-sm">Best Result</p>
              <p className="text-gray-500 text-xs">Sunday</p>
            </div>
            <span className="ml-auto text-gray-900 font-semibold">7.6k</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
