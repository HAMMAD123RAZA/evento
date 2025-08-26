import React, { useState } from 'react';
import axios, { toFormData } from 'axios'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { easeIn, motion } from 'framer-motion';

const BlogSec = () => {
  const [Data, setData] = useState([])
  const [CurrentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 4

  const fetchBlogs = async () => {
    setIsLoading(true)
    try {
      const api = await axios.get('http://localhost:8080/getAll/blogs')
      setData(api.data.blog)
      console.log(api.data.blog)
    } catch (error) {
      console.log('err in fetching blogs in client:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])
  
  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <section className='grid grid-cols-1 lg:px-3 gap-8 lg:grid-cols-4'>
      {[...Array(itemsPerPage)].map((_, id) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: id * 0.1 }}
        >
          <div className='max-w-sm overflow-hidden shadow-lg bg-gray-800 text-white'>
            <div className='w-full h-48 bg-gray-700 animate-pulse'></div>
            <div className="p-4">
              <div className='h-4 bg-gray-700 rounded mb-2 animate-pulse'></div>
              <div className='h-4 bg-gray-700 rounded mb-2 w-3/4 animate-pulse'></div>
              <div className='h-3 bg-gray-700 rounded mb-4 w-full animate-pulse'></div>
              <div className='h-3 bg-gray-700 rounded mb-2 w-2/3 animate-pulse'></div>
              <div className='h-3 bg-gray-700 rounded w-1/2 animate-pulse'></div>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  )

  const indexOfLastItem = CurrentPage * itemsPerPage
  const indexOf1stitem = indexOfLastItem - itemsPerPage
  const currentItems = Data.slice(indexOf1stitem, indexOfLastItem)

  const totalPages = Math.ceil(Data.length / itemsPerPage)
  const paginate = (page) => setCurrentPage(page)

  const nextPage = () => {
    if (CurrentPage < totalPages)
      setCurrentPage(CurrentPage + 1)
  }

  const prevPage = () => {
    if (CurrentPage > 1)
      setCurrentPage(CurrentPage - 1)
  }

  const pageNum = []
  for (let i = 1; i <= totalPages; i++) {
    pageNum.push(i)
  }

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <section className='grid grid-cols-1 lg:px-3 gap-8 lg:grid-cols-4'>
            {currentItems.map((item, id) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: id * 0.1 }}
                  whileHover={{ scale: 0.9, y: 10 }}
                >
                  <Link to={`/blog/${item.id}`} key={id} className='max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-950 text-white'>
                    <img src={item.imgurl} className='w-full h-48 object-cover' alt="" />
                    <div className="p-4">
                      <p className='text-sm mb-2'>{item.title.substring(0, 20)}</p>
                      <p className='mb-4'>{item.shortdesc.substring(0, 60)}</p>
                      <p className='text-xs '>Author:~Hammad Raza</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </section>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8">
              <button
                className={`px-3 py-2 text-white rounded bg-gray-500 ${CurrentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-700'}`}
                disabled={CurrentPage === 1}
                onClick={prevPage}
              >
                Prev
              </button>

              {/* center buttons based on length */}
              {pageNum.map((number, id) => {
                return (
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 0.9, y: 10 }}
                  >
                    <button onClick={() => paginate(number)} key={number} className={`${CurrentPage === number ? 'bg-red-500' : 'bg-gray-500'} rounded px-3 mx-2 py-2 text-white bg-gray-500`}>
                      {number}
                    </button>
                  </motion.div>
                )
              })}

              <button
                className={`px-3 py-2 mx-1 rounded ${CurrentPage === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-700'} text-white`}
                disabled={CurrentPage === totalPages}
                onClick={nextPage}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BlogSec;