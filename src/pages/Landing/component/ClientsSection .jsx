import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const ClientsSection = () => {
  const clients = [
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Samsung",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    },
    {
      name: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },

    {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg",
    },
    {
      name: "Facebook",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    },
    {
      name: "Coca-Cola",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
    },
    {
      name: "Adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    },
    {
      name: "McDonald's",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/McDonald%27s_logo.svg",
    },
    {
      name: "Twitter",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
    },
  ];

  return (
    <section className="bg-transparent text-buttonBackground py-12">
      <div className="text-center mb-8">
        <h2 className="text-lg md:text-4xl font-semibold">
          Our Clients & Partners
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-4 mt-16">
        <Swiper
          modules={[Autoplay]}
          // slidesPerView={5}
          spaceBetween={10}
          loop={true}
          speed={5000} // Controls smoothness
          autoplay={{
            delay: 0, // Continuous sliding
            disableOnInteraction: false,
          }}
          freeMode={true} // Free mode for seamless transition
          breakpoints={{
            0: {
              slidesPerView: 2, // 2 slides on screens <= 640px
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3, // 2 slides on screens >= 640px
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4, // 3 slides on screens >= 768px
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 5, // 5 slides on screens >= 1024px
              spaceBetween: 20,
            },
          }}
        >
          {clients.map((client, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center w-24 h-24 md:w-40 md:h-40  bg-transparent hover:scale-125 transition-transform group">
                <div className="text-2xl md:text-4xl">
                  <img
                    src={client.logo}
                    alt=""
                    className="w-32 h-16 object-scale-down  grayscale group-hover:grayscale-0"
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
