import React from "react";

const ClientsSection = () => {
  const clients = [
    { name: "Brand 1986", logo: "🌐" },
    { name: "UDIX", logo: "📦" },
    { name: "matthew coo.", logo: "✍️" },
    { name: "ZUMAR CONS", logo: "🏗️" },
    { name: "USA INTERIOR DESIGN", logo: "🏠" },
    { name: "125+ clients worldwide", logo: "🌍" },
  ];

  return (
    <section className="bg-gray-800 text-white py-12">
      <div className="text-center mb-8">
        <h2 className="text-lg md:text-4xl font-semibold">Our Clients & Partners</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6 px-4 mt-16">
        {clients.map((client, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-24 h-24 md:w-40 md:h-40 border border-gray-600 rounded-full bg-transparent hover:scale-105 transition-transform"
          >
            <div className="text-2xl md:text-4xl">{client.logo}</div>
            <p className="mt-2 text-xs md:text-sm text-center">{client.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientsSection;
