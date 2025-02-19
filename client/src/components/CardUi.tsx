import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';
import { BsSave2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
// import { addToSaved } from '../rtk/SavedCardsSlice'; // Import the action

interface CardProps {
  card: {
    id: number;
    title: string;
    Venue: string;
    description: string;
    imgurl: string;
    date: string;
    time: string;
  };
  id: number;
}

const handleSave = (card:any) => {
  const savedCards=JSON.parse(localStorage.getItem('savedCards') || '[]');
  if(!savedCards.find((items:any)=>items.id===card.id)){
    savedCards.push(card)
    localStorage.setItem("savedCards",JSON.stringify(savedCards))
    alert("Card Saved")
  }
  console.log('the saved card is:',card)
};

export default function CardUi({ card, id }: CardProps) {

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      <Link to={`/card/${id}`}>
        <img
          className="w-full h-40 object-cover rounded-t-lg"
          src={card?.imgurl}
          alt="Card Image"
        />
      </Link>

      <div className="px-6 pt-4">
        <div className="flex p-2 justify-between">
          <div className="font-mono text-xl mb-2">{card?.title}</div>
          <div className="font-mono text-xl mb-2">{card?.date}</div>
        </div>
        <p className="text-gray-700 text-base">{card?.description}</p>
        <div className="flex px-2 py-3 justify-between">
          <div className="font-mono text-xl mb-2">{card?.Venue}</div>
          <div className="font-mono text-xl mb-2">{card?.time}</div>
        </div>
        <div className="flex justify-between items-center p-2">
          <div className="px-2 flex gap-4">
            <AiFillLike color="red" />
            <FaShare color="red" />
            <BsSave2 color="red" onClick={()=>handleSave(card)} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}