import React, { useEffect, useState } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { BsSave2 } from 'react-icons/bs';
import { FaShare } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import RElatedItem from './RElatedItem';
import axios from 'axios';
import PageWrapper from './PageWrapper';
import { motion } from 'framer-motion';

export default function DetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Like, setLike] = useState(0);
  const userData = JSON.parse(localStorage.getItem('user'));
  const userEmail = userData.user.email;

  const handleBuy = async (data) => {
    if (!data || !data.title || !data.date || !data.venue || !data.description || !data.time) {
      alert('Invalid event details');
      return;
    }

    const emailData = {
      title: data.title,
      date: data.date,
      venue: data.venue,
      description: data.description,
      time: data.time,
    };

    try {
      const api = await axios.post('http://localhost:8080/send_email_Request', { emailData, userEmail });
      alert('Alright your request is in processing');
      console.log(api.data);
    } catch (error) {
      console.log('oh sorry something wrong', error);
      alert('oh sorry something wrong');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/get/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        if (Array.isArray(result) && result.length > 0) {
          setData(result[0]);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSave = (data) => {
    const savedCards = JSON.parse(localStorage.getItem('savedCards') || '[]');
    if (!savedCards.find((items) => items.id === data.id)) {
      savedCards.push(data);
      localStorage.setItem('savedCards', JSON.stringify(savedCards));
      alert('Card Saved');
    } else {
      alert('Card Already Saved');
    }
  };

  const handleShare = (data) => {
    const eventUrl = `https://chat.deepseek.com/card/${data.id}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(eventUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;
  if (!data) return <p className="text-center mt-5">No data found</p>;

  return (
    <div>
      <PageWrapper>
        <div className="flex flex-col md:flex-row gap-8 px-4 md:px-14 items-center my-3">
          <div className="w-full md:w-auto">
            <img
              className="w-full md:w-80 h-48 md:h-80 object-cover rounded"
              src={data.imgurl}
              alt={data.title}
            />
          </div>

          <div className="w-full md:w-auto">
            <h1 className="text-2xl md:text-3xl text-gray-200 font-bold">{data.title}</h1>
            <p className="text-gray-100 max-w-xl mt-2">{data.description}</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
              <p className="text-gray-100">{data.date || 'N/A'}</p>
              <p className="text-gray-100">{data.time || 'N/A'}</p>
              <p className="text-gray-100">{data.venue || 'Unknown'}</p>
            </div>
            <div className="flex py-3 items-center gap-4">
              <motion.div whileHover={{ scale: 0.9, y: 10 }} whileTap={{ scale: 0.8 }}>
                <FaShare size={24} color="red" onClick={() => handleShare(data)} className="cursor-pointer" />
              </motion.div>
              <motion.div whileHover={{ scale: 0.9, y: 10 }} whileTap={{ scale: 0.8 }}>
                <BsSave2 onClick={() => handleSave(data)} size={24} color="red" className="cursor-pointer" />
              </motion.div>
            </div>
            <button onClick={() => handleBuy(data)} className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-md mt-4">
              Buy Ticket
            </button>
          </div>
        </div>

        <div className="py-5">
          <h1 className="pl-4 md:pl-12 py-3 font-bold text-2xl md:text-4xl text-red-500">Related Events</h1>
          <RElatedItem data={data} id={id} />
        </div>
      </PageWrapper>
    </div>
  );
}