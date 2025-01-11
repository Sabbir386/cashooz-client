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
import Earning from "./component/Earning";
import Faq from "./component/Faq";

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
      {/* earning section  */}
     <Earning/>
      {/* all points section  */}
      <Faq/>
    </div>
  );
};

export default Landing;
