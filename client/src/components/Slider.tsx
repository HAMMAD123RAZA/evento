import React, { useState, useEffect } from 'react';

const sliderData = [
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkxaQMX4NW8V5JvJ1hV1laDEmbgbPNvNEUA&s',
        title: 'Event 1',
        description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim incidunt rem similique quos dolorum obcaecati, commodi sunt perspiciatis, ab maiores nihil, quibusdam odit labore eligendi rerum natus nesciunt ut.'
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxjjqqD4-nOCDzcIFZCw8wsiGS1vYK4zpmFg&s',
        title: 'Event 2',
        description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim incidunt rem similique quos dolorum obcaecati, commodi sunt perspiciatis, ab maiores nihil, quibusdam odit labore eligendi rerum natus nesciunt ut.'
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vp0V2VPucw5cUBEopKo5lQD8VdnB_p-sog&s',
        title: 'Event 3',
        description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim incidunt rem similique quos dolorum obcaecati, commodi sunt perspiciatis, ab maiores nihil, quibusdam odit labore eligendi rerum natus nesciunt ut.'
    },
];

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const handleSlide = (direction:string) => {
        if (direction === 'next') {
            setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
        } else {
            setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
        }
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            handleSlide('next');
        }, 8000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-96 overflow-hidden">
            <div 
                className="flex transition-transform duration-500 ease-in-out h-full w-full" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {sliderData.map((item, id) => (
                    <div key={id} className="min-w-full h-full relative">
                        <img 
                            src={item.img} 
                            alt={item.title}
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0  bg-black bg-opacity-40 flex flex-col justify-center items-center p-4">
                            <h2 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-red-500 via-white to-red-300 ">{item.title}</h2>
                            <p className=" text-center w-full md:w-1/2 font-bold bg-gradient-to-r bg-clip-text text-transparent from-red-500 via-white to-red-300">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-400 bg-opacity-50 text-white p-2 rounded-full"
                onClick={() => handleSlide('prev')}
            >
                &#8592;
            </button>
            <button 
                className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-400 bg-opacity-50 text-white p-2 rounded-full"
                onClick={() => handleSlide('next')}
            >
                &#8594;
            </button>
            
            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {sliderData.map((_, index) => (
                    <button 
                        key={index}
                        className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
}


// import React, { useEffect, useState } from 'react'

// const sliderData = [
//     {
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkxaQMX4NW8V5JvJ1hV1laDEmbgbPNvNEUA&s',
//         title: 'Event 1',
//         description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim incidunt rem similique quos dolorum obcaecati, commodi sunt perspiciatis, ab maiores nihil, quibusdam odit labore eligendi rerum natus nesciunt ut.'
//     },
//     {
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxjjqqD4-nOCDzcIFZCw8wsiGS1vYK4zpmFg&s',
//         title: 'Event 2',
//         description: 'Description for Event 2'
//     },
//     {
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vp0V2VPucw5cUBEopKo5lQD8VdnB_p-sog&s',
//         title: 'Event 3',
//         description: 'Description for Event 3'
//     },
// ];


// export default function Slider() {
//         const [currentSlide, setCurrentSlide] = useState(0);
    
//     const handleSlide = (direction:string) => {
//         if (direction === 'next') {
//             setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
//         } else {
//             setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
//         }
//     };

//     useEffect(()=>{
//         const interval=setInterval(() => {
//             handleSlide('next')
//         }, 5000);
//          return ()=>clearInterval(interval)
//     },[])
    
//   return (
//     <>
//       <div className="relative w-full h-full overflow-hidden ">
//         <div  className="flex transition-transform duration-500 ease-in-out h-full w-full" 
//     style={{ transform: `translateX(-${currentSlide * 100}%)` }} >
// {sliderData.map((item,id)=>(
//     <>
//     <div key={id} className='min-w-full h-full relative' >
//         <img src={item.img} alt=""  className='w-full h-full object-cover'/>
//     </div>
//     <div className="absolute inset-0 text-white flex flex-col justify-center items-center ">
//                        <h2 className="text-2xl font-bold text-white">{item.title}</h2>
//                            <p className="text-white">{item.description}</p>

//     </div>
//     </>
// ))}
//       </div>
//       <button 
//                 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//                 onClick={() => handleSlide('prev')}
//             >
//                 &#8592;
//             </button>
//             <button 
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//                 onClick={() => handleSlide('next')}
//             >
//                 &#8594;
//             </button>
//       </div>

//     </>
//   )
// }
