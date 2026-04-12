import React, { useEffect, useState } from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import Newsletter from '../Components/Newsletter'
import CustomerReviews from '../Components/CustomerReviews'
import FAQ from '../Components/Faq'

const Home = () => {
  return(
    <div>
      <Hero/>
      <LatestCollection/>
      <OurPolicy/>
      <BestSeller/>
      <CustomerReviews/>
      <FAQ/>
      <Newsletter/>
    </div>
  )
}

export default Home