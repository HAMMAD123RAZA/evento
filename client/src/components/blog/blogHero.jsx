import React from 'react'

const blogHero = () => {
  return (
    <>
    <div className="h-full w-full bg-gray-950 py-20 ">
        {/* <div className="flex flex-col md:flex-row  max-w-7xl mx-auto items-center"> */}
        <div className="grid grid-cols-2 max-w-7xl mx-auto items-center">

            <div className='relative '>
            <div className=" absolute top-0 -left-7  h-24 w-24 bg-red-500 rounded-full  "></div>

                <h1 className='text-4xl w-1/2 font-bold text-white relative z-20' >Future Foucused Knowledge And Information</h1>
            </div>
            <div>
<p  className='text-white text-sm w-2/3 ' >Lorem ipsum dolor sit amet, consectetur adipisicing elit uiew kyuw uoiwa assumenda.</p>
            </div>

        </div>
    </div>
      
    </>
  )
}

export default blogHero
