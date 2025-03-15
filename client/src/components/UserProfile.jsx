import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageWrapper from './PageWrapper';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [msg, setMsg] = useState('');
  const [getMsg, setgetMsg] = useState([])
  const userData = JSON.parse(localStorage.getItem('user'));
  const user = userData?.user;
  const token = userData?.token; // Retrieve the token from localStorage
console.log('token from profile:',token)

  const handleSubmitMsg = async (e) => {
    e.preventDefault();
    try {
      console.log('Request Payload:', { email: user?.email, message: msg });
      console.log('Token:', token);
  
      const api = await axios.post(
        'http://localhost:8080/send_msg',
        {
          email: user?.email,
          message: msg,
          
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      setMsg('');
      alert('Message sent successfully');
    } catch (error) {
      console.log('Error in frontend for sending message:', error);
      alert('Error in sending message');
    }
  };

  const FetchingMsg =async()=>{
    try {
      const api=await axios.get('http://localhost:8080/get_msg')
      setgetMsg(api.data.data)
      if(!api.data){
        console.log('data is not fetched')
      } else{
        console.log("msg:",api.data)
      }
    } catch (error) {
      console.log("err fetching msg:",error)
    }
  }
  
  useEffect(()=>{
    FetchingMsg()
  },[])

  return (
    <>
      {/* Tabs */}
      <PageWrapper>
      <div className='text-white flex space-x-10 my-6 mx-3'>
        <button onClick={() => setActiveTab('Profile')}>Profile</button>
        <button onClick={() => setActiveTab('Message')}>Messaging</button>
      </div>

      {activeTab === 'Profile' && (
        <div className='my-5 text-white'>
          <h1 className='font-bold text-white'>User Profile</h1>
          <div className='flex flex-col space-y-3'>
            <p>User name: <span>{user?.name}</span></p>
            <p>User email: <span>{user?.email}</span></p>
          </div>
        </div>
      )}

      {activeTab === 'Message' && (
        <div className='m-3  '>
          <h2 className='font-bold text-white text-2xl'>Send Message</h2>
          <form onSubmit={handleSubmitMsg} className='py-3  max-w-lg'>
            <textarea
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              className='text-white bg-gray-800 w-full rounded-lg'
              cols={62}
              rows={8}
              required
              placeholder='Type your message here...'
            ></textarea>
            <button className='bg-red-500 w-full my-3 px-7 py-4 text-white font-bold rounded-lg hover:bg-red-600'>
              Send
            </button>
          </form>

          {/* Messages and replies */}
          <div className='text-white my-3' >
          <div className="max-w-lg rounded-md  ">
            {getMsg.map((item, index) => (
              <div key={index} className="bg-gray-800 p-6 mb-4 rounded-md">
                <div className="flex justify-between items-center ">
                <p className="text-white">{item.msg}</p>
                <p>{item.person}</p>
                </div>
                <p className='my-3' >{item.time}</p>

                {/* {item.reply && (
                  <div className="mt-2 bg-gray-700 p-2 rounded-md">
                    <p className="text-white">{item.reply}</p>
                  </div>
                )} */}
              </div>
            ))}
          </div>
          </div>
        </div>
      )}
</PageWrapper>
    </>
  );
};

export default UserProfile;