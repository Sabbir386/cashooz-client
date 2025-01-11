import React from "react";
import {
  FaAddressBook,
  FaAngellist,
  FaAtlassian,
  FaDatabase,
  FaEarlybirds,
  FaGifts,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const HowWorks = () => {
  const services = [
    {
      title: "SIGN UP",
      description: "Create a new account and login to get started.",
      icon: <FaAddressBook />,
    },
    {
      title: "PLAY THE MULTIPLIER",
      description: "Multiply your Coins up to 6x.",
      icon: <FaAngellist />,
    },
    {
      title: "COMPLETE TASKS",
      description: "Complete tasks to level up and earn reward points.",
      icon: <FaAtlassian />, // Replace with actual icon URL
    },
    {
      title: "COMPLETE OFFERS",
      description: "Complete quick offers to earn even more Bitcoin each day.",
      icon: <FaDatabase />,
      // Replace with actual icon URL
    },
    {
      title: "DO SURVEYS",
      description: "Complete surveys every day to earn thousands of Coins.",
      icon: <FaEarlybirds />,
      // Replace with actual icon URL
    },
    {
      title: "WATCH VIDEOS",
      description: "Watch videos and earn Coins.",
      icon: <FaGifts />, // Replace with actual icon URL
    },
  ];
  return (
    <div className="bg-secondaryColor py-12">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-4">How Cashooz Works</h2>
        <p className="text-gray-200 mb-8">
          We give away thousands of dollars of free money every day.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
             <div key={index} className="flex flex-col items-left text-left p-8 border bg-primaryColor border-gray-200 rounded-lg hover:shadow-sm hover:bg-slate-100 transition duration-500 ease-in-out group">
             <div className="text-5xl mb-4 text-white hover:text-buttonBackground group-hover:-translate-y-2 group-hover:text-buttonBackground duration-300">
               {service.icon}
             </div>
             <h3 className="text-xl text-white group-hover:text-primaryColor font-semibold  mb-4">
               {service.title}
             </h3>
             <p className="text-gray-200 group-hover:text-primaryColor mb-6">
               {service.description}
             </p>
             <Link to={'/register'} className="text-buttonBackground font-medium flex items-center space-x-2 hover:text-pink-700 transition-colors">
               <span>Join Now</span>
               <span>→</span>
             </Link>
           </div>
          ))}
         
        
        </div>
      </div>
    </div>
  );
};

export default HowWorks;
