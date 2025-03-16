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
      <section className="text-white flex flex-col md:flex-row justify-around items-start gap-8 p-4">
    {Data.map((item, index) => (
      <div key={index} className="w-full md:w-1/3 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <img className="w-full h-48 object-cover" src={item.imgurl} alt={item.title} />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{item.title}</h2>
          <p className="text-gray-400 text-sm mb-4">{item.date}</p>
          <p className="text-gray-300">{item.shortdesc}</p>
        </div>
      </div>
    ))}
        

      </section>
    </>
  );
};

export default BlogSec;