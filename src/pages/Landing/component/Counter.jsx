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
      count: 400,
      text: "Team member Financial planners help people about wtoio invest",
    },
    {
      count: 80,
      text: "Team member Financial planners help people about wtoio invest",
    },
    {
      count: 10,
      text: "Team member Financial planners help people about wtoio invest",
    },
    {
      count: 40,
      text: "Team member Financial planners help people about wtoio invest",
    },
  ];

  return (
    <div>
      <div>
        <h2 className="text-4xl font-bold text-center">Our Stats</h2>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-8 py-20"
        ref={ref}
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center text-gray-800 font-sans">
            <div className="text-5xl font-bold text-blue-900">
              {inView ? <CountUp start={0} end={stat.count} duration={2} /> : 0}
              k+
            </div>
            <p className="mt-2 text-sm font-medium leading-relaxed">
              {stat.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counter;
