import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = () => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the component is visible
    triggerOnce: true, // Ensure the animation triggers only once
  });

  const stats = [
    {
      count: 515329,
      text: "Total User",
    },
    {
      count: 798,
      text: "Total Offer",
    },
    {
      count: 177804,
      text: "Offer Completed",
    },
    {
      count: 242580,
      text: "Paid Out",
    },
  ];

  return (
    <div className="bg-secondaryColor py-5">
      {/* <div>
        <h2 className="text-4xl font-bold text-center text-white">Our Stats</h2>
      </div> */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-8 py-20"
        ref={ref}
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center text-gray-800 font-sans">
            <p className="mt-2 text-4xl font-bold leading-relaxed text-white">
              {stat.text}
            </p>
            <div className="text-4xl font-bold text-buttonBackground">
            {stat.text === "Paid Out" ? "$" : ""}
              {inView ? <CountUp start={0} end={stat.count} duration={2} /> : 0}
             {stat.text === "Paid Out" ? "+" : "+"}
              
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counter;
