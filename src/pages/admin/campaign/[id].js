// "use client";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(
    `https://apimobilink.mobilogi.com/api/admin/campaign/single/campaign/${id}`
  );
  const result = await res.json();

  if (!res.ok || !result.data) {
    return {
      notFound: true, // Show 404 page if the campaign is not found
    };
  }

  return {
    props: {
      campaign: result.data, // Pass campaign data as props
    },
  };
}

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/loader/Loader";
import { IoIosLock } from "react-icons/io";
import ImportantInformation from "@/components/campaign/ImportantInformation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CampaignDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get campaign ID from the URL
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    contactNumber: "",
    skypeId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateLink = async () => {
    if (!formData.fullName || !formData.email) {
      toast.error("Full Name and Email are mandatory.");
      return;
    }

    try {
      // Send POST request to create a new publisher
      const response = await fetch(
        "https://apimobilink.mobilogi.com/api/admin/publisher/create/publisher",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pubName: formData.fullName,
            pubEmail: formData.email,
            pubContact: formData.contactNumber,
            pubSkypeId: formData.skypeId,
            pubCompany: formData.companyName,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Publisher created successfully!");
        console.log("Publisher created:", result.publisher);

        setFormData({
          fullName: "",
          email: "",
          companyName: "",
          contactNumber: "",
          skypeId: "",
        });
      } else {
        toast.error(result.message || "Failed to create publisher.");
      }
    } catch (error) {
      console.error("Error creating publisher:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const allowedMedia = ["Text Link", "Banner"];
  const disallowedMedia = [
    "Deals",
    "Coupons",
    "Cashback, Reward Points, Incentives, Charity",
    "Email (Text)",
    "Custom Email (HTML)",
    "POP Traffic",
    "Native Ads",
    "Social Media",
    "Facebook Ads",
    "SEM - Brand Keyword(s)",
    "SEM - Brand + Generic Keyword(s)",
    "SEM - Generic Keyword(s)",
  ];

  const importantInfo = {
    title: "Important Information for Laurenshope Affiliate Program",
    campaignType: "CPC campaign",
    commissionDetails: "Commission rates are dynamic.",
    disallowedMediums: ["PPC", "SEM", "Adult", "Gambling", "Google ads"],
  };
  const [activeTab, setActiveTab] = useState("generate");

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          // `http://localhost:8080/api/admin/campaign/single/campaign?id=${id}`
          `https://apimobilink.mobilogi.com/api/admin/campaign/single/campaign/${id}`
        );
        const result = await response.json();

        if (response.ok) {
          setCampaign(result.data);
        } else {
          console.error("Error fetching campaign detail:", result.message);
        }
      } catch (error) {
        console.error("Error fetching campaign detail:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetail();
  }, [id]);

  if (loading) return <Loader />;
  if (!campaign) return <p>Campaign not found</p>;
  const renderTabContent = () => {
    switch (activeTab) {
      case "payout":
        return (
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="h-6 w-1 bg-purple-800 mr-3"></div>
              <h3 className="text-lg font-semibold text-gray-800">
                {campaign.campaignName}
              </h3>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-gray-600 font-medium">
                      Category
                    </th>
                    <th className="py-3 px-4 text-gray-600 font-medium">
                      Payout
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 text-gray-800">CPC (Dynamic)</td>
                    <td className="py-3 px-4 text-center">
                      <IoIosLock />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "generate":
        return (
          <div className="mt-6 bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-1">
                <div className="h-6 w-1 bg-purple-800 mr-3"></div>
                Generate Your {campaign.campaignName} Affiliate Link
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your full name (Mandatory)"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your email address (Mandatory)"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your contact number (Mandatory)"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your company name (optional)"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skype ID
                </label>
                <input
                  type="text"
                  name="skypeId"
                  value={formData.skypeId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your Skype ID (optional)"
                />
              </div>

              <button
                onClick={handleGenerateLink}
                className="w-full py-3 rounded-md shadow-lg font-semibold transition-all bg-yellow-400 hover:bg-purple-500 text-white hover:rounded-full"
              >
                Join to Generate Link
              </button>
            </div>

            <div className="flex-1 bg-gray-50 rounded-md p-6 shadow-inner">
              <h4 className="text-gray-800 font-semibold text-base mb-4">
                What is an Affiliate Link?
              </h4>
              <p className="text-gray-600 text-sm">
                Affiliated links or money-making links can be shared on your
                social media or website. Anyone purchasing through these links
                earns you a commission.
              </p>
            </div>
          </div>
        );
      case "media":
        return (
          <div className="mt-6 bg-white shadow-lg rounded-lg p-6 ">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-1">
                <div className="h-6 w-1 bg-purple-800 mr-3"></div>
                Allowed Media
              </h4>
              <div className="flex flex-wrap gap-2">
                {allowedMedia.map((media, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-600 font-medium rounded-full shadow-sm text-sm flex items-center gap-1"
                  >
                    {media}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-1">
                <div className="h-6 w-1 bg-purple-800 mr-3"></div>
                DisAllowed Media
              </h4>
              <div className="flex flex-wrap gap-2">
                {disallowedMedia.map((media, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-600 font-medium rounded-full shadow-sm text-sm flex items-center gap-1"
                  >
                    {media}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      case "important":
        return (
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <ImportantInformation
              title={importantInfo.title}
              campaignType={importantInfo.campaignType}
              commissionDetails={importantInfo.commissionDetails}
              disallowedMediums={importantInfo.disallowedMediums}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>{campaign.campaignName} - Affiliate Campaign</title>
        <meta
          name="description"
          content={`Join the ${campaign.campaignName} affiliate campaign and earn up to ${campaign.campaignPayout}% per sale.`}
        />
        <meta
          name="keywords"
          content={`${campaign.campaignCategory}, ${campaign.campaignType}, affiliate campaign, ${campaign.campaignName}, top payouts`}
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`https://yourdomain.com/campaign/${campaign.id}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Offer",
              name: campaign.campaignName,
              description: `Exclusive affiliate campaign offering up to ${campaign.campaignPayout}% per sale.`,
              image: campaign.image
                ? `https://apimobilink.mobilogi.com/uploads/${campaign.image}`
                : "fallback-image-path",
              url: `https://yourdomain.com/campaign/${campaign.id}`,
              price: `${campaign.campaignPayout}% Per Sale`,
            }),
          }}
        />
      </Head>
      <div className="container-fluid mx-auto px-4 py-8 bg-gradient-to-r from-[#F1E5D1] via-[#FFF7E6] to-[#EDEDED]">
        {" "}
        <ToastContainer />
        {/* bg-[#F5EFFF] */}
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          /{" "}
          <a href="/" className="hover:underline">
            Campaigns
          </a>{" "}
          / <span className="text-gray-700">{campaign.campaignName}</span>
        </nav>
        {/* Campaign Header */}
        <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
          <img
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
            width="50" // Set the desired width
            height="40" // Set the desired height
            style={{
              objectFit: "cover", // Optional: For maintaining aspect ratio
              borderRadius: "10px", // Add border-radius for rounded corners
            }}
          />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              {campaign.campaignName}
            </h3>
            <a
              href={campaign.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              {campaign.previewLink}
            </a>
          </div>
          <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {campaign.campaignType || "CPC"}
          </div>
        </div>
        {/* Campaign Info */}
        <div className="bg-white shadow-lg rounded-lg mt-6 p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500">
              Platform where tracking is available
            </p>
            <p className="text-gray-800 font-semibold">Desktop, Mobile</p>
          </div>
          <div>
            <p className="text-gray-500">Categories</p>
            <p className="text-gray-800 font-semibold">
              {campaign.campaignCategory}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Cookie Duration</p>
            <p className="text-gray-800 font-semibold">
              {campaign.cookieDuration || "30 minutes"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Deeplink</p>
            <p className="text-gray-800 font-semibold">
              {campaign.deeplink ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Incentive / Cashback</p>
            <p className="text-gray-800 font-semibold">
              {campaign.incentive ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Social Media</p>
            <p className="text-gray-800 font-semibold">
              {campaign.socialMedia ? "Yes" : "No"}
            </p>
          </div>
        </div>
        {/* Tabs */}
        <div className="border-b mt-6">
          <ul className="flex flex-wrap text-sm md:text-base">
            {["payout", "generate", "media", "important"].map((tab) => (
              <li
                key={tab}
                className={`py-2 px-4 cursor-pointer ${
                  activeTab === tab
                    ? "border-b-2 border-purple-600 font-semibold"
                    : "hover:text-purple-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "payout"
                  ? "Payout Categories"
                  : tab === "generate"
                  ? "Generate Link"
                  : tab === "media"
                  ? "Media Allowed/Disallowed"
                  : "Important Information"}
              </li>
            ))}
          </ul>
        </div>
        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </>
  );
};

export default CampaignDetail;
