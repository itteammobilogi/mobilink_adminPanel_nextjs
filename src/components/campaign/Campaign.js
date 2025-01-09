"use client";
import React from "react";
import BannerCampaign from "./Banner";
import PreferredCampaigns from "./PreferredCampaign";
import AllCampaigns from "./AllCampaign";
import BottomBannerCampaign from "./BottomBanner";
// import FeaturedCampaign from "./FeaturedCampaign";

function Campaign() {
  return (
    <div>
      <div>
        <BannerCampaign />
      </div>
      {/* <div>
        <FeaturedCampaign />
      </div> */}
      <div>
        <PreferredCampaigns />
      </div>
      <div>
        <AllCampaigns />
      </div>
      <div>
        <BottomBannerCampaign />
      </div>
    </div>
  );
}

export default Campaign;
