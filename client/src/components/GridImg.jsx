import React from 'react'
const imageData1 = [
    {
      id: 1,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkxaQMX4NW8V5JvJ1hV1laDEmbgbPNvNEUA&s",
      heading: "High Performance. High Style",
      description: "Get the discount OF 20%",
    },
    {
      id: 2,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkxaQMX4NW8V5JvJ1hV1laDEmbgbPNvNEUA&s",
      heading: "High Performance. High Style",
      description: "Get the discount OF 20%",
    }
   
  ];
  
  const imageData2 = [
    {
      id: 1,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkxaQMX4NW8V5JvJ1hV1laDEmbgbPNvNEUA&s",
      heading: "High Performance. High Style",
      description: "Get the discount OF 20%",
    },
    {
      id: 2,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkxaQMX4NW8V5JvJ1hV1laDEmbgbPNvNEUA&s",
      heading: "High Performance. High Style",
      description: "Get the discount OF 20%",
    },
    {
      id: 3,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkxaQMX4NW8V5JvJ1hV1laDEmbgbPNvNEUA&s",
      heading: "High Performance. High Style",
      description: "Get the discount OF 20%",
    },
  ];

const GridImg = () => {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2  lg:p-16 ">
    {imageData1.map((item,id)=>(
        <>
    <div key={id} className='relative' >
    <img src={item.imageUrl} alt="" className='lg:w-full w-96 h-full px-4 lg:px-7' />
    <div className="flex flex-col justify-center items-center absolute inset-0 w-full h-full bg-gray-500 bg-opacity-0 text-white rounded-md ">

        <h1 className='text-2xl font-bold' >{item.heading}</h1>
        <p>{item.description}</p>
        </div>

    </div>
        </>
    ))}
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-3 lg:p-12 ">
    {imageData2.map((item,id)=>(
        <>
    <div key={id} className='relative ' >
    <img src={item.imageUrl} alt="" className='w-96 h-full px-4' />
    <div className="flex flex-col justify-center items-center absolute inset-0 w-full h-full bg-gray-500 bg-opacity-0 text-white rounded-md ">

<h1 className='text-2xl font-bold' >{item.heading}</h1>
<p>{item.description}</p>
</div>

    </div>
        </>
    ))}
      </section>
    </>
  )
}

export default GridImg
