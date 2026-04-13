import React from "react";
import Hero from "../Components/Hero";
import LatestCollection from "../Components/LatestCollection";
import BestSeller from "../Components/BestSeller";
import OurPolicy from "../Components/OurPolicy";
import Newsletter from "../Components/Newsletter";
import CustomerReviews from "../Components/CustomerReviews";
import FAQ from "../Components/Faq";
import SummerSalePopup from "../Components/SummerSalePopup";
import OffersSection from "../Components/OffersSection";

const Home = () => {
  return (
    <div>
      {/* Popup — appears after 1.2s, dismissible */}
      <SummerSalePopup />
      <Hero />
      <LatestCollection />
      <OurPolicy />
      {/* Offers section with countdown timer */}
      <OffersSection />
      <BestSeller />
      <CustomerReviews />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
