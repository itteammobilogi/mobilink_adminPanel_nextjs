"use client";

import React from "react";

const BottomBannerCampaign = () => {
  return (
    <div className="relative bg-gray-300 bg-cover bg-center rounded-lg mx-auto my-8 max-w-5xl flex flex-col md:flex-row items-center p-6 md:p-12 shadow-lg overflow-hidden">
      {/* Floating Money Animation */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-12 h-6 bg-green-500 rounded-sm shadow-md opacity-80 animate-money-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          <span className="block w-full h-full text-white font-bold text-sm flex items-center justify-center">
            💵
          </span>
        </div>
      ))}

      {/* Illustration */}
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <img
          src="https://t4.ftcdn.net/jpg/02/79/27/95/360_F_279279575_2KJTS5s1QjBLWkueBteAwZsArMD3F9J7.jpg  "
          alt="Campaign Illustration"
          className="max-w-xs md:max-w-md"
        />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          The best way to understand Our Campaign is to try it!
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          It only takes 2 minutes to start earning...
        </p>
        <button className="px-6 py-3 bg-purple-800 text-white rounded-lg shadow hover:bg-purple-700 transition-all">
          Sign up for free
        </button>
      </div>
    </div>
  );
};

export default BottomBannerCampaign;
