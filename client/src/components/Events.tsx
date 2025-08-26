import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardUi from './CardUi'
import { FaSearch } from "react-icons/fa";
import LoadingScreen from './LoadingScreen';
import PageWrapper from '../components/PageWrapper';
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
     <motion.div whileHover={{ scale: 0.95 }} className="my-5">
  <div className="relative mx-auto max-w-md">
    <input
      type="text"
      placeholder="Search..."
      value={Search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-full 
                 focus:outline-none focus:ring-2 focus:ring-red-500 
                 border border-gray-700 placeholder-gray-400"
    />
    <FaSearch 
      className="absolute left-4 top-1/2 transform -translate-y-1/2" 
      color="#f87171" 
      size={20} 
    />
  </div>
</motion.div>
    {Loading?(
      <LoadingScreen/>
    ):(
      <div className="grid md:grid-cols-3 py-3 px-6 lg:px-3 grid-cols-1 ">
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
