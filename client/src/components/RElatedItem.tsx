import React, { useEffect, useState } from 'react'
import CardUi from './CardUi'
import axios from 'axios'
import LoadingScreen from './LoadingScreen'

export default function RElatedItem({ data, id }: any) {
  const [relatedData, setRelatedData] = useState([])
  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true)
      try {
        const apiData = await axios.get(`http://localhost:8080/get`)
        setRelatedData(apiData.data)
        setLoading(false)
      } catch (error) {
        console.log("Failed to fetch related items:", error)
      }
    }
    fetchRelated()
  }, [])

  const filteredData = relatedData.filter((item: any) => item.id !==Number(id))

  return (
    <>
    {Loading?(
      <LoadingScreen/>
    ):(
    <div className="flex flex-wrap gap-6 justify-center mt-5">
      {filteredData.length > 0 ? (
        filteredData.map((item: any) => <CardUi key={item.id} card={item} id={item.id} />)
      ) : (
        <p className="text-center text-gray-500">No related items found</p>
      )}
    </div>
    )}
    </>
  )
}
