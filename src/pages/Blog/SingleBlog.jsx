import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaLongArrowAltRight,
  FaUserAlt,
  FaRegClock,
  FaRegComments,
} from "react-icons/fa";
import { blogPosts } from "../../constants";
import { Link } from "react-router-dom";

const SingleBlog = () => {
  return (
    <div className="bg-white md:pt-24 pt-16 px-4">
      {/* section header  */}
      <div className="bg-[#072B5A] text-white p-6 md:p-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
          {/* Left Section */}
          <div className="mb-8 md:mb-0">
            <p className="text-[#48A9FE] text-sm md:text-base font-medium mb-2">
              Technology
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              An Extraordinary WebGL Has <br className="hidden md:block" /> Been
              Released By Great
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex flex-col md:items-end items-start gap-4">
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="bg-[#3A3D63] p-3 rounded-full hover:bg-[#555875] transition"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-[#48A9FE] p-3 rounded-full hover:bg-[#3290dc] transition"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-[#3A3D63] p-3 rounded-full hover:bg-[#555875] transition"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <span className="border-t-[15px] border-l-[10px] border-r-[10px] border-t-[#FF6B6B] border-l-transparent border-r-transparent"></span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Anna Anderson"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">Anna Anderson</p>
                <p className="text-sm text-gray-300">Jun 27, 2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* blog deatils  */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Category Label */}
        <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          FASHION
        </span>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2 leading-tight">
          Secrets Your Parents Never Told You About Fashion
        </h1>

        {/* Metadata */}
        <div className="flex items-center flex-wrap gap-4 text-gray-500 text-sm mb-6">
          <div className="flex items-center gap-2">
            <FaUserAlt className="text-xs" /> <span>John Doe</span>
          </div>
          <div className="flex items-center gap-2">
            <span>12 August 2020</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegComments className="text-xs" /> <span>0 Comments</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegClock className="text-xs" /> <span>5 Minutes Read</span>
          </div>
        </div>

        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
          alt="Fashion Model"
          className="w-full h-auto rounded-lg mb-6"
        />

        {/* Article Content */}
        <div className="text-gray-700 space-y-6 text-sm md:text-base">
          <p>
            Aenean vitae mattis elit. Aenean justo lacus, mollis sit amet
            molestie, aliquam id enim sit amet est tristique. fringilla sapien
            at, laoreet elit. Suspendisse tristique nibh at felis bibendum, eu
            maximus ex dignissim.
          </p>
          <p>
            Nullam cursus elit lacus. Sed purus odio, scelerisque nec mauris
            vitae, tristique interdum diam. Maecenas faucibus justo id finibus
            egestas. Curabitur vitae scelerisque mauris. Suspendisse potenti
            lacinia Nullam ullamcorper quam quis nulla ultricies, eget porta
            lacus tempus.
          </p>
          <blockquote className="border-l-4 border-gray-400 bg-gray-100 italic px-4 py-2">
            Pellentesque tincidunt malesuada nunc dapibus purusd dictum ide
            proin a turpis tempus, ullamcorper id dui faucibus semper quam acca
            erat convallis volutpat duis feugiat
          </blockquote>
          <p>
            Aenean vitae mattis elit. Aenean justo lacus, mollis sit amet
            molestie, aliquam id enim sit amet est tristique. fringilla sapien
            at, laoreet elit.
          </p>
          <h2 className="text-xl font-semibold mt-6">
            The Ultimate Guide To Fashion
          </h2>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae! Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam metus nec tristique pulvinar nibh, non
            suscipit arcu pulvinar odio.
          </p>
        </div>
      </div>
      {/* blog grid post  */}
      <div className="w-full max-w-6xl mx-auto p-4">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center py-5">
          Related Posts
        </h2>
      </div>
      <div className="w-full max-w-6xl mx-auto p-4 grid gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            to={`/blog/${post.id}`}
            key={post.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {/* Image */}
            <div className="relative group">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 flex items-center justify-center">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  {/* <ArrowUpRight size={20} /> */}
                  <FaLongArrowAltRight size={20} />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-green-500 font-medium">
                {post.category}
              </p>
              <h3 className="text-lg font-bold text-gray-900 mt-1">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm mt-2">{post.description}</p>
              <div className="flex items-center mt-4">
                <img
                  src={post.authorImg}
                  alt={post.author}
                  className="w-8 h-8 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {post.author}
                  </p>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SingleBlog;
