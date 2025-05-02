import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How to Make Money on Cashooz?",
    answer:
      `
      <p>Cashooz.com partners with companies looking to promote their apps, surveys, and products. Tasks on the site can include actions like downloading an app and reaching a certain level, such as level 5, within a day to earn 2000 CZ.</p>
      <p> To get started, simply choose an offer or survey. We recommend checking out the featured offers at the top of the offer page—these tasks are easy to complete, and many users have successfully finished them in the past.</p>
      <p> Once you complete a task, you’ll earn CZ. (1000 CZ equals $1.00). You can then cash out your CZ for rewards like PayPal, Bitcoin, Litecoin, Ethereum and various other gift card options.</p>
      `,
  },
  {
    question: "How much can you actually earn on Cashooz?  ",
    answer:
      "Earning over $200 per month on cashooz is definitely achievable, and some users even make $1000+ monthly. You can take a look at the leaderboard to see how much the most active users are making.",
  },
  {
    question: "How long does it take to withdraw your earnings?",
    answer:
      "At Cashooz.com, we provide live support 24/7. Our team is always available, and you can reach us anytime through the Contact Us section. Once you submit a withdrawal request, it is reviewed by our team. After verification, it is usually approved and processed within an hour.",
  },
  {
    question: "Is Cashooz free to use? ",
    answer:
      "Yes, it is completely free to use. While some high-reward tasks or games may require purchases to participate, these are completely optional.",
  },
  {
    question: "What is the minimum withdrawal limit on Cashooz?  ",
    answer:
      "For new users, the payout threshold is $5. After receiving their first payout, it decreases to $0.50. Active users generally reach this threshold within a few days.",
  },
  {
    question: "Does Cashooz have a referral program?   ",
    answer:
      "Yes, Cashooz has a referral program that allows users to earn commissions based on the earnings of those they refer. With a 15% referral commission, you can earn rewards from both the people you refer and any advertising deposits they make. However, users are not allowed to sign up through their own referral link to earn commissions from their own activities.",
  },
  {
    question: "How does Cashooz pay its users?",
    answer: `
      <ul>
        <li><strong>Users complete tasks from advertisers:</strong> Advertisers offer a variety of tasks for users, such as downloading apps, signing up for websites, watching videos, reaching certain levels in games, and more.</li>
        <li><strong>Advertisers pay Cashooz for promotions:</strong> For each completed task, advertisers pay Cashooz a commission.</li>
        <li><strong>Cashooz sends payouts to users:</strong> Once all task requirements are met, Cashooz processes and sends the user their payout.</li>
      </ul>
    `,
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="bg-primaryColor">
       <Helmet>
                    <title>FAQ | Cashooz</title>
                    <meta name="description" content="Describe this page content" />
                    <link rel="canonical" href="https://www.cashooz.com/faq" />
                  </Helmet>
      <div className="max-w-2xl mx-auto py-10 px-5 sm:px-10">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-md"
            >
              <button
                className="w-full flex justify-between items-center p-4 bg-secondaryColor hover:bg-buttonBackground text-white font-medium text-left transition duration-300"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <div
                className={`transition-all overflow-y-auto ${
                  openIndex === index ? "max-h-40 p-4" : "max-h-0"
                }`}
              >
               <div className="text-white " />
               <p dangerouslySetInnerHTML={{ __html: faq.answer }} className="text-white"></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
