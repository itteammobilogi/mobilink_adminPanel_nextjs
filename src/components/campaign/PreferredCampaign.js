// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { MdCampaign, MdSwipeLeftAlt, MdSwipeRightAlt } from "react-icons/md";
// import { useRouter } from "next/router";
// import Loader from "../loader/Loader";
// import Head from "next/head";

// const PreferredCampaigns = () => {
//   const [campaigns, setCampaigns] = useState([]); // Stores preferred campaigns
//   const [loading, setLoading] = useState(true);
//   const carouselRef = useRef(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8080/api/admin/campaign/getall/campaigns"
//         );
//         const result = await response.json();
//         if (response.ok) {
//           // Filter campaigns to include only preferred ones
//           const preferredCampaigns = result.data.filter(
//             (campaign) => campaign.preferred === "Yes"
//           );
//           setCampaigns(preferredCampaigns);
//         } else {
//           console.error("Error fetching campaigns:", result.message);
//         }
//       } catch (error) {
//         console.error("Error fetching campaigns:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCampaigns();
//   }, []);

//   const handleCardClick = (id) => {
//     router.push(`/admin/campaign/${id}`);
//   };

//   const scrollToNext = () => {
//     if (carouselRef.current) {
//       const itemWidth = carouselRef.current.children[0].offsetWidth;
//       const containerWidth = carouselRef.current.offsetWidth;
//       const totalItems = campaigns.length;
//       const visibleItems = Math.floor(containerWidth / itemWidth);
//       const maxSlide = totalItems - visibleItems;

//       const nextSlide = Math.min(currentSlide + 1, maxSlide);
//       carouselRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
//       setCurrentSlide(nextSlide);
//     }
//   };

//   const scrollToPrevious = () => {
//     if (carouselRef.current) {
//       const itemWidth = carouselRef.current.children[0].offsetWidth;
//       const prevSlide = Math.max(currentSlide - 1, 0);
//       carouselRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
//       setCurrentSlide(prevSlide);
//     }
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   if (campaigns.length === 0) {
//     return <p>No preferred campaigns available.</p>;
//   }

//   // Use the first preferred campaign for SEO purposes
//   const firstCampaign = campaigns[0];

//   return (
//     <>
//       <Head>
//         <title>{firstCampaign.campaignName} - Affiliate Campaign</title>
//         <meta
//           name="description"
//           content={`Join the ${firstCampaign.campaignName} affiliate campaign and earn up to ${firstCampaign.campaignPayout}% per sale.`}
//         />
//         <meta
//           name="keywords"
//           content={`${firstCampaign.campaignName}, affiliate campaign, top payouts`}
//         />
//         <meta
//           name="keywords"
//           content={`${firstCampaign.description}, affiliate campaign, top payouts`}
//         />
//       </Head>
//       <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 mt-5 mb-10">
//         {/* Header */}
//         <motion.div
//           className="flex items-center space-x-2 mb-6"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h2 className="text-2xl font-bold text-gray-800">
//             Preferred Campaigns
//           </h2>
//           <MdCampaign className="text-blue-600 text-3xl" />
//         </motion.div>

//         {/* Loader or Carousel */}
//         {loading ? (
//           <Loader />
//         ) : (
//           <div className="relative">
//             <div
//               ref={carouselRef}
//               className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
//             >
//               {campaigns.length > 0 ? (
//                 campaigns.map((campaign, index) => (
//                   <motion.article
//                     key={campaign._id}
//                     onClick={() => handleCardClick(campaign._id)}
//                     className="flex-shrink-0 snap-center w-64 h-72 bg-gradient-to-r from-[#C7C8CC] via-[#FFF7E6] to-[#F3D7CA] shadow-2xl rounded-lg pt-6 pb-6 px-5 flex flex-col items-center justify-between text-center cursor-pointer transform transition-transform duration-300 hover:rotate-3 hover:scale-110 hover:shadow-lg"
//                     initial={{ opacity: 0, scale: 0.8, y: 50 }}
//                     animate={{ opacity: 1, scale: 1, y: 0 }}
//                     transition={{
//                       duration: 0.6,
//                       delay: index * 0.2,
//                       ease: "easeOut",
//                     }}
//                     whileHover={{
//                       scale: 1.1,
//                       boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
//                     }}
//                   >
//                     {/* Campaign Image */}
//                     <div className="w-full h-40 flex items-center justify-center">
//                       <motion.img
//                         src={
//                           campaign.image
//                             ? `http://localhost:8080/uploads/${campaign.image}`
//                             : "fallback-image-path"
//                         }
//                         alt={`Campaign: ${campaign.campaignName}`}
//                         className="w-full h-20 object-contain"
//                         whileHover={{ scale: 0.95 }}
//                       />
//                     </div>
//                     {/* Campaign Name */}
//                     <h3 className="text-lg font-semibold text-gray-800 mt-2">
//                       {campaign.campaignName}
//                     </h3>
//                     {/* Campaign Payout */}
//                     <motion.button
//                       className="mt-2 py-2 px-3 text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow"
//                       whileHover={{ scale: 1.05 }}
//                     >
//                       Payout Up To: {campaign.campaignPayout} % Per Sale
//                     </motion.button>
//                     <script
//                       type="application/ld+json"
//                       dangerouslySetInnerHTML={{
//                         __html: JSON.stringify({
//                           "@context": "https://schema.org",
//                           "@type": "Offer",
//                           name: campaign.campaignName,
//                           description:
//                             "Exclusive affiliate campaign offering up to " +
//                             campaign.campaignPayout +
//                             "% per sale.",
//                           image: campaign.image
//                             ? `http://localhost:8080/uploads/${campaign.image}`
//                             : "fallback-image-path",
//                           url: `/admin/campaign/${campaign._id}`,
//                           price: `${campaign.campaignPayout}% Per Sale`,
//                         }),
//                       }}
//                     />
//                   </motion.article>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No preferred campaigns available.
//                 </p>
//               )}
//             </div>

//             {/* Navigation Buttons */}
//             <motion.button
//               onClick={scrollToPrevious}
//               className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 sm:left-[-2rem]"
//               whileTap={{ scale: 0.9 }}
//             >
//               <MdSwipeLeftAlt />
//             </motion.button>
//             <motion.button
//               onClick={scrollToNext}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 sm:right-[-2rem]"
//               whileTap={{ scale: 0.9 }}
//             >
//               <MdSwipeRightAlt />
//             </motion.button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default PreferredCampaigns;

// "use client";

export async function getServerSideProps() {
  const res = await fetch(
    "https://apimobilink.mobilogi.com/api/admin/campaign/getall/campaigns"
  );
  const result = await res.json();

  // Filter preferred campaigns
  const preferredCampaigns = result.data.filter(
    (campaign) => campaign.preferred === "Yes"
  );

  return {
    props: { campaigns: preferredCampaigns },
  };
}

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MdCampaign, MdSwipeLeftAlt, MdSwipeRightAlt } from "react-icons/md";
import { useRouter } from "next/router";
import Loader from "../loader/Loader";
import Head from "next/head";

const PreferredCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]); // Stores preferred campaigns
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(
          "https://apimobilink.mobilogi.com/api/admin/campaign/getall/campaigns"
        );
        const result = await response.json();
        if (response.ok) {
          const preferredCampaigns = result.data.filter(
            (campaign) => campaign.preferred === "Yes"
          );
          console.log("Preferred Campaigns:", preferredCampaigns);
          setCampaigns(preferredCampaigns);
        } else {
          console.error("Error fetching campaigns:", result.message);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/admin/campaign/${id}`);
  };

  const scrollToNext = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0].offsetWidth;
      const containerWidth = carouselRef.current.offsetWidth;
      const totalItems = campaigns.length;
      const visibleItems = Math.floor(containerWidth / itemWidth);
      const maxSlide = totalItems - visibleItems;

      const nextSlide = Math.min(currentSlide + 1, maxSlide);
      carouselRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
      setCurrentSlide(nextSlide);
    }
  };

  const scrollToPrevious = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0].offsetWidth;
      const prevSlide = Math.max(currentSlide - 1, 0);
      carouselRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
      setCurrentSlide(prevSlide);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (campaigns.length === 0) {
    return <p>No preferred campaigns available.</p>;
  }

  const campaignNames = campaigns
    .map((campaign) => campaign.campaignName)
    .join(", ");
  const campaignDescriptions = campaigns
    .map((campaign) => `${campaign.campaignName}: ${campaign.description}`)
    .join("; ");

  const jsonLdData = campaigns.map((campaign) => ({
    "@context": "https://schema.org",
    "@type": "Offer",
    name: campaign.campaignName,
    description: `Exclusive affiliate campaign offering up to ${campaign.campaignPayout}% per sale.`,
    image: campaign.image
      ? `https://apimobilink.mobilogi.com${campaign.image}`
      : "https://via.placeholder.com/150", // Use a valid fallback image URL
    url: `/admin/campaign/${campaign._id}`,
    price: `${campaign.campaignPayout}% Per Sale`,
  }));

  return (
    <>
      <Head>
        <title>Preferred Campaigns - Affiliate Programs</title>
        <meta
          name="description"
          content={`Explore the top affiliate campaigns. Featured campaigns: ${campaignDescriptions}`}
        />
        <meta
          name="keywords"
          content={`affiliate campaigns, preferred campaigns, ${campaignNames}`}
        />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData),
          }}
        />
      </Head>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 mt-5 mb-10">
        {/* Header */}
        <motion.div
          className="flex items-center space-x-2 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-gray-800">
            Preferred Campaigns
          </h2>
          <MdCampaign className="text-blue-600 text-3xl" />
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
          >
            {campaigns.map((campaign, index) => (
              <motion.article
                key={campaign._id}
                onClick={() => handleCardClick(campaign._id)}
                className="flex-shrink-0 snap-center w-64 h-72 bg-gradient-to-r from-[#C7C8CC] via-[#FFF7E6] to-[#F3D7CA] shadow-2xl rounded-lg pt-6 pb-6 px-5 flex flex-col items-center justify-between text-center cursor-pointer transform transition-transform duration-300 hover:rotate-3 hover:scale-110 hover:shadow-lg"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
                }}
              >
                {/* Campaign Image */}
                <div className="w-full h-40 flex items-center justify-center">
                  <motion.img
                    src={
                      campaign.image
                        ? `https://apimobilink.mobilogi.com${
                            campaign.image.startsWith("/")
                              ? campaign.image
                              : `/${campaign.image}`
                          }`
                        : "https://via.placeholder.com/150"
                    }
                    alt={`Campaign: ${campaign.campaignName}`}
                    className="w-full h-20 object-contain"
                    whileHover={{ scale: 0.95 }}
                  />
                </div>
                {/* Campaign Name */}
                <h3 className="text-lg font-semibold text-gray-800 mt-2">
                  {campaign.campaignName}
                </h3>
                {/* Campaign Payout */}
                <motion.button
                  className="mt-2 py-2 px-3 text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow border border-purple-600"
                  whileHover={{
                    scale: 1.02,
                    borderColor: "#A855F7",
                  }}
                  transition={{
                    scale: { duration: 0.5 },
                    borderColor: { duration: 0.8, delay: 0.7 },
                  }}
                >
                  Payout Up To: {campaign.campaignPayout} % Per Sale
                </motion.button>
              </motion.article>
            ))}
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={scrollToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 sm:left-[-2rem]"
            whileTap={{ scale: 0.9 }}
          >
            <MdSwipeLeftAlt />
          </motion.button>
          <motion.button
            onClick={scrollToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 sm:right-[-2rem]"
            whileTap={{ scale: 0.9 }}
          >
            <MdSwipeRightAlt />
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default PreferredCampaigns;
