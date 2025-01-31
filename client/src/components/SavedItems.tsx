import React from 'react';
import { useSelector } from 'react-redux';

const SavedItems = () => {
  const savedItems = useSelector((state) => state.savedCards.savedItems);

  console.log('Saved Items:', savedItems); // Debugging: Log saved items

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Saved Items</h1>
      <div className="flex flex-wrap gap-4">
        {savedItems.map((card, id) => (
          <div key={id} className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
            <img
              className="w-full h-40 object-cover rounded-t-lg"
              src={card.image}
              alt="Card Image"
            />
            <div className="px-6 pt-4">
              <div className="font-mono text-xl mb-2">{card.title}</div>
              <p className="text-gray-700 text-base">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItems;