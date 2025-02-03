import React, { useState } from 'react';
import AdWrapper from './AdWrapper';
import axios from 'axios';

const EventCreate = () => {
  const [data, setData] = useState({
    title: '',
    Venue: '',
    date: '',
    time: '',
    Description: '',
    imgurl: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const api = await axios.post('http://localhost:8080/admin/event/add', data);
      console.log(api.data);
      alert('Event submitted successfully!');
      setData({
        title: '',
        Venue: '',
        date: '',
        time: '',
        Description: '',
        imgurl: ''
      });
    } catch (error) {
      console.log(error);
      alert('Failed to submit event. Please try again.');
    }
  };

  return (
    <AdWrapper>
      <section className='p-6 bg-white w-full rounded-lg h-screen shadow-md'>
        <h1 className='text-3xl font-bold'>Create Event</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='font-semibold' htmlFor="title">Title</label> <br />
            <input
              required
              onChange={handleChange}
              value={data.title}
              type="text"
              name="title"
              placeholder='Title'
              className='py-4 w-full my-3 border-2 border-gray-200 rounded-md'
            />
          </div>
          <div>
            <label className='font-semibold' htmlFor="Venue">Venue</label> <br />
            <input
              required
              onChange={handleChange}
              value={data.Venue}
              type="text"
              name="Venue"
              placeholder='Venue'
              className='py-4 w-full my-3 border-2 border-gray-200 rounded-md'
            />
          </div>
          <div>
            <label className='font-semibold' htmlFor="date">Date</label> <br />
            <input
              required
              onChange={handleChange}
              value={data.date}
              type="date"
              name="date"
              placeholder='Date'
              className='py-4 w-full my-3 border-2 border-gray-200 rounded-md'
            />
          </div>
          <div>
            <label className='font-semibold' htmlFor="time">Time</label> <br />
            <input
              required
              onChange={handleChange}
              value={data.time}
              type="time"
              name="time"
              placeholder='Time'
              className='py-4 w-full my-3 border-2 border-gray-200 rounded-md'
            />
          </div>
          <div>
            <label className='font-semibold' htmlFor="Description">Description</label> <br />
            <input
              required
              onChange={handleChange}
              value={data.Description}
              type="text"
              name="Description"
              placeholder='Description'
              className='py-4 w-full my-3 border-2 border-gray-200 rounded-md'
            />
          </div>
          <div>
            <label className='font-semibold' htmlFor="imgurl">Image URL</label> <br />
            <input
              required
              onChange={handleChange}
              value={data.imgurl}
              type="text"
              name="imgurl"
              placeholder='Image URL'
              className='py-4 w-full my-3 border-2 border-gray-200 rounded-md'
            />
          </div>
          <button
            type="submit"
            className='font-bold py-3 px-5 my-3 text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-lg border-2 border-red-500'
          >
            Create
          </button>
        </form>
      </section>
    </AdWrapper>
  );
};

export default EventCreate;