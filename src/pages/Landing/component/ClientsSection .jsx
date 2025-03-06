import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const ClientsSection = () => {
  const clients = [
    {
      name: "Apple",
      logo: "https://www.getpaidto.com/assets/common/images/logos/offer-walls/adgatemedia.png",
    },
    {
      name: "Google",
      logo: "https://www.getpaidto.com/assets/common/images/logos/offer-walls/bitlabs-offers.png",
    },
    {
      name: "Microsoft",
      logo: "https://www.getpaidto.com/assets/common/images/logos/offer-walls/mediumpath.png",
    },
    {
      name: "Amazon",
      logo: "https://www.getpaidto.com/assets/common/images/logos/offer-walls/ewallbiz.png",
    },
    {
      name: "Samsung",
      logo: "https://www.getpaidto.com/assets/common/images/logos/offer-walls/timewall.png",
    },
    {
      name: "Nike",
      logo: "https://www.getpaidto.com/assets/common/images/logos/offer-walls/notikme.png",
    },
    {
      name: "Facebook",
      logo: "https://www.getpaidto.com/assets/common/images/logos/offer-walls/lootably.png",
    },
    {
      name: "Coca-Cola",
      logo: "https://www.getpaidto.com/assets/common/images/logos/offer-walls/bandwidth.png",
    },
    {
      name: "Adidas",
      logo: "https://www.getpaidto.com/assets/common/images/logos/offer-walls/shortlinks.png",
    },
    {
      name: "McDonald's",
      logo: "https://www.getpaidto.com/assets/common/images/logos/offer-walls/hideouttv.png",
    },
    {
      name: "Twitter",
      logo: "https://www.getpaidto.com/assets/common/images/logos/offer-walls/autosurf.png",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto bg-white text-buttonBackground pt-12">
      <div className="text-center mb-2">
        <h2 className="text-base font-semibold text-cardBackground">
          Trusted by world's leading brand
        </h2>
      </div>

      <div className="flex flex-wrap justify-center px-4 mt-2 w-full">
        <Swiper
          modules={[Autoplay]}
          // slidesPerView={3}
          loop={true}
          speed={5000} // Controls smoothness
          autoplay={{
            delay: 0, // Continuous sliding
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            400:{
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          // freeMode={true} // Free mode for seamless transition
       
          
           
        >
          {clients.map((client, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center w-24 h-16 md:w-40 md:h-40  bg-transparent hover:scale-125 transition-transform group">
                <div className="text-2xl md:text-4xl">
                  <img
                    src={client.logo}
                    alt=""
                    className="w-32 h-16 object-scale-down greyScale hover:grayscale-0" 
                  />
                  
                </div>
                {/* <p className="mt-2 text-xs md:text-sm text-center text-black">
                  {client.name}
                </p> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ClientsSection;
