import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardUi from './CardUi'
import { FaSearch } from "react-icons/fa";
import LoadingScreen from './LoadingScreen';
import PageWrapper from './PageWrapper';
import {motion} from 'framer-motion'


export default function Events() {
  const [data, setData] = useState([])
  const [Loading, setLoading] = useState(false)
  const [Search, setSearch] = useState('')
  const fetchEvents = async () => {
    setLoading(true)
    try {
      const api=await axios.get('http://localhost:8080/get')
      setData(api.data)
      setLoading(false)
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
    <PageWrapper>
      <motion.div whileHover={{scale:0.9 , y:5}} >
    <div className='m-9 relative mx-auto max-w-xs ' >
      <input type="text"  placeholder='search' value={Search} onChange={(e)=>setSearch(e.target.value)} className='px-12 bg-gray-400 lg:px-18 py-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-red-500 ' />
      <FaSearch className='absolute top-1/2 m-1  transform -translate-y-1/2 text-red-400' color='red' size={20} />

    </div>
    </motion.div>
    {Loading?(
      <LoadingScreen/>
    ):(
      <div className="grid md:grid-cols-3 py-3 px-12 lg:px-3 grid-cols-1 ">
      {filterData.map((data,id)=>{
        return (
          <div key={id}  className='my-3'>
  <CardUi card={data} id={data?.id} />
          </div>
        )
      })}
          </div>
    )}
    </PageWrapper>
 

    </>
  )
}
