import React from 'react'
import Card from './Card'
import Hero from './Hero'
import Slider from './Slider'
import GridImg from './GridImg' 
import UpComingHome from './blog/UpComingHome'

const Home = () => {
  return (
    <>
      <Hero/>
      <Slider/>
      <GridImg/>
      <Card/>
      <UpComingHome/>
    </>
  )
}

export default Home