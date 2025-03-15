import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { data } from 'react-router'

const heads=[
  { 
    label:'Title',
    value:'title'
},
{
    label:'Description',
    value:'shortdesc'
},
{
    label:'Image',
    value:'imgurl'
},
{
    label:'Long Desc',
    value:'longdesc'
},
{
    label:'Date',
    value:'date'
},{
  label:'Actions',
  value:'Actions'
},
]


export default function BlogList() {
    const [Data, setData] = useState([])

    const fetchData=async()=>{
        try {
            const api=await axios.get('http://localhost:8080/getAll/blogs')
            setData(api.data.blog)
            console.log('blog list:',api.data)
        } catch (error) {
            console.log('error fetching blog in admin client: ', error)
        }
    }

    const deleteBlog=async (id)=>{
      try {
        const api=await axios.delete(`http://localhost:8080/delete/blog/${id}`,{
          data:{id}
        })
        console.log('deleted succesfully from client',id)
        fetchData()
      } catch (error) {
        console.log("err in deletion from client:",error)
      }
    }

    const editBlog=(id)=>{}


    useEffect(()=>{
fetchData()
    },[])

  return (
    <>
   <table className='w-full text-white'>
  <thead >
    <tr className='uppercase'>
      {heads.map((item, id) => (
        <th className='px-3' key={id}>
          {item.label}
        </th>
      ))}
    </tr>
  </thead>
  <tbody >
    {Data.map((item, id) => (
      <tr className='py-2'  key={id}>
        <td className='px-3'>{item.title}</td>
        <td className='px-3'>{item.shortdesc.substring(0,20)}</td>
        <td className='px-3'>{item.imgurl}</td>
        <td className='px-3'>
          {item.longdesc ? item.longdesc.substring(0, 40) + (item.longdesc.length > 40 ? '...' : '') : ''}
        </td>
        <td className='px-3'>{item.date}</td>
        <td className='px-3 flex gap-3'>
        <button onClick={()=>deleteBlog(item.id)}  className='bg-red-500 px-3 py-3 rounded-lg hover:bg-red-600 text-white font-bold' >  Delete</button>
        <button onClick={()=>editBlog(item.id)} className='bg-gray-500 px-4 py3 rounded-lg hover:bg-gray-600 text-white font-bold' >  Edit</button>

        </td>
      </tr>
    ))}
  </tbody>
</table>
    </>
  )
}
