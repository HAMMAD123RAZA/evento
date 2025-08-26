import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageWrapper from './PageWrapper';
import { redirect, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [msg, setMsg] = useState('');
  const [getMsg, setgetMsg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user'));
  const user = userData?.user;
  const token = userData?.token;
  const navigate = useNavigate();

  const handleSubmitMsg = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const api = await axios.post(
        'http://localhost:8080/send_msg',
        {
          email: user?.email,
          message: msg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg('');
      setIsLoading(false);
      alert('Message sent successfully');
    } catch (error) {
      console.log('Error in frontend for sending message:', error);
      setIsLoading(false);
      alert('Error in sending message');
    }
  };

  const FetchingMsg = async () => {
    try {
      const api = await axios.get('http://localhost:8080/get_msg');
      setgetMsg(api.data.data);
      if (!api.data) {
        console.log('data is not fetched');
      } else {
        console.log("msg:", api.data);
      }
    } catch (error) {
      console.log("err fetching msg:", error);
    }
  };

  useEffect(() => {
    FetchingMsg();
  }, []);

  useEffect(() => {
    if (!user || !userData) {
      return navigate('/user/login');
    }
  });

  return (
    <>
      <PageWrapper>
        <div className="min-h-screen bg-black text-white">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-black to-red-900 p-6">
            <h1 className="text-3xl font-bold">User Dashboard</h1>
            <p className="text-red-400">Welcome back, {user?.name}</p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-red-800 mx-6">
            <button
              className={`py-4 px-6 font-bold text-lg ${activeTab === 'Profile' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-red-400'}`}
              onClick={() => setActiveTab('Profile')}
            >
              Profile
            </button>
            <button
              className={`py-4 px-6 font-bold text-lg ${activeTab === 'Message' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-red-400'}`}
              onClick={() => setActiveTab('Message')}
            >
              Messaging
            </button>
          </div>

          {/* Profile Tab Content */}
          {activeTab === 'Profile' && (
            <div className="p-6">
              <div className="bg-gray-900 rounded-lg shadow-lg p-6 max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-red-500">User Profile</h2>
                
                <div className="flex items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-red-900 flex items-center justify-center text-3xl font-bold text-red-300">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold">{user?.name}</h3>
                    <p className="text-red-400">{user?.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-red-400 font-semibold mb-2">Account Type</h4>
                    <p>Standard User</p>
                  </div>
<div className="bg-gray-800 p-4 rounded-lg">
  <h4 className="text-red-400 font-semibold mb-2">Last Login</h4>
  <p>
    {user?.loginTime ? (
      new Date(user.loginTime).toLocaleString()
    ) : (
      // Fallback if loginTime doesn't exist
     new Date().toLocaleDateString().slice(0, 19).replace('T', ' ')
    )}
  </p>
</div>
                </div>
                
              </div>
            </div>
          )}

          {/* Message Tab Content */}
          {activeTab === 'Message' && (
            <div className="p-6">
              <div className="w-full maxxl">
                <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-red-500">Send Message To Us</h2>
                  <form onSubmit={handleSubmitMsg}>
                    <textarea
                      onChange={(e) => setMsg(e.target.value)}
                      value={msg}
                      className="w-full bg-gray-800 text-white rounded-lg p-4 focus:ring-2 focus:ring-red-500 focus:outline-none"
                      rows={6}
                      required
                      placeholder="Type your message here..."
                    ></textarea>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`mt-4 w-full py-3 px-6 rounded-lg font-bold ${isLoading ? 'bg-red-800 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} transition-colors`}
                    >
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>

                {/* Messages and replies */}
                {/* <h3 className="text-xl font-bold mb-4 text-red-500">Message History</h3>
                
                {getMsg.length > 0 ? (
                  <div className="space-y-4">
                    {getMsg.map((item, index) => (
                      <div key={index} className="bg-gray-900 rounded-lg p-5 border-l-4 border-red-600">
                        <div className="flex justify-between items-start">
                          <p className="text-white">{item.msg}</p>
                          <span className="bg-red-900 text-red-200 text-xs font-medium px-2.5 py-0.5 rounded">
                            {item.person}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">{item.time}</p>

                        {item.reply && (
                          <div className="mt-4 bg-gray-800 p-4 rounded-lg border-t border-red-800">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold">A</div>
                              </div>
                              <div className="ml-3">
                                <h4 className="text-red-400 font-semibold">Admin Response</h4>
                                <p className="text-white">{item.reply}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-900 rounded-lg p-6 text-center">
                    <p className="text-gray-400">No messages yet. Send us a message above!</p>
                  </div>
                )} */}
              </div>
            </div>
          )}
        </div>
      </PageWrapper>
    </>
  );
};

export default UserProfile;