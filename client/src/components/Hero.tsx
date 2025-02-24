import React from 'react'

export default function Hero() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 text-white py-4">
        <div className='w-3/5 m-3' >
        <div className='font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-red-500 ' >
        Get Connect <br /> Select And Enjoy <br /> Your Event
        </div>
        <p className='mt-4 text' >Lorem ipsum dolor sit amet consectetur adipisicing elit. At, modi  quae eius nisi veritatis impedit excepturi! Obcaecati minima, at .</p>
    <button className='font-bold py-3 px-5 my-3 text-white bg-red-500 hover:bg-white hover:text-red-500 ounded-lg border-2 border-red-500' >Discover IT</button>
        </div>
        <img width={400} className='w-4/5' src="https://cdn-cjhkj.nitrocdn.com/krXSsXVqwzhduXLVuGLToUwHLNnSxUxO/assets/images/optimized/rev-b135bb1/spotme.com/wp-content/uploads/2020/07/Hero-1.jpg" alt="" />
      </div>
    </>
  )
}
