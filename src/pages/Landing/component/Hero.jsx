import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeImage = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const h4Variant = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const pVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.6 } },
};

const buttonVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.8 } },
};

const h1Variant = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 20, transition: { duration: 0.5 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const Hero = () => {
  const swiperSlides = [
    {
      id: 1,
      backgroundImage:
        "https://images.unsplash.com/photo-1515180711443-f8685c6d6a74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Earn Points by Testing Apps, Games, and Surveys",
      subtitle: "CASHOOZ",
      description: "Test apps and games, answer surveys, and earn points to redeem for rewards and cash.",
      link: "/register",
      rightImage:
        "https://i.ibb.co.com/TW5gTCk/3-01.png",
    },
    {
      id: 2,
      backgroundImage:
        "https://images.unsplash.com/photo-1517097473408-c0d7983cb95c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Get Paid to Watch Videos",
      subtitle: "CASHOOZ",
      description: "Watch videos and get paid for your time, enjoying content while earning extra cash.",
      link: "/register",
      rightImage: "https://i.ibb.co.com/tmqgMm4/2-01.png",
    },
    {
      id: 3,
      backgroundImage:
        "https://images.unsplash.com/photo-1518183214770-9cffbec72538?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Get Paid for Completing Multiple Tasks",
      subtitle: "CASHOOZ",
      description: " Complete simple tasks like data entry, surveys, or testing apps to earn money and rewards.",
      link: "/register",
      rightImage: "https://i.ibb.co.com/pxPShpd/1-01.png",
    },
    {
      id: 4,
      backgroundImage:
        "https://images.unsplash.com/photo-1518183214770-9cffbec72538?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Claim Free Money Available to All",
      subtitle: "CASHOOZ",
      description: "Access offers that let anyone claim free money or rewards through easy online tasks.",
      link: "/register",
      rightImage: "https://i.ibb.co.com/JkdhHv8/4-01.png",
    },
    {
      id: 5,
      backgroundImage:
        "https://images.unsplash.com/photo-1518183214770-9cffbec72538?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Get Cash Back When You Shop Online",
      subtitle: "CASHOOZ",
      description: "Earn cashback on purchases when shopping through certain websites and apps.",
      link: "/register",
      rightImage: "https://i.ibb.co.com/wrv2stH/6-01.png",
    },
    {
      id: 6,
      backgroundImage:
        "https://images.unsplash.com/photo-1518183214770-9cffbec72538?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Finish More Tasks to Earn More Money",
      subtitle: "CASHOOZ",
      description: "The more tasks you complete, the more money you can make through various platforms and offers.",
      link: "/register",
      rightImage: "https://i.ibb.co.com/tXqzdP8/5-01.png",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="h-[70vh] md:h-screen flex items-center justify-center bg-gray-50">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="w-full"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Track active slide
      >
        {swiperSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[80vh] md:h-screen bg-cover">
              {/* Background Image with Fade */}
              <motion.img
                key={slide.id} // Re-trigger animation when slide changes
                src={slide.backgroundImage}
                alt=""
                className="absolute w-full h-full object-cover top-0 left-0 z-10"
                initial="hidden"
                animate={activeIndex === index ? "visible" : "hidden"}
                variants={fadeImage}
              />

              <div className="absolute w-full h-full top-0 left-0 z-20 bg-primaryColor bg-opacity-90 grid justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between px-16 py-20">
                  {/* Left Text Section with Separate Animations */}
                  <div
                    key={slide.id}
                    initial="hidden"
                    animate={activeIndex === index ? "visible" : "hidden"}
                  >
                    
                    <motion.h1
                      initial="hidden"
                      animate={activeIndex === index ? "visible" : "hidden"}
                      variants={h1Variant}
                      className="mt-2 mb-7 text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white break-words"
                    >
                      {slide.title}
                     
                    </motion.h1>
                    <motion.p
                      initial="hidden"
                      animate={activeIndex === index ? "visible" : "hidden"}
                      variants={pVariant}
                      className="text-sm text-justify mt-4 text-gray-300"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      initial="hidden"
                      animate={activeIndex === index ? "visible" : "hidden"}
                      variants={buttonVariant}
                    >
                      <Link
                        to={slide.link}
                        className="inline-block mt-6 px-6 py-3 text-white bg-buttonBackground rounded-lg hover:bg-buttonBackground hover:bg-opacity-75"
                      >
                        Register Now
                      </Link>
                    </motion.div>
                  </div>

                  {/* Decorative Right Section with Fade-In */}
                  <div className="hidden md:block">
                    <motion.div
                      key={slide.id} // Ensures animation runs on each slide change
                      className="w-full ml-auto"
                      initial="hidden"
                      animate={activeIndex === index ? "visible" : "hidden"}
                      variants={fadeImage}
                    >
                      <img
                        src={slide.rightImage}
                        alt="Decoration"
                        className="w-full object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
