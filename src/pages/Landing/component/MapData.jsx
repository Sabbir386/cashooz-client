import React from "react";
import WorldMap from "react-svg-worldmap";

export default function MapData() {
  const data = [
    { country: "cn", value: '$138' }, // china
    { country: "in", value: '$1314' }, // india
    { country: "us", value: '$331' }, // united states
    { country: "id", value: '$264' }, // indonesia
    { country: "pk", value: '$210' }, // pakistan
    { country: "br", value: '$210' }, // brazil
    { country: "ng", value: '$208' }, // nigeria
    { country: "bd", value: '$161' }, // bangladesh
    { country: "ru", value: '$141' }, // russia
    { country: "mx", value: '$127' }, // mexico
  ];
  return (
    <div className="flex flex-col justify-center items-center text-center bg-secondaryColor py-5">
     
        <h2 className="text-lg md:text-4xl font-semibold text-white mb-3">
        Top 10 Populous Countries by Withdraw
        </h2>
        <WorldMap
      color="#ffffff"
      backgroundColor="#212134"
      value-suffix="people"
      size="lg"
      data={data}
      className="mx-auto"
      richInteraction={true} // Ensures interactivity
      customComponent={(countryData, color) => (
        <text
          x={countryData.coordinates[0]}
          y={countryData.coordinates[1]}
          fontSize="12"
          fill="#01D676"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {countryData.countryCode.toUpperCase()} ({countryData.value.toLocaleString()})
        </text>
      )}
    />
    </div>
  );
}
