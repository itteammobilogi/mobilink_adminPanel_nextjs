import React from "react";

const ImportantInformation = ({
  title,
  campaignType,
  commissionDetails,
  disallowedMediums,
}) => {
  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
      {/* Section Header */}
      <div className="flex items-center mb-4">
        <div className="h-6 w-1 bg-purple-800 mr-3"></div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>

      {/* Content */}
      <div className="text-gray-700 text-sm space-y-2">
        <p>
          <strong>Type:</strong> {campaignType}
        </p>
        <p>
          <strong>Commission:</strong> {commissionDetails}
        </p>
        <p>
          <strong>Disallowed Mediums:</strong> {disallowedMediums.join(", ")}.
        </p>
      </div>
    </div>
  );
};

export default ImportantInformation;
