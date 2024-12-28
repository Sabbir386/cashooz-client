import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Link } from "react-router-dom";

const Hero = () => {
  const swiperSlides = [
    {
      id: 1,
      backgroundImage:
        "https://images.unsplash.com/photo-1515180711443-f8685c6d6a74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "make money",
      subtitle: "CASHOOZ",
      description:
        "💲Cashooz.com💰 is one of the web's leading rewards platforms, with a vibrant and rapidly growing community. It's a completely free program that lets you earn real money by completing everyday online tasks and activities. Whether you're browsing, shopping, or engaging with content, you can make money from home. Once you've earned, simply redeem your rewards through one of our supported payout methods—no personal investment required. Start earning today",
      link: "/register",
      rightImage:
        "https://i.ibb.co.com/LZXSC9P/The-Little-Things-Business-Planning.png",
    },
    {
      id: 2,
      backgroundImage:
        "https://images.unsplash.com/photo-1515180711443-f8685c6d6a74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "make money",
      subtitle: "CASHOOZ",
      description:
        "💲Cashooz.com💰 is one of the web's leading rewards platforms, with a vibrant and rapidly growing community. It's a completely free program that lets you earn real money by completing everyday online tasks and activities. Whether you're browsing, shopping, or engaging with content, you can make money from home. Once you've earned, simply redeem your rewards through one of our supported payout methods—no personal investment required. Start earning today",
      link: "/register",
      rightImage: "https://i.ibb.co.com/nrDjzdN/Humaaans-2-Characters.png",
    },
    {
      id: 3,
      backgroundImage:
        "https://images.unsplash.com/photo-1515180711443-f8685c6d6a74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "make money",
      subtitle: "CASHOOZ",
      description:
        "💲Cashooz.com💰 is one of the web's leading rewards platforms, with a vibrant and rapidly growing community. It's a completely free program that lets you earn real money by completing everyday online tasks and activities. Whether you're browsing, shopping, or engaging with content, you can make money from home. Once you've earned, simply redeem your rewards through one of our supported payout methods—no personal investment required. Start earning today",
      link: "/register",
      rightImage: "https://i.ibb.co.com/ZLGm4Jn/Humaaans-Friend-Meeting.png",
    },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="w-full"
        autoplay={{
          delay: 3000, // Delay between slides in milliseconds
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
      >
        {swiperSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative min-h-[110vh] md:min-h-screen bg-cover">
              <img
                src={slide.backgroundImage}
                alt=""
                className="absolute w-full h-full object-cover top-0 left-0 z-10"
              />
              <div className="absolute w-full h-full top-0 left-0 z-20 bg-primaryColor bg-opacity-50 grid justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between px-16 py-20">
                  {/* Left Text Section */}
                  <div>
                    <h4 className="inline-block text-sm font-bold tracking-wide text-white bg-buttonBackground px-3 py-1 rounded-full">
                      {slide.subtitle}
                    </h4>
                    <h1 className="mt-2 text-5xl font-bold tracking-wide text-white">
                      {slide.title}
                    </h1>
                    <p className="text-sm text-justify mt-4 text-gray-300">
                      {slide.description}
                    </p>
                    <Link
                      to={slide.link}
                      className="inline-block mt-6 px-6 py-3 text-white bg-buttonBackground rounded-lg hover:bg-buttonBackground hover:bg-opacity-75"
                    >
                      Register Now
                    </Link>
                  </div>
                  {/* Decorative Right Section */}
                  <div className="hidden md:block">
                    <div className="w-72 h-auto ml-auto">
                      <img
                        src={slide.rightImage}
                        alt="Decoration"
                        className="w-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Additional slides can go here */}
      </Swiper>
    </div>
  );
};

export default Hero;
