import React from 'react'
import { AiFillLike } from 'react-icons/ai'
import { BsSave2 } from 'react-icons/bs'
import { FaShare } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

export default function DetailPage() {
  const { id } = useParams()
  console.log(id)

  return (
    <div>
      <div className="flex gap-8 px-4 items-center my-3 ">
        <div>
          <img
            className="w-full h-40 object-cover rounded"
            src="https://cdn-cjhkj.nitrocdn.com/krXSsXVqwzhduXLVuGLToUwHLNnSxUxO/assets/images/optimized/rev-b135bb1/spotme.com/wp-content/uploads/2020/07/Hero-1.jpg "
            alt=""
            style={{ width: '21rem', height: '24rem' }}
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mt-4">Title</h1>
          <p className="text-gray-700 max-w-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
            voluptatibus, soluta ad magnam blanditiis, iure deserunt aut
            incidunt recusandae iste dignissimos beatae perspiciatis sed
            explicabo quo fuga quod nobis sint! voluptatibus, soluta ad magnam
            blanditiis, iure deserunt aut incidunt recusandae iste dignissimos
            beatae perspiciatis sed explicabo quo fuga quod nobis sint!
            voluptatibus, soluta ad magnam blanditiis, iure deserunt aut
            incidunt recusandae iste dignissimos beatae perspiciatis sed
            explicabo quo fuga quod nobis sint! voluptatibus, soluta ad magnam
            blanditiis, iure deserunt aut incidunt recusandae iste dignissimos
            beatae perspiciatis sed explicabo quo fuga quod nobis sint!
          </p>
          <div className="flex items-center gap-9 mt-4">
            <p className="text-gray-600">2025-09-01</p>
            <p className="text-gray-600">10:00</p>
            <p className="mt-2 text-gray-800 font">USA</p>
          </div>
           <div className=" flex py-3 items-center  gap-4">
                <AiFillLike size={24} color='red' />
                <FaShare size={24} color='red'/>
                <BsSave2 size={24} color='red'/>
                </div>
        </div>
      </div>
    </div>
  )
}
