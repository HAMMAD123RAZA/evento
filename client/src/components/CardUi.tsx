import React from 'react';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'

const CardUi = ({ card, id }) => {
  const { date, title, imgurl, time, description, venue } = card;

  return (
    <Link to={`/card/${id}`} >
    <motion.div 
    initial={{ opacity: 0, y:20 }}
    animate={{ opacity: 3, y: 12   }} 
    transition={{ duration: 0.5 }}

        whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }} // Scale up and add shadow on hover
        className="max-w-xs rounded overflow-hidden shadow-4xl bg-gray-950 m-4 border-2 border-gray-400"
    >
      <img className="w-full h-48 object-cover " src={imgurl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-white mb-2">{title}</div>
        <p className="text-gray-200 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {date}
        </span>
        <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {time}
        </span>
        <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {venue}
        </span>
      </div>
    </motion.div>
    </Link>
  );
};

export default CardUi;