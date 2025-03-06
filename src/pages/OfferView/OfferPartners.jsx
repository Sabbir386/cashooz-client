import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { HiOutlinePlay, HiOutlineStar } from "react-icons/hi";
import PartnersModal from "./PartnersModal";

const OfferPartners = ({ title, partnerOffers, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentUrl, setModalContentUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalLogo, setModalLogo] = useState("");

  // const partnersData = [
  //   {
  //     id: 1,
  //     title: "MY LEAD",
  //     description: "Complete offers and earn rewards.",
  //     url: `https://reward-me.eu/d32360bc-d403-11ef-9001-c2a106037d45`,
  //     logo: "https://upload.wikimedia.org/wikipedia/commons/a/ac/AdGate_Media_logo.png",
  //     stars: 5,
  //     bonus: "+50%",
  //     type: "Offer Partners",
  //   },
  //   {
  //     id: 2,
  //     title: "CPA Lead",
  //     description: "Discover exclusive offers and start earning.",
  //     url: `https://www.directcpi.com/list/53903?subid=${user?.objectId}`,
  //     logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Offerdaddy_logo.png",
  //     stars: 4,
  //     bonus: "+30%",
  //     type: "Offer Partners",
  //   },
  //   {
  //     id: 3,
  //     title: "THEOREM REACH",
  //     description: "Explore exciting tasks and gain rewards.",
  //     url: `https://theoremreach.com/respondent_entry/direct?api_key=3d6d42797b69b8e571f49bd7bec2&user_id=${user?.objectId}&transaction_id=112233`,
  //     logo: "https://offertoro.com/assets/images/logo.png",
  //     stars: 4,
  //     bonus: "+35%",
  //     type: "Survey Partners",
  //   },
  //   {
  //     id: 4,
  //     title: "Affmine",
  //     description: "Discover exclusive offers and start earning.",
  //     url: `https://affgo.xyz/offerwall`,
  //     logo: "https://network.affmine.com/img/logo.png",
  //     stars: 4,
  //     bonus: "+30%",
  //     type: "Offer Partners",
  //   }
  // ];
  // Filter the partnersData by type
  const filteredPartners = partnerOffers;
  //console.log(filteredPartners)

  const openModal = (url, title, _id) => {
    let linkParams;
    if (title === "Offer Partners") {
      linkParams = `&s1=${_id}&s2=${user?.objectId}`;
    } else {
      linkParams = `&user_id=${user?.objectId}&s1=${_id}&s2=${user?.objectId}`;
    }
    const finalURL = url + linkParams;
    //console.log(finalURL)
    setModalContentUrl(finalURL);
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
    {
      filteredPartners?.length > 0 ? (
<h3 className="text-xl md:text-2xl font-semibold text-white text-left">
        {title}
      </h3>
      ) : <></>
    }
      

      <div className="mt-5">
        <div className="grid gap-4 mt-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
          {filteredPartners?.map((partner) => (
            <div
              key={partner._id}
              onClick={() =>
                openModal(partner.offerLink, partner.name, partner._id)
              }
              className="relative h-64 rounded-xl shadow-md shadow-white flex flex-col justify-center items-center text-center text-white cursor-pointer transition-transform duration-300 hover:scale-105 group overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#1f1f2e] to-[#0f0f1f] opacity-90"></div>

              {/* Watermark logo */}
              <div
                className="absolute inset-0 flex justify-center items-center opacity-30 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  backgroundImage: `url(${partner.image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Bonus Badge */}
              <div className="absolute top-3 right-3 bg-green-500 text-xs px-2 py-2 rounded-full z-20">
                {partner.points}
              </div>

              {/* Play button (visible on hover) */}
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                <div className="bg-white rounded-full p-3 group-hover:translate-y-2 transition-transform duration-300">
                  <HiOutlinePlay className="text-2xl text-[#1f1f2e]" />
                </div>
                <p className="mt-3 text-white font-medium text-sm">
                  View Offers
                </p>
              </div>
              <h5 className="relative z-10 -translate-y-7 font-bold text-lg mb-3 transition-all duration-300 group-hover:opacity-50 group-hover:translate-y-2">
                {partner.name}
              </h5>
              {/* Title above stars */}
              <h3 className="absolute bottom-10 font-bold text-sm mb-1 z-20 transition-all duration-300 group-hover:opacity-50">
                {partner.name}
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
