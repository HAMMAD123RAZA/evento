import React, { useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { BsSave2 } from 'react-icons/bs'
import { FaShare } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import RElatedItem from './RElatedItem'

export default function DetailPage() {
  const { id } = useParams()
  console.log(id)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/get/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        console.log('single data is:', result)

        if (Array.isArray(result) && result.length > 0) {
          setData(result[0]) 
        } else {
          setData(result)
        }
      } catch (err:any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleSave = (data:any) => {
    const savedCards=JSON.parse(localStorage.getItem('savedCards') || '[]');
    if(!savedCards.find((items:any)=>items.id===data.id)){
      savedCards.push(data)
      localStorage.setItem("savedCards",JSON.stringify(savedCards))
      alert("Card Saved")
    }
    console.log('the saved card is:',data)
  };
  

  if (loading) return <p className="text-center mt-5">Loading...</p>
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>

  if (!data) return <p className="text-center mt-5">No data found</p>

  return (
    <div>
      <div className="flex gap-8 px-4 items-center my-3">
        <div>
          <img
            className="w-full h-40 object-cover rounded"
            src={data.imgurl || 'https://via.placeholder.com/300'}
            alt={data.title}
            style={{ width: '21rem', height: '24rem' }}
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mt-4">{data.title}</h1>
          <p className="text-gray-700 max-w-xl">{data.description}</p>
          <div className="flex items-center gap-9 mt-4">
            <p className="text-gray-600">{data.date || 'N/A'}</p>
            <p className="text-gray-600">{data.time || 'N/A'}</p>
            <p className="mt-2 text-gray-800 font">{data.venue || 'Unknown'}</p>
          </div>
          <div className="flex py-3 items-center gap-4">
            <AiFillLike size={24} color="red" />
            <FaShare size={24} color="red" />
            <BsSave2  onClick={()=>handleSave(data)} size={24} color="red" className='cursor-pointer' />
          </div>
        </div>
      </div>

    {/* Relatd item */}
    <h1 className='text-center font-bold text-2xl text-red-500' >Related Item</h1>
    <RElatedItem data={data} id={id} />
    </div>
  )
}