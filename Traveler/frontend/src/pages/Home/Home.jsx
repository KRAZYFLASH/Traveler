import React from 'react'
import Hero from "./Hero/Hero";      // atau: "./Hero/Hero.jsx"
import Card from './Card/Card';
import PromoSection from './Promo/Promo';
import PopularDestination from './PopularDestination/PopularDestination';
import Recommendation from './Recommendation/Recommendation';
import Footer from './Footer/Footer';


const Home = () => {
  return (
    <>
      <Hero />
      <Card />
      <PromoSection />
      <PopularDestination />
      <Recommendation />
      <Footer />
    </>
  )
}

export default Home
