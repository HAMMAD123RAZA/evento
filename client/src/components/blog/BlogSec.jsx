import React, { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';

const BlogSec = () => {
  const [Data, setData] = useState([])
  const fetchBlogs=async()=>{

    try {
      const api=await axios.get('http://localhost:8080/getAll/blogs')
      setData(api.data.blog)
      console.log(api.data.blog)
      // console.log(api.data)
    } catch (error) {
      console.log('err in fetching blogs in client:',error)
    }
  }
  useEffect(()=>{
    fetchBlogs()
  },[])
  

  return (
    <>
<section className='grid grid-cols-1 lg:px-3 gap-8  lg:grid-cols-4 ' >
  {Data.map((item,id)=>{
    return (
      <div key={id} className='w-full bg-gray-950 text-white ' >
        <img src={item.imgurl} alt="" />
        <p className='text-sm' >{item.title.substring(0,20)}</p>
        <p>{item.shortdesc.substring(0,60)}</p>
        <p className='text-xs '>Author:~Hammad Raza</p>
      </div>
    )
  })}

</section>
    </>
  );
};

export default BlogSec;