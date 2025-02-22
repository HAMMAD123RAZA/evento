import React from 'react'

export default function LoadingScreen() {
  return (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md w-64 animate-pulse">
            <div className="w-full h-48 object-cover rounded-t-lg bg-gray-300"></div>
            <div className="p-3">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-4 w-4 bg-gray-300 rounded"></div>
                ))}
              </div>
              <div className="h-10 bg-gray-300 rounded mt-3"></div>
            </div>
          </div>
        ))}
      </div> 
    </>
  )
}