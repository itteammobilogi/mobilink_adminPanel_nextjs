// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Loader from "../loader/Loader";
// import { useRouter } from "next/router";
// import { FaCopy } from "react-icons/fa";
// import { toast } from "react-toastify";

// const AllCampaigns = () => {
//   const [allCampaigns, setAllCampaigns] = useState([]);
//   const [filteredCampaigns, setFilteredCampaigns] = useState([]);
//   const [campaignTypes, setCampaignTypes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All Objectives");
//   const [selectedCountry, setSelectedCountry] = useState("All Countries");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [itemsPerPage] = useState(5); // Items per page
//   const [currentPage, setCurrentPage] = useState(1);
//   const router = useRouter();

//   const handleRowClick = (id) => {
//     if (id) {
//       router.push(`/admin/campaign/${id}`);
//     } else {
//       console.error("Campaign ID is undefined");
//     }
//   };

//   const fetchCampaigns = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/api/admin/campaign/getall/campaigns"
//       );

//       if (response.data) {
//         setAllCampaigns(response.data.data);
//         setFilteredCampaigns(response.data.data);

//         if (response.data.campaignTypes) {
//           setCampaignTypes(response.data.campaignTypes);
//         }
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "Error fetching campaigns");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCampaigns();
//   }, []);

//   useEffect(() => {
//     // Filter campaigns locally based on search term, category, and country
//     let filtered = allCampaigns;

//     if (searchTerm) {
//       filtered = filtered.filter((campaign) =>
//         campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (selectedCategory !== "All Objectives") {
//       filtered = filtered.filter(
//         (campaign) => campaign.campaignType === selectedCategory
//       );
//     }

//     if (selectedCountry !== "All Countries") {
//       filtered = filtered.filter(
//         (campaign) => campaign.geo === selectedCountry
//       );
//     }

//     setFilteredCampaigns(filtered);
//     setCurrentPage(1); // Reset to the first page when filters change
//   }, [searchTerm, selectedCategory, selectedCountry, allCampaigns]);

//   const trimLink = (link) => {
//     try {
//       const url = new URL(link);
//       return url.hostname;
//     } catch (error) {
//       return link;
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       toast.success("Preview Link copied to clipboard!");
//     });
//   };

//   const displayedCampaigns = filteredCampaigns.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

//   return (
//     <div className="w-full max-w-6xl mx-auto text-center px-4">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">All Campaigns</h1>

//       <div className="flex justify-between items-center gap-4 mb-6 flex-wrap">
//         {/* Search Bar */}
//         <input
//           type="text"
//           placeholder="Search for Flipkart or Electronics or CPI etc."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-1 min-w-[250px] basis-[30%] py-2 px-4 border border-yellow-400 rounded-lg focus:outline-none focus:ring focus:ring-yellow-300 text-sm"
//         />

//         {/* Category Dropdown */}
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="flex-1 min-w-[250px] basis-[30%] py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 text-sm"
//         >
//           <option value="All Objectives">All Objectives</option>
//           {campaignTypes.map((type, index) => (
//             <option key={index} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>

//         {/* Country Dropdown */}
//         <select
//           value={selectedCountry}
//           onChange={(e) => setSelectedCountry(e.target.value)}
//           className="flex-1 min-w-[250px] basis-[30%] py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 text-sm"
//         >
//           <option value="All Countries">All Countries</option>
//           <option value="India">India</option>
//           <option value="USA">USA</option>
//           <option value="UK">UK</option>
//         </select>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <>
//           <div className="bg-white shadow rounded-lg overflow-x-auto">
//             <table className="w-full text-left border-collapse min-w-[600px]">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="py-3 px-4">Campaign Name</th>
//                   <th className="py-3 px-4">Category</th>
//                   <th className="py-3 px-4">Type</th>
//                   <th className="py-3 px-4">Commission</th>
//                   <th className="py-3 px-4">Preview Link</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {displayedCampaigns.length > 0 ? (
//                   displayedCampaigns.map((campaign, index) => (
//                     <tr
//                       key={index}
//                       className="hover:bg-gray-100 cursor-pointer"
//                       onClick={() => handleRowClick(campaign._id)}
//                     >
//                       <td className="py-3 px-4 flex items-center">
//                         <img
//                           src={
//                             campaign.image
//                               ? `http://localhost:8080/uploads/${campaign.image}`
//                               : "fallback-image-path"
//                           }
//                           alt={campaign.campaignName}
//                           className="w-12 h-10 rounded-full mr-3"
//                         />
//                         {campaign.campaignName}
//                       </td>
//                       <td className="py-3 px-4">{campaign.campaignCategory}</td>
//                       <td className="py-3 px-4">{campaign.campaignType}</td>
//                       <td className="py-3 px-4 text-green-600 font-semibold">
//                         {campaign.campaignPayout}%
//                       </td>
//                       <td className="py-3 px-4 flex items-center gap-2">
//                         <a
//                           href={campaign.previewLink}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 underline font-semibold"
//                         >
//                           {trimLink(campaign.previewLink)}
//                         </a>
//                         <FaCopy
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             copyToClipboard(campaign.previewLink);
//                           }}
//                           className="text-gray-500 hover:text-black cursor-pointer"
//                           title="Copy to clipboard"
//                         />
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center py-6 text-gray-500">
//                       No campaigns available.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-between items-center mt-4">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`py-2 px-4 rounded-md text-sm font-medium ${
//                 currentPage === 1
//                   ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                   : "bg-yellow-400 text-white hover:bg-yellow-500"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="text-sm font-medium text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className={`py-2 px-4 rounded-md text-sm font-medium ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                   : "bg-purple-600 text-white hover:bg-purple-700"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AllCampaigns;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { useRouter } from "next/router";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { countryOptions } from "../dropdown/DropDownHelper";

const AllCampaigns = () => {
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [campaignTypes, setCampaignTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Objectives");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  const handleRowClick = (id) => {
    if (id) {
      router.push(`/admin/campaign/${id}`);
    } else {
      console.error("Campaign ID is undefined");
    }
  };

  const fetchCampaigns = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/campaign/getall/campaigns",
        {
          params: {
            search: searchTerm || undefined,
            campaignType:
              selectedCategory !== "All Objectives"
                ? selectedCategory
                : undefined,
            geoCountry:
              selectedCountry !== "All Countries" ? selectedCountry : undefined,
            page: currentPage,
            limit: itemsPerPage,
          },
        }
      );

      if (response.data) {
        setAllCampaigns(response.data.data || []);
        setCampaignTypes(response.data.campaignTypes || []);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns(); // Fetch campaigns when currentPage changes
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filters change
    fetchCampaigns();
  }, [searchTerm, selectedCategory, selectedCountry]);

  const trimLink = (link) => {
    try {
      const url = new URL(link);
      return url.hostname;
    } catch (error) {
      return link;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Preview Link copied to clipboard!");
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto text-center px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Campaigns</h1>

      <div className="flex justify-between items-center gap-4 mb-6 flex-wrap">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for Flipkart or Electronics or CPI etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[250px] basis-[30%] py-2 px-4 border border-yellow-400 rounded-lg focus:outline-none focus:ring focus:ring-yellow-300 text-sm"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="flex-1 min-w-[250px] basis-[30%] py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 text-sm"
        >
          <option value="All Objectives">All Objectives</option>
          {campaignTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Country Dropdown */}
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="flex-1 min-w-[250px] basis-[30%] py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 text-sm"
        >
          <option value="All Countries" className="bg-gray-100 text-gray-700">
            All Countries
          </option>
          {countryOptions.map((country) => (
            <option
              key={country.value}
              value={country.value}
              className="bg-white-700 text-gray-700 p-2 hover:bg-gray-700 hover:text-white cursor-pointer"
            >
              {country.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4">Campaign Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Commission</th>
                  <th className="py-3 px-4">Preview Link</th>
                </tr>
              </thead>
              <tbody>
                {allCampaigns.length > 0 ? (
                  allCampaigns.map((campaign, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleRowClick(campaign._id)}
                    >
                      <td className="py-3 px-4 flex items-center">
                        <img
                          src={
                            campaign.image
                              ? `http://localhost:8080${
                                  campaign.image.startsWith("/")
                                    ? campaign.image
                                    : `/${campaign.image}`
                                }`
                              : "https://via.placeholder.com/150"
                          }
                          alt={`Campaign: ${campaign.campaignName}`}
                          width="70"
                          height="40"
                          style={{
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />

                        {campaign.campaignName}
                      </td>
                      <td className="py-3 px-4">{campaign.campaignCategory}</td>
                      <td className="py-3 px-4">{campaign.campaignType}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">
                        {campaign.campaignPayout}%
                      </td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <a
                          href={campaign.previewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline font-semibold"
                        >
                          {trimLink(campaign.previewLink)}
                        </a>
                        <FaCopy
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(campaign.previewLink);
                          }}
                          className="text-gray-500 hover:text-black cursor-pointer"
                          title="Copy to clipboard"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No campaigns available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`py-2 px-4 rounded-md text-sm font-medium ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              Previous
            </button>
            <span className="text-sm font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`py-2 px-4 rounded-md text-sm font-medium ${
                currentPage === totalPages
                  ? "bg-purple-300 text-gray-600 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllCampaigns;
