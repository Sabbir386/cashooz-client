import React, { useState } from "react";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { Link } from "react-router-dom";

const categories = [
  { label: "General Inquiries", icon: "🟠" },
  { label: "ZenHub Features", icon: "🔵" },
  { label: "Permissions & Privacy", icon: "🟣" },
  { label: "Pricing & Plans", icon: "🟢" },
  { label: "ZenHub Enterprise", icon: "⚫" },
];

const faqs = {
  "General Inquiries": [
    {
      question: "What is ZenHub?",
      answer: "ZenHub is a project management tool for GitHub.",
    },
    {
      question: "Is ZenHub available on browsers other than Chrome?",
      answer: "Yes, it supports Firefox too.",
    },
    {
      question: "How do I know that ZenHub is installed?",
      answer: "You'll see the ZenHub icon in your browser.",
    },
    {
      question:
        "If I use Chrome and Firefox, do I have to download ZenHub twice?",
      answer: "Yes, you need to install it on each browser.",
    },
    {
      question: "How do I know if I have the latest version?",
      answer: "Check the extension settings and enable auto-update.",
    },
    {
      question: "What happens if I am on a computer without ZenHub installed?",
      answer: "You won't see the ZenHub features in GitHub.",
    },
    {
      question: "How do I invite others to use ZenHub on my repo?",
      answer: "You can invite them through the ZenHub dashboard.",
    },
  ],
  "ZenHub Features": [
    {
      question: "What is ZenHub?",
      answer: "ZenHub is a project management tool for GitHub.",
    },
    {
      question: "Is ZenHub available on browsers other than Chrome?",
      answer: "Yes, it supports Firefox too.",
    },
    {
      question: "How do I know that ZenHub is installed?",
      answer: "You'll see the ZenHub icon in your browser.",
    },
    {
      question:
        "If I use Chrome and Firefox, do I have to download ZenHub twice?",
      answer: "Yes, you need to install it on each browser.",
    },
    {
      question: "How do I know if I have the latest version?",
      answer: "Check the extension settings and enable auto-update.",
    },
    {
      question: "What happens if I am on a computer without ZenHub installed?",
      answer: "You won't see the ZenHub features in GitHub.",
    },
    {
      question: "How do I invite others to use ZenHub on my repo?",
      answer: "You can invite them through the ZenHub dashboard.",
    },
  ],

  // Other categories can be filled similarly...
};

export default function Faq() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto min-h-screen mt-16">
        <h1 className="text-2xl font-semibold py-6 text-center">
          Frequently Asked Questions
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-xl shadow p-4">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(null);
                }}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg mb-2 text-sm font-medium ${
                  selectedCategory === cat
                    ? "bg-orange-100 text-orange-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="flex-1 bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600 flex items-center gap-2">
              {/* <MdOutlineQuestionAnswer /> */}
              {selectedCategory.icon}
              {selectedCategory.label}
            </h2>
            {faqs[selectedCategory.label]?.map((item, index) => (
              <div key={index} className="border-b last:border-none py-3">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex justify-between items-center w-full text-left font-medium text-gray-800"
                >
                  {item.question}
                  <span>{openIndex === index ? "−" : "+"}</span>
                </button>
                {openIndex === index && (
                  <>
                    <p className="text-sm text-gray-600 mt-2">{item.answer} <Link to="faq/" className="text-sm text-blue-600 mt-2">
                      Read More..
                    </Link></p>
                   
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
