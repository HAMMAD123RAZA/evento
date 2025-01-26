import React from 'react'
import { AiFillLike } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { BsSave2 } from "react-icons/bs";
import {Link} from 'react-router-dom'

interface CardProps {
  card: {
    id: number;
    title: string;
    Venue: string;
    description: string;
    image: string;
    date: string;
    time: string;
  };
  id: number;
}

export default function CardUi({card,id}:CardProps) {
  return (
    <>
          <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
          <Link to={`/card/${id}`} >

      <img 
        className="w-full h-40 object-cover rounded-t-lg" 
        src="https://cdn-cjhkj.nitrocdn.com/krXSsXVqwzhduXLVuGLToUwHLNnSxUxO/assets/images/optimized/rev-b135bb1/spotme.com/wp-content/uploads/2020/07/Hero-1.jpg" 
        alt="Card Image" 
      />
          </Link>

      <div className="px-6 pt-4">
        <div className="flex p-2 justify-between ">
        <div className="font-mono  text-xl mb-2">{card.title}</div>

            <div className="font-mono text-xl mb-2">{card.date}</div>
        </div>
        <p className="text-gray-700 text-base">
          {card.description}
        </p>
        <div className="flex px-2 py-3 justify-between ">
        <div className="font-mono  text-xl mb-2">{card.Venue}</div>

            <div className="font-mono text-xl mb-2">{card.time}</div>
        </div>
        <div className="flex justify-between items-center p-2">
        <div className="px-2 flex  gap-4">
      <AiFillLike color='red' />
      <FaShare color='red'/>
        <BsSave2 color='red'/>
      </div>
      </div>
      </div>
    
    </div>
    </>
  )
}
