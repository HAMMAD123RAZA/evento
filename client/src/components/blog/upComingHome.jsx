import React, { useEffect, useState } from 'react'

const sliderData = [
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkxaQMX4NW8V5JvJ1hV1laDEmbgbPNvNEUA&s',
        title: 'Stay Tune',
        description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim incidunt rem similique quos dolorum obcaecati, commodi sunt perspiciatis, ab maiores nihil, quibusdam odit labore eligendi rerum natus nesciunt ut.'
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxjjqqD4-nOCDzcIFZCw8wsiGS1vYK4zpmFg&s',
        title: 'Stay Tune',
        description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim incidunt rem similique quos dolorum obcaecati, commodi sunt perspiciatis, ab maiores nihil, quibusdam odit labore eligendi rerum natus nesciunt ut.'
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vp0V2VPucw5cUBEopKo5lQD8VdnB_p-sog&s',
        title: 'Stay Tune',
        description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim incidunt rem similique quos dolorum obcaecati, commodi sunt perspiciatis, ab maiores nihil, quibusdam odit labore eligendi rerum natus nesciunt ut.'
    },
];



const  UpComingHome = () => {
    const [slide, setslide] = useState(0)


    useEffect(()=>{
        const interval=setInterval(() => {
            setslide((prev)=>(prev===sliderData.length-1?0:prev+1))
        }, 3000);
        return () => clearInterval(interval); 
        },[])

  return (
    <>
      <div className="max-w-7xl mx-auto overflow-hidden text-gray-500">
        <h1 className='font-bold text-4xl my-4' >Upcoming Events</h1>
      <div 
                className="flex transition-transform duration-500 ease-in-out h-full w-full" 
                style={{ transform: `translateX(-${slide * 100}%)` }}
            >
    {sliderData.map((item,id)=>{
        return (
            <div key={id} className='min-w-full relative text-white' >
            <img src={item.img} className='w-full object-cover h-80' />
            <div className="flex flex-col justify-center items-center  inset-0 absolute">
            <p className='font-bold text-2xl '>{item.title}</p>
            <p className='text-center w-1/2' >{item.description}</p>
            </div>
            </div>
        )
    })}
      </div>
      </div>

    </>
  )
}

export default UpComingHome
