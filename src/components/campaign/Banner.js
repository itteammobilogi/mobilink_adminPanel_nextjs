"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function BannerCampaign() {
  const [currentWord, setCurrentWord] = useState(0);

  const words = ["Explore", "Thousands", "of Exclusive", "Campaigns"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 500);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      className="py-16 px-5"
      style={{
        backgroundImage:
          "linear-gradient(76deg, rgb(130 193 122) 10%, #d2c999 80.51%)",
        backgroundColor: "#f9f9f9", // Off-white bottom section
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Breadcrumb */}
      <nav className="text-gray-800 text-sm mb-4 flex items-center space-x-2 px-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold">Campaigns</span>
      </nav>

      {/* Spacer to Add More Space from Breadcrumb */}
      <div className="mt-8"></div>

      {/* Centered Content */}
      <div className="text-center text-gray-800">
        {/* Heading Section */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          {words.map((word, index) => (
            <span
              key={index}
              className={`inline-block transition-transform duration-500 ${
                index <= currentWord
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>
        <p className="text-base sm:text-lg max-w-full sm:max-w-3xl mx-auto px-2 sm:px-4">
          Discover top affiliate programs and grow your earnings. Compare
          categories, explore commission rates, and unlock incredible
          opportunities tailored just for you.
        </p>

        {/* Optional Line Decoration */}
        <div className="mt-4 flex justify-center animate-pulse">
          <div className="h-1 w-20 bg-yellow-400 rounded"></div>
        </div>
      </div>
    </div>
  );
}

//2nd one

// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// export default function BannerCampaign() {
//   const [currentWord, setCurrentWord] = useState(0);

//   const words = ["Explore", "Thousands", "of Exclusive", "Campaigns"];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentWord((prev) => (prev < words.length - 1 ? prev + 1 : prev));
//     }, 1000); // Adjust interval timing as needed
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className="py-16 px-5 dynamic-gradient"
//       style={{
//         backgroundColor: "#f9f9f9", // Off-white bottom section
//         backgroundBlendMode: "overlay",
//       }}
//     >
//       {/* Breadcrumb */}
//       <nav className="text-gray-800 text-sm mb-4 flex items-center space-x-2 px-4">
//         <Link href="/" className="hover:underline link">
//           Home
//         </Link>
//         <span className="mx-2">/</span>
//         <span className="font-semibold">Campaigns</span>
//       </nav>

//       {/* Spacer */}
//       <div className="mt-8"></div>

//       {/* Centered Content */}
//       <div className="text-center text-gray-800">
//         {/* Heading Section */}
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
//           {words.map((word, index) => (
//             <span
//               key={index}
//               className={`inline-block ${
//                 index === currentWord
//                   ? "opacity-100 animate-fadeInOut"
//                   : "opacity-0"
//               }`}
//               style={{
//                 color: index === words.length - 1 ? "#ff7a00" : "#333", // Highlight last word
//               }}
//             >
//               {word}&nbsp;
//             </span>
//           ))}
//         </h1>
//         <p className="text-base sm:text-lg max-w-full sm:max-w-3xl mx-auto px-2 sm:px-4">
//           Discover top affiliate programs and grow your earnings. Compare
//           categories, explore commission rates, and unlock incredible
//           opportunities tailored just for you.
//         </p>

//         {/* Optional Line Decoration */}
//         <div className="mt-4 flex justify-center animate-pulse">
//           <div className="h-1 w-20 bg-yellow-400 rounded"></div>
//         </div>

//         {/* Call-to-Action Button */}
//         <div className="mt-6">
//           <button className="px-6 py-3 bg-yellow-400 text-white rounded shadow-lg hover:bg-yellow-500 hover:shadow-2xl transition-all">
//             Start Exploring
//           </button>
//         </div>
//       </div>

//       {/* Wave Divider */}
//       <div className="wave-divider">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1440 320"
//           className="w-full"
//         >
//           <path
//             fill="#f9f9f9"
//             fillOpacity="1"
//             d="M0,192L48,213.3C96,235,192,277,288,261.3C384,245,480,171,576,154.7C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
//           ></path>
//         </svg>
//       </div>
//     </div>
//   );
// }

///3rd one

// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// export default function BannerCampaign() {
//   const [currentWord, setCurrentWord] = useState(0);

//   const words = ["Explore", "Thousands", "of Exclusive", "Campaigns"];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentWord((prev) => (prev < words.length - 1 ? prev + 1 : prev));
//     }, 1200); // Adjust interval timing as needed
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className="relative overflow-hidden py-16 px-5 text-gray-800" // Updated text color
//       style={{
//         background: "linear-gradient(to right, #ff7e5f, #feb47b)", // Bright gradient
//       }}
//     >
//       {/* Breadcrumb */}
//       <nav className="relative z-10 text-sm mb-4 flex items-center space-x-2 px-4">
//         <Link href="/" className="hover:underline text-gray-700">
//           Home
//         </Link>
//         <span className="mx-2 text-gray-500">/</span>
//         <span className="font-semibold text-gray-900">Campaigns</span>
//       </nav>

//       {/* Centered Content */}
//       <div className="relative z-10 text-center">
//         {/* Heading Section */}
//         <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
//           {words.map((word, index) => (
//             <span
//               key={index}
//               className={`inline-block transition-opacity duration-700 ${
//                 index === currentWord
//                   ? "opacity-100 scale-105"
//                   : "opacity-0 scale-90"
//               }`}
//               style={{
//                 transitionDelay: `${index * 300}ms`,
//                 display: "inline-block",
//               }}
//             >
//               {word}&nbsp;
//             </span>
//           ))}
//         </h1>

//         {/* Description */}
//         <p className="text-base sm:text-lg lg:text-xl max-w-xl mx-auto mb-8 leading-relaxed text-gray-800">
//           Discover top affiliate programs and grow your earnings. Compare
//           categories, explore commission rates, and unlock incredible
//           opportunities tailored just for you.
//         </p>

//         {/* Call-to-Action Buttons */}
//         <div className="mt-8 flex justify-center space-x-4">
//           <button className="px-8 py-3 text-lg font-medium bg-yellow-400 text-black rounded-lg shadow-lg hover:bg-yellow-500 hover:shadow-2xl transition-transform transform hover:-translate-y-1">
//             Get Started
//           </button>
//           <button className="px-8 py-3 text-lg font-medium bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 hover:shadow-2xl transition-transform transform hover:-translate-y-1">
//             Learn More
//           </button>
//         </div>
//       </div>

//       {/* Decorative SVG Waves */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
//         <svg
//           viewBox="0 0 1200 120"
//           xmlns="http://www.w3.org/2000/svg"
//           className="relative block w-full"
//         >
//           <path
//             d="M0,96L120,85.3C240,75,480,53,720,48C960,43,1200,53,1440,69.3L1440,320L1200,320C960,320,720,320,480,320C240,320,0,320,0,320Z"
//             fill="#f9f9f9"
//           ></path>
//         </svg>
//       </div>
//     </div>
//   );
// }

// 4ht one

// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// export default function BannerCampaign() {
//   const [currentWord, setCurrentWord] = useState(0);

//   const words = ["Explore", "Thousands", "of Exclusive", "Campaigns"];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentWord((prev) => (prev < words.length - 1 ? prev + 1 : prev));
//     }, 1200); // Adjust interval timing as needed
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className="relative overflow-hidden py-16 px-5 text-gray-800"
//       style={{
//         background: "linear-gradient(to right, #ff7e5f, #feb47b)", // Vibrant gradient background
//       }}
//     >
//       {/* Floating Particles */}
//       <div className="absolute inset-0 z-0">
//         {Array.from({ length: 20 }).map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-pulse"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${i * 0.5}s`,
//             }}
//           ></div>
//         ))}
//       </div>

//       {/* Breadcrumb */}
//       <nav
//         className="relative z-10 text-sm mb-4 flex items-center space-x-2 px-4"
//         style={{ animation: "fadeIn 1s ease-in-out" }}
//       >
//         <Link href="/" className="hover:underline text-gray-700">
//           Home
//         </Link>
//         <span className="mx-2 text-gray-500">/</span>
//         <span className="font-semibold text-gray-900">Campaigns</span>
//       </nav>

//       {/* Centered Content */}
//       <div
//         className="relative z-10 text-center bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-lg"
//         style={{ animation: "slideInUp 1.2s ease-in-out" }}
//       >
//         {/* Dynamic Heading */}
//         <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-gray-900">
//           {words.map((word, index) => (
//             <span
//               key={index}
//               className={`inline-block transition-opacity duration-700 ${
//                 index === currentWord
//                   ? "opacity-100 scale-105 text-yellow-500"
//                   : "opacity-0 scale-90"
//               }`}
//               style={{
//                 transitionDelay: `${index * 300}ms`,
//                 display: "inline-block",
//               }}
//             >
//               {word}&nbsp;
//             </span>
//           ))}
//         </h1>

//         {/* Description */}
//         <p className="text-base sm:text-lg lg:text-xl max-w-xl mx-auto mb-8 leading-relaxed text-gray-800">
//           Discover top affiliate programs and grow your earnings. Compare
//           categories, explore commission rates, and unlock incredible
//           opportunities tailored just for you.
//         </p>

//         {/* Call-to-Action Buttons */}
//         <div className="mt-8 flex justify-center space-x-4">
//           <button className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-lg shadow-lg hover:scale-105 transition-transform transform">
//             Get Started
//           </button>
//           <button className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg shadow-lg hover:scale-105 transition-transform transform">
//             Learn More
//           </button>
//         </div>
//       </div>

//       {/* Enhanced SVG Waves */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
//         <svg
//           viewBox="0 0 1200 120"
//           xmlns="http://www.w3.org/2000/svg"
//           className="relative block w-full"
//           style={{
//             animation: "wave 6s infinite linear",
//           }}
//         >
//           <path
//             d="M0,96L120,85.3C240,75,480,53,720,48C960,43,1200,53,1440,69.3L1440,320L1200,320C960,320,720,320,480,320C240,320,0,320,0,320Z"
//             fill="#f9f9f9"
//           ></path>
//         </svg>
//       </div>

//       {/* Parallax Background */}
//       <div
//         className="absolute inset-0"
//         style={{
//           zIndex: -1,
//           background: "linear-gradient(to right, #feb47b, #ff7e5f)",
//         }}
//       ></div>
//     </div>
//   );
// }

// 5h one

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";

// export default function BannerCampaign() {
//   const words = ["Explore", "Thousands", "of Exclusive", "Campaigns"];
//   const [currentWord, setCurrentWord] = useState(0); // Start with the first word

//   // Cycle through words every 1.5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentWord((prev) => (prev + 1) % words.length); // Loop through words
//     }, 1500); // 1.5 seconds interval
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className="relative overflow-hidden py-16 px-5 text-gray-800"
//       style={{
//         background: "linear-gradient(10deg,rgb(247, 205, 195), #feb47b)",
//         backgroundSize: "200% 200%",
//         animation: "backgroundAnimation 5s ease infinite",
//       }}
//     >
//       {/* Breadcrumb */}
//       <nav className="relative z-10 text-sm mb-4 flex items-center space-x-2 px-4">
//         <Link href="/" className="hover:underline text-gray-700">
//           Home
//         </Link>
//         <span className="mx-2 text-gray-500">/</span>
//         <span className="font-semibold text-gray-900">Campaigns</span>
//       </nav>

//       {/* Centered Content */}
//       <div
//         className="relative z-10 text-center bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-lg"
//         style={{
//           animation: "fadeIn 1s ease-in-out", // Fade in animation for content
//         }}
//       >
//         {/* Heading with word animation */}
//         <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
//           {words.map((word, index) => (
//             <span
//               key={index}
//               className={`inline-block transition-all duration-1000 ease-in-out ${
//                 index === currentWord
//                   ? "opacity-100 transform translate-y-0"
//                   : "opacity-0 transform translate-y-10"
//               }`}
//             >
//               {word}
//             </span>
//           ))}
//         </h1>

//         {/* Description */}
//         <p className="text-base sm:text-lg lg:text-xl max-w-xl mx-auto mb-8 leading-relaxed text-gray-800">
//           Discover top affiliate programs and grow your earnings. Compare
//           categories, explore commission rates, and unlock incredible
//           opportunities tailored just for you.
//         </p>

//         {/* Call-to-Action Buttons */}
//         <div className="mt-8 flex justify-center space-x-4">
//           <button className="relative px-8 py-3 text-lg font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden">
//             Get Started
//           </button>
//           <button className="relative px-8 py-3 text-lg font-medium bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden">
//             Learn More
//           </button>
//         </div>
//       </div>

//       {/* SVG Waves with animation */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
//         <svg
//           viewBox="0 0 1200 120"
//           xmlns="http://www.w3.org/2000/svg"
//           className="relative block w-full"
//           style={{
//             animation: "waveAnimation 4s ease-in-out infinite", // SVG wave animation
//           }}
//         >
//           <path
//             d="M0,120 C300,80 900,200 1200,80 L1200,200 L0,200 Z"
//             fill="#ffffff"
//           ></path>
//         </svg>
//       </div>
//     </div>
//   );
// }
