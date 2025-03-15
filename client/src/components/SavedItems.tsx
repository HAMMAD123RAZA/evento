import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from './PageWrapper'


function SavedItems() {
    const [savedCards, setsavedCards] = useState<any[]>([])

    useEffect(()=>{
        const storeCards=JSON.parse(localStorage.getItem("savedCards") || "[]")
        setsavedCards(storeCards)
    },[])
    console.log('the saved items are :',savedCards)
    return (
    <>
    <PageWrapper>
       <div className="p-4 text-gray-100">
      <h2 className="text-2xl font-bold mb-4">Saved Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {savedCards.map((card) => (
          <div key={card.id} className="max-w-xs rounded overflow-hidden shadow-lg text-gray-400 bg-gray-950">
            <Link to={`/card/${card.id}`}>
              <img className="w-full h-40 object-cover rounded-t-lg" src={card.imgurl} alt="Card" />
            </Link>
            <div className="p-4">
              <h3 className="font-mono text-red-500 text-xl mb-2">{card.title}</h3>
              <p className=" text-sm">{card.description}</p>
              <h3 className="font-mono text-xl mb-2">{card.Venue}</h3>
              <div className="flex justify-between items-center">
              <p className=" text-sm">{card.time}</p>
             <p className=" text-sm">{card.date}</p>`
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
    </PageWrapper>
    </>
  )
}

export default SavedItems
