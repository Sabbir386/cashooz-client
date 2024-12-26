import React from 'react';

const Features = () => {
    const features = [
        {
          title: "LOYALTY BONUS",
          description:
            "Login each day to boost your loyalty bonus all the way to 100%.",
          icon: "🎯", // Replace with actual icons if needed
        },
        {
          title: "REWARD POINTS",
          description:
            "Earn reward points by completing tasks and boosting your level. Cash in reward points for real prizes.",
          icon: "💎",
        },
        {
          title: "FAST PAYMENTS",
          description:
            "Withdraw your Coins any time to FaucetHub or your Bitcoin or Doge Wallet.",
          icon: "⚡",
        },
        {
          title: "EARN INTEREST",
          description:
            "Earn 5% interest on your Coin balance when you reach 35,000 Coins.",
          icon: "💰",
        },
        {
          title: "MULTIPLY YOUR COINS",
          description:
            "Play our unique sci-fi themed multiplier game to boost your Coin balance.",
          icon: "🎮",
        },
        {
          title: "EXPERT SUPPORT",
          description:
            "Our support team is the best in the business and is always available to help.",
          icon: "🛠️",
        },
        {
          title: "DEPOSIT COINS",
          description:
            "Send Bitcoin directly to your Cointiply account to earn even more interest.",
          icon: "💵",
        },
        {
          title: "COMMUNITY",
          description:
            "Chat & share your progress with other like-minded Cointiply users.",
          icon: "🤝",
        },
        {
          title: "25% FOR REFERRALS",
          description:
            "Earn 25% of all your referrals claims and 10% of their offer earnings.",
          icon: "👥",
        },
      ];
    return (
        <div className="bg-gray-100 py-12">
        {/* Section Header */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          COINTIPLY FEATURES
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-white rounded-lg shadow-md"
            >
              {/* Icon */}
              <div className="text-pink-500 text-3xl mr-4">{feature.icon}</div>
              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Features;