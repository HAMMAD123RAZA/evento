import React from 'react'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'

export default function Hero() {

  const navigate=useNavigate()
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 text-white py-4">
        <div className='w-3/5 m-3' >
        <div className='font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-red-500 ' >
        Get Connect <br /> Select And Enjoy <br /> Your Event
        </div>
        <p className='mt-4 text'>
  Unlock Your Potential: Explore, Learn, and Thrive with Our Vibrant Community of Music, Dance, Career Development, Study Guidance, Counseling, and More. Discover the latest events that meets your wants!
</p>
    <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }} className='font-bold mx-1 w-48 py-3 px-5 my-3 text-white bg-red-500 hover:bg-white hover:text-red-500 ounded-lg border-2 border-red-500' onClick={()=>navigate('/events')}>Discover IT</motion.div >
        </div>
        <img width={490}  src="https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg" alt="" />
      </div>
    </>
  )
}
