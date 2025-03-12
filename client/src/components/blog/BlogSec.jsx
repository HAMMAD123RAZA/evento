


import React from 'react';

const cardData = [
  {
    id: 1,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkxaQMX4NW8V5JvJ1hV1laDEmbgbPNvNEUA&s",
    heading: "High Performance. High Style",
    description: "Get the discount OF 20%",
    tag: 'very soon'
  },
  {
    id: 2,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkxaQMX4NW8V5JvJ1hV1laDEmbgbPNvNEUA&s", 
    heading: "High Performance. High Style",
    description: "Get the discount OF 20%",
    tag: 'very soon'
  }, 
  {
    id: 3,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkxaQMX4NW8V5JvJ1hV1laDEmbgbPNvNEUA&s",
    heading: "High Performance. High Style",
    description: "Get the discount OF 20%",
    tag: 'very soon'
  },
  {
    id: 4,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkxaQMX4NW8V5JvJ1hV1laDEmbgbPNvNEUA&s", 
    heading: "High Performance. High Style",
    description: "Get the discount OF 20%",
    tag: 'very soon'
  }
];

const BlogSec = () => {
  return (
    <>
      <section className="text-white flex flex-col md:flex-row justify-around items-start gap-8 p-4">
        {/* left side */}
        <div className="md:w-2/5">
          <img src="7-1.jpeg" alt="" className="max-w-xl h-full object-cover" />
          <p className="text-white text-2xl w-[96%] font-bold mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
        
        {/* right side with 2x2 card grid */}
        <div className="md:w-2/5">
          <div className="grid grid-cols-2 gap-4">
            {cardData.map((item) => (
              <div key={item.id} className="mb-4">
                <img 
                  src={item.imageUrl} 
                  alt="" 
                  className="w-full object-cover h-32" 
                />
                <p className="text-white text-lg font-bold mt-2">{item.heading}</p>
                <p className="text-white text-sm font-bold">{item.description}</p>
                <p className="text-white text-sm font-bold">{item.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSec;