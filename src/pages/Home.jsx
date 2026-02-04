import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/common/Stats';
import FeatureStack from '../components/home/FeatureStack';
import Reviews from '../components/home/Reviews';

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <FeatureStack />
      <Reviews />
    </>
  );
};

export default Home;
