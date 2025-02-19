import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function SavedItems() {
    const [savedCards, setsavedCards] = useState<any[]>([])

    useEffect(()=>{
        const storeCards=JSON.parse(localStorage.getItem("savedCards") || "[]")
        setsavedCards(storeCards)
    },[])
    console.log('the saved items are :',savedCards)
    return (
    <>
       <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Saved Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {savedCards.map((card) => (
          <div key={card.id} className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
            <Link to={`/card/${card.id}`}>
              <img className="w-full h-40 object-cover rounded-t-lg" src={card.imgurl} alt="Card" />
            </Link>
            <div className="p-4">
              <h3 className="font-mono text-xl mb-2">{card.title}</h3>
              <p className="text-gray-700 text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default SavedItems
