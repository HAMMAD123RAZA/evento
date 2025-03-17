import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdWrapper from './AdWrapper';
import axios from 'axios';

const EventCreate = () => {
  const location = useLocation(); // Access the location object
  const navigate = useNavigate(); 
  const [data, setData] = useState({
    title: '',
    venue: '',
    date: '',
    time: '',
    description: '',
    imgurl: ''
  });

  useEffect(() => {
    if (location.state && location.state.event) {
      setData(location.state.event);
    }
  }, [location]); 

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.id) {
        // Update existing event
        await axios.put(`http://localhost:8080/admin/update/${data.id}`, data);
        alert('Event updated successfully!');
      } else {
        // Create new event
        await axios.post('http://localhost:8080/admin/event/add', data);
        alert('Event submitted successfully!');
        setData({
          title: '',
          venue: '',
          date: '',
          time: '',
          description: '',
          imgurl: ''
        });
      }
      navigate('/admin/event/list'); 
    } catch (error) {
      console.log(error);
      alert('Failed to submit event. Please try again.');
    }
  };

  return (
    // <AdWrapper>
      <section className='p-6 overflow-auto bg-gray-500 w-full rounded-lg h-screen shadow-md'>
        <h1 className='text-3xl font-bold'>{data.id ? 'Edit Event' : 'Create Event'}</h1>
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
              className='py-4 bg-gray-400 w-full my-3 border-2 border-gray-200 rounded-md'
            />
          </div>
          <div>
            <label className='font-semibold' htmlFor="venue">Venue</label> <br />
            <input
              required
              onChange={handleChange}
              value={data.venue}
              type="text"
              name="venue"
              placeholder='Venue'
              className='py-4 bg-gray-400 w-full my-3 border-2 border-gray-200 rounded-md'
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
              className='py-4 bg-gray-400 w-full my-3 border-2 border-gray-200 rounded-md'
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
              className='py-4 bg-gray-400 w-full my-3 border-2 border-gray-200 rounded-md'
            />
          </div>
          <div>
            <label className='font-semibold' htmlFor="description">Description</label> <br />
            <input
              required
              onChange={handleChange}
              value={data.description}
              type="text"
              name="description"
              placeholder='Description'
              className='py-4 bg-gray-400 w-full my-3 border-2 border-gray-200 rounded-md'
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
              className='py-4 bg-gray-400 w-full my-3 border-2 border-gray-200 rounded-md'
            />
          </div>
          <button
            type="submit"
            className='font-bold py-3 px-5 my-3 text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-lg border-2 border-red-500'
          >
            {data.id ? 'Update' : 'Create'}
          </button>
        </form>
      </section>
  );
};

export default EventCreate;