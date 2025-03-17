import React, { useState } from 'react'
import AdWrapper from './AdWrapper'
import EventCreate from './EventCreate'
import EventList from './EventList'
const btnData=[
    {name:"Add Event",value:"create"},
    {name:"View Events",value:"get"},
]
const EventsAdmin = () => {
    const [tab, settab] = useState('get')
  return (
    <>
      <AdWrapper>
        <div className="flex justify-center items-center m-3 ">
        {btnData.map((btn,index)=>(
            <button onClick={()=>settab(btn.value)} key={index} className='px-5 py-3 bg-gray-500 hover:bg-gray-700 mx-3 font-bold text-white rounded-md'>{btn.name}</button>
        ))}
        </div>

        {tab==='create' &&(
            <EventCreate/>
        )}

{tab==='get' &&(
    <div>
        <EventList/>
    </div>
)}
      </AdWrapper>
    </>
  )
}

export default EventsAdmin
