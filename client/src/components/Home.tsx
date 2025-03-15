import React from 'react'
import Card from './Card'
import Hero from './Hero'
import Slider from './Slider'
import GridImg from './GridImg' 
import UpComingHome from './blog/UpComingHome'
import PageWrapper from './PageWrapper'
const Home = () => {
  return (
    <>
    <PageWrapper>
          <Hero/>
      <Slider/>
      <GridImg/>
      <Card/>
      <UpComingHome/>
      </PageWrapper>
    </>
  )
}

export default Home