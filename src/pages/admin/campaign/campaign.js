// "use client";

import BannerCampaign from "@/components/campaign/Banner";
import PreferredCampaigns from "@/components/campaign/PreferredCampaign";
import React from "react";

function Campaign() {
  return (
    <div>
      <div>
        <BannerCampaign />
      </div>

      <div>
        <PreferredCampaigns />
      </div>
    </div>
  );
}

export default Campaign;
