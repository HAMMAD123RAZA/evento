import React from 'react'

interface CardProps {
  card: {
    title: string;
    Venue: string;
    description: string;
    image: string;
    date: string;
    time: string;
  };
  id: number;
}

export default function CardUi({card}:CardProps) {
  return (
    <>
          <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      <img 
        className="w-full h-40 object-cover rounded-t-lg" 
        src="https://cdn-cjhkj.nitrocdn.com/krXSsXVqwzhduXLVuGLToUwHLNnSxUxO/assets/images/optimized/rev-b135bb1/spotme.com/wp-content/uploads/2020/07/Hero-1.jpg" 
        alt="Card Image" 
      />
      <div className="px-6 py-4">
        <div className="flex p-2 justify-between ">
        <div className="font-mono  text-xl mb-2">{card.title}</div>

            <div className="font-mono text-xl mb-2">{card.date}</div>
        </div>
        <p className="text-gray-700 text-base">
          {card.description}
        </p>
        <div className="flex p-2 justify-between ">
        <div className="font-mono  text-xl mb-2">{card.Venue}</div>

            <div className="font-mono text-xl mb-2">{card.time}</div>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700">
          Action Button
        </button>
      </div>
    </div>
    </>
  )
}
