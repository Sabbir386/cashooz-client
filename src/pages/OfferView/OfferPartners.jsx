import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { HiOutlinePlay, HiOutlineStar } from "react-icons/hi";
import PartnersModal from "./PartnersModal";

const OfferPartners = ({title}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentUrl, setModalContentUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalLogo, setModalLogo] = useState("");

  const partnersData = [
    {
      id: 1,
      title: "AdGate Media",
      description: "Complete offers and earn rewards.",
      url: "https://adgatemedia.com/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ac/AdGate_Media_logo.png",
      stars: 5,
      bonus: "+50%",
    },
    {
      id: 2,
      title: "Offerdaddy",
      description: "Discover exclusive offers and start earning.",
      url: "https://www.offerdaddy.com/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Offerdaddy_logo.png",
      stars: 4,
      bonus: "+30%",
    },
    {
      id: 3,
      title: "OfferToro",
      description: "Explore exciting tasks and gain rewards.",
      url: "https://www.offertoro.com/",
      logo: "https://offertoro.com/assets/images/logo.png",
      stars: 4,
      bonus: "+35%",
    },
    {
      id: 4,
      title: "Peanut Labs",
      description: "Participate in surveys and earn cash rewards.",
      url: "https://www.peanutlabs.com/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Peanut_Labs_logo.png",
      stars: 5,
      bonus: "+40%",
    },
    {
      id: 5,
      title: "Adscend Media",
      description: "Engage with offers and unlock amazing rewards.",
      url: "https://adscendmedia.com/",
      logo: "https://adscendmedia.com/assets/images/adscend-media-logo.png",
      stars: 5,
      bonus: "+45%",
    },
    {
      id: 6,
      title: "CPALead",
      description: "Monetize your clicks with premium offers.",
      url: "https://www.cpalead.com/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/CPALead_logo.png",
      stars: 3,
      bonus: "+25%",
    },
    {
      id: 7,
      title: "Revenue Universe",
      description: "Generate revenue by completing daily tasks.",
      url: "https://revenueuniverse.com/",
      logo: "https://revenueuniverse.com/assets/images/revenue-universe-logo.png",
      stars: 4,
      bonus: "+30%",
    },
  ];

  const openModal = (url, title, logo) => {
    setModalContentUrl(url);
    setModalTitle(title);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContentUrl("");
    setModalTitle("");
  };

  return (
    <>
      
        <h3 className="text-xl md:text-2xl font-semibold text-white text-left">
         {title}
        </h3>
      
      <div className="mt-5">
        <div className="grid gap-4 mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
          {partnersData.map((partner) => (
            <div
              key={partner.id}
              onClick={() =>
                openModal(partner.url, partner.title, partner.logo)
              }
              className="relative h-64 rounded-xl shadow-lg flex flex-col justify-center items-center text-center text-white cursor-pointer transition-transform duration-300 hover:scale-105 group overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#1f1f2e] to-[#0f0f1f] opacity-90"></div>

              {/* Watermark logo */}
              <div
                className="absolute inset-0 flex justify-center items-center opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  backgroundImage: `url(${partner.logo})`,
                  backgroundSize: "50%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Bonus Badge */}
              <div className="absolute top-3 right-3 bg-green-500 text-xs px-2 py-1 rounded-full z-20">
                {partner.bonus}
              </div>

              {/* Play button (visible on hover) */}
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                <div className="bg-white rounded-full p-3 group-hover:translate-y-2 transition-transform duration-300">
                  <HiOutlinePlay className="text-2xl text-[#1f1f2e]" />
                </div>
                <p className="mt-3 text-white font-medium text-sm">
                  View Offers
                </p>
              </div>
              <h5 className="relative z-10 font-bold text-lg mb-3 transition-all duration-300 group-hover:opacity-50 group-hover:translate-y-2">
                {partner.title}
              </h5>
              {/* Title above stars */}
              <h3 className="absolute bottom-10 font-bold text-sm mb-1 z-20 transition-all duration-300 group-hover:opacity-50">
                {partner.title}
              </h3>

              {/* Stars (hidden by default and sliding out on hover) */}
              <div className="absolute bottom-5 flex justify-center space-x-1 group-hover:translate-y-3 transition-transform duration-300">
                {[...Array(partner.stars)].map((_, i) => (
                  <HiOutlineStar key={i} className="text-blue-500" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <PartnersModal
          isOpen={isModalOpen}
          onClose={closeModal}
          modalContentUrl={modalContentUrl}
          modalTitle={modalTitle}
        />
      </div>
    </>
  );
};

export default OfferPartners;
