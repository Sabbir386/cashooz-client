import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./component/Card";
import One from "../../assets/img/one.svg";
import Two from "../../assets/img/two.svg";
import Three from "../../assets/img/three.svg";

import LiteCoin from "../../assets/img/Litecoin.png";
import Visa from "../../assets/img/Visa.png";
import Bitcoin from "../../assets/img/Bitcoin.png";
import GooglePlay from "../../assets/img/Google-Play.png";
import AppleApple from "../../assets/img/AppleApple.png";
import Ethereum from "../../assets/img/Ethereum.png";
import Amazon from "../../assets/img/Amazon.png";
import Spotify from "../../assets/img/Spotify.png";
import Netflix from "../../assets/img/Netflix.png";
import UberEats from "../../assets/img/UberEats.png";
import { FaCheck } from "react-icons/fa";
import InfiniteScroll from "./component/InfiniteScroll";
import Hero from "./component/Hero";
import HowWorks from "./component/HowWorks";
import ClientsSection from "./component/ClientsSection ";
import Counter from "./component/Counter";
import MapData from "./component/MapData";

const Landing = () => {

  const items = [
    {
      title: "SIGN UP",
      description: "Create a new account and login to get started.",
      icon: "https://via.placeholder.com/50", // Replace with actual icon URL
    },
    {
      title: "PLAY THE MULTIPLIER",
      description: "Multiply your Coins up to 6x.",
      icon: "https://via.placeholder.com/50", // Replace with actual icon URL
    },
    {
      title: "COMPLETE TASKS",
      description: "Complete tasks to level up and earn reward points.",
      icon: "https://via.placeholder.com/50", // Replace with actual icon URL
    },
    {
      title: "COMPLETE OFFERS",
      description: "Complete quick offers to earn even more Bitcoin each day.",
      icon: "https://via.placeholder.com/50", // Replace with actual icon URL
    },
    {
      title: "DO SURVEYS",
      description: "Complete surveys every day to earn thousands of Coins.",
      icon: "https://via.placeholder.com/50", // Replace with actual icon URL
    },
    {
      title: "WATCH VIDEOS",
      description: "Watch videos and earn Coins.",
      icon: "https://via.placeholder.com/50", // Replace with actual icon URL
    },
  ];
  const cards = [
    {
      title: "SURVEYS",
      description: "Get paid for your opinion",
      buttonText: "Answer now",
      imageSrc: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      title: "GAMES",
      description: "Earn by playing games",
      buttonText: "Play now",
      imageSrc: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      title: "QUICK POINTS",
      description: "Quick tasks for easy points",
      buttonText: "Start now",
      imageSrc: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      title: "OFFER WALLS",
      description: "Complete online offers",
      buttonText: "Start now",
      imageSrc: "https://via.placeholder.com/150", // Replace with actual image URL
    },
  ];
  const features = [
    {
      title: "LOYALTY BONUS",
      description:
        "Login each day to boost your loyalty bonus all the way to 100%.",
      icon: "🎯", // Replace with actual icons if needed
    },
    {
      title: "REWARD POINTS",
      description:
        "Earn reward points by completing tasks and boosting your level. Cash in reward points for real prizes.",
      icon: "💎",
    },
    {
      title: "FAST PAYMENTS",
      description:
        "Withdraw your Coins any time to FaucetHub or your Bitcoin or Doge Wallet.",
      icon: "⚡",
    },
    {
      title: "EARN INTEREST",
      description:
        "Earn 5% interest on your Coin balance when you reach 35,000 Coins.",
      icon: "💰",
    },
    {
      title: "MULTIPLY YOUR COINS",
      description:
        "Play our unique sci-fi themed multiplier game to boost your Coin balance.",
      icon: "🎮",
    },
    {
      title: "EXPERT SUPPORT",
      description:
        "Our support team is the best in the business and is always available to help.",
      icon: "🛠️",
    },
    {
      title: "DEPOSIT COINS",
      description:
        "Send Bitcoin directly to your Cointiply account to earn even more interest.",
      icon: "💵",
    },
    {
      title: "COMMUNITY",
      description:
        "Chat & share your progress with other like-minded Cointiply users.",
      icon: "🤝",
    },
    {
      title: "25% FOR REFERRALS",
      description:
        "Earn 25% of all your referrals claims and 10% of their offer earnings.",
      icon: "👥",
    },
  ];
  const points = [
    { label: "10 POINTS = $0.1", bgColor: "bg-green-500" },
    { label: "100 POINTS = $1", bgColor: "bg-red-500" },
    { label: "1,000 POINTS = $10", bgColor: "bg-black" },
    { label: "10,000 POINTS = $100", bgColor: "bg-blue-500" },
  ];


  return (
    <div className="bg-white">
      {/* bannner section   */}
      <Hero />
      {/* how works section  */}
      <HowWorks />
      {/* clients section  */}
      <ClientsSection />
      {/*counter section  */}
      <Counter/>
      {/* map section  */}
      <MapData/>
      {/* cards section  */}
      <InfiniteScroll></InfiniteScroll>
      {/* features section  */}
      <div className="bg-gray-100 py-12">
        {/* Section Header */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          COINTIPLY FEATURES
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-white rounded-lg shadow-md"
            >
              {/* Icon */}
              <div className="text-pink-500 text-3xl mr-4">{feature.icon}</div>
              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* earning section  */}
      <div className="bg-gray-100 py-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto px-4">
          <div className="flex justify-center mb-4">
            {/* Replace with actual image */}
            <img
              src="https://via.placeholder.com/80"
              alt="Icon"
              className="w-20 h-20"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            how much can I earn?
          </h2>
          <p className="text-gray-600 mt-4">
            When we say your opinions are valuable, we mean it.
            <br />
            Every time you complete one of our surveys, you’ll earn **Opinion
            Points**.
          </p>
          <p className="text-gray-600 mt-2">
            An average survey pays out around 10 points but can be worth as much
            as 250 points.
          </p>
        </div>

        {/* Points Worth Section */}
        <div className="mt-12">
          <h3 className="text-center font-bold text-gray-800 text-lg">
            POINTS WORTH IN USD
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mt-6 px-4">
            {points.map((point, index) => (
              <div
                key={index}
                className={`${point.bgColor} text-white py-4 px-8 rounded-md shadow-md`}
              >
                {point.label}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
        <div className="mt-12 text-center">
          <div className="bg-white border-2 border-blue-500 py-6 px-8 inline-block rounded-md shadow-md">
            <p className="text-blue-500 font-medium text-lg">
              We have paid our members
            </p>
            <p className="text-green-500 text-4xl font-bold mt-2">
              $3,724,318.37
            </p>
          </div>
        </div>
      </div>
      {/* all points section  */}
    </div>
  );
};

export default Landing;
