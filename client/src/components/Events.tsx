import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardUi from './CardUi'
import { FaSearch } from "react-icons/fa";


export default function Events() {
  const [data, setData] = useState([])
  const [Search, setSearch] = useState('')
  const fetchEvents = async () => {
    try {
      const api=await axios.get('http://localhost:8080/get')
      setData(api.data)
    } catch (error) {
      console.log('err fetching data',error)
    }
  }
useEffect(()=>{
fetchEvents()
},[])

const filterData=data.filter((item)=>item.title.toLowerCase().includes(Search.toLowerCase()))

  return (
    <>
    <div className='m-9 relative ' >
      <input type="text" placeholder='search' value={Search} onChange={(e)=>setSearch(e.target.value)} className='px-8 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ' />
      <FaSearch className='absolute top-1/2 m-1  transform -translate-y-1/2 text-red-400' color='red' size={20} />

    </div>
    <div className="grid md:grid-cols-3 px-5 md-px-3 grid-cols-1 ">
    {filterData.map((data,id)=>{
      return (
        <div key={id}  >
<CardUi card={data} id={data?.id} />
        </div>
      )
    })}
        </div>

    </>
  )
}
