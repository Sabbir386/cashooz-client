import { image } from "d3";
import React, { useState } from "react";
import { FaLongArrowAltRight, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { blogPosts, categories } from "../../constants";



const Blog = () => {
  const [selected, setSelected] = useState("All");
  return (
    <div className="bg-white md:pt-24 pt-16 px-4">
      <div className="w-full flex flex-col items-center ">
        {/* Header */}
        <div className="w-full bg-[#8b3dff] rounded-[40px] py-12 px-4 flex flex-col items-center relative">
          <h1 className="text-white text-4xl font-bold relative z-10">Blog</h1>
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-6 h-6 border-4 border-cyan-300 rounded-full" />
          <div className="absolute top-12 right-16 w-6 h-6 border-4 border-cyan-300 rounded-full" />
          <div className="absolute top-16 right-1/2 translate-x-1/2 text-cyan-300 text-3xl">
            ~
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-[-30px] w-full max-w-xl bg-white rounded-xl shadow-lg px-6 py-3 flex items-center relative z-20">
          {/* <Search className="text-gray-500 mr-3" /> */}
          <FaSearch className="text-gray-500 mr-3" />

          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none text-gray-700"
          />
        </div>

        {/* Category Tabs */}
        <div className="my-6 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selected === cat ? "bg-green-500 text-white" : "text-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/*Featured Blog*/}
        <div className="w-full max-w-6xl mx-auto p-4">
          <Link to={"/blog/1"} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row items-stretch">
            {/* Blog Image */}
            <div className="md:w-1/2 w-full">
              <img
                src="https://images.unsplash.com/photo-1726056652641-de93ec003289?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Blog Visual"
                className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
              />
            </div>

            {/* Blog Content */}
            <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
              <div>
                <p className="text-sm text-green-500 font-medium">Technology</p>
                <h2 className="text-2xl font-bold text-gray-900 leading-snug mt-2">
                  An Extraordinary WebGL Has Been Released By Great China
                  Scientists
                </h2>
                <p className="text-gray-500 text-sm mt-3">
                  Back in 2019, Gucci brought video games to its app with a new
                  section called Gucci Arcade, inspired by creative director
                  Alessandro Michele’s unique ability to combine the. Gucci
                  brought video games to its app with a new section called Gucci
                  Arcade, inspired by creative director Alessandro Michele’s
                  unique ability to combine the.Gucci brought video games to its
                  app with a new section called Gucci Arcade, inspired by
                  creative director Alessandro Michele’s unique ability to
                  combine the.Gucci brought video games to its app with a new
                  section called Gucci Arcade, inspired by creative director
                  Alessandro Michele’s unique ability to combine the...
                </p>
              </div>
              {/* Author Info */}
              <div className="flex items-center mt-6">
                <img
                  src="https://images.unsplash.com/photo-1718900109613-457f76a456b2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Author"
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Mohammad Reza
                  </p>
                  <p className="text-sm text-gray-500">Jun 27, 2021</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        {/* blog grid post  */}
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
    </div>
  );
};

export default Blog;
