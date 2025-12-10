import React, { useEffect, useState } from 'react';
import AdWrapper from './AdWrapper';
import axios from 'axios';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const fetchData = async () => {
    try {
      setLoading(true); 
      const [usersResponse, eventsResponse, blogsResponse] = await Promise.all([
        axios.get('http://localhost:8080/admin/getUsers'),
        axios.get('http://localhost:8080/get'),
        axios.get('http://localhost:8080/getAll/blogs'),
      ]);

      setUsers(usersResponse.data.data || []); 
      setEvents(eventsResponse.data || []);
      setBlogs(blogsResponse.data.blog || []);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error('Error fetching data:', err.message);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdWrapper>
        <div className="p-6 text-white">Loading....</div>
      </AdWrapper>
    )
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <AdWrapper>
      <div className="p-6">
        <h1 className="text-white text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
        <p className="text-white text-lg">Manage your events and users here.</p>

        {/* Quick Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-2xl font-bold mt-2">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Events</h2>
            <p className="text-2xl font-bold mt-2">{events.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Blogs</h2>
            <p className="text-2xl font-bold mt-2">{blogs.length}</p>
          </div>
        </div>
      </div>
    </AdWrapper>
  );
};

export default AdminHome;

