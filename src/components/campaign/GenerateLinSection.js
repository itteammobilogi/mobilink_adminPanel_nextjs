import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const GenerateLinkSection = ({ campaign }) => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    contactNumber: "",
    skypeId: "",
  });

  const handleCaptcha = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateLink = () => {
    if (!captchaVerified) {
      alert("Please verify the captcha before proceeding.");
      return;
    }

    if (!formData.fullName || !formData.email) {
      alert("Full Name and Email are mandatory.");
      return;
    }

    // Submit the form data (You can integrate API logic here)
    alert(
      "Link generated successfully with the following details:\n" +
        JSON.stringify(formData, null, 2)
    );
  };

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
      {/* Left Section */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          Generate Your {campaign.campaignName} Affiliate Link
        </h3>

        {/* Full Name */}
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
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email */}
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
            placeholder="Enter your email address"
            required
          />
        </div>

        {/* Company Name */}
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

        {/* Contact Number */}
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
            placeholder="Enter your contact number (optional)"
          />
        </div>

        {/* Skype ID */}
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

        {/* Captcha */}
        <div className="mb-4">
          <ReCAPTCHA
            sitekey="YOUR_RECAPTCHA_SITE_KEY" // Replace with your site key
            onChange={handleCaptcha}
          />
        </div>

        {/* Generate Link Button */}
        <button
          onClick={handleGenerateLink}
          className={`w-full py-3 rounded-md shadow-lg font-semibold transition-all ${
            captchaVerified
              ? "bg-yellow-400 hover:bg-yellow-500 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!captchaVerified}
        >
          Join to Generate Link
        </button>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-gray-50 rounded-md p-6 shadow-inner">
        <h4 className="text-gray-800 font-semibold text-base mb-4">
          What is an Affiliate Link?
        </h4>
        <p className="text-gray-600 text-sm">
          Affiliated links or money-making links can be shared on your social
          media or website. Anyone purchasing through these links earns you a
          commission.
        </p>
      </div>
    </div>
  );
};

export default GenerateLinkSection;
