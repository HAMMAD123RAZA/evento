import React from 'react'
import AdWrapper from './AdWrapper'

const EventCreate = () => {
  return (
    <AdWrapper>
        <section className=' p-6 bg-white w-full rounded-lg h-screen shadow-md '>
            <h1 className='text-3xl font-bold'>Create Event</h1>
            <div>
            <label className='font-semibold' htmlFor="">Title</label> <br />
            <input type="text" name="title" placeHolder='Title' className='py-4 w-full my-3 border-2 border-gray-200 rounded-md' />
            </div>
            <div>
            <label className='font-semibold' htmlFor="">Venue</label> <br />
            <input type="text" name="Venue" placeHolder='Venue' className='py-4 w-full my-3 border-2 border-gray-200 rounded-md' />
            </div>
            <div>
            <label className='font-semibold' htmlFor="">date</label> <br />
            <input type="date" name="date" placeHolder='date' className='py-4 w-full my-3 border-2 border-gray-200 rounded-md' />
            </div>
            <div>
            <label className='font-semibold' htmlFor="">time</label> <br />
            <input type="time" name="time" placeHolder='time' className='py-4 w-full my-3 border-2 border-gray-200 rounded-md' />
            </div>
            <div>
            <label className='font-semibold' htmlFor="">Description</label> <br />
            <input type="text" name="Description" placeHolder='Description' className='py-4 w-full my-3 border-2 border-gray-200 rounded-md' />
            </div>
            <div>
            <label className='font-semibold' htmlFor="">Image Url</label> <br />
            <input type="text" name="Image Url" placeHolder='Image Url' className='py-4 w-full my-3 border-2 border-gray-200 rounded-md' />
            </div>
        </section>
    </AdWrapper>
  )
}

export default EventCreate