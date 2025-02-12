import React from 'react';
import AdWrapper from './AdWrapper';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  // const navigate=useNavigate()
  return (
    <>
      <AdWrapper>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your events and users here.</p>

          {/* Quick Stats Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-2xl font-bold mt-2">1,234</p>
              <p className="text-sm text-gray-500">+5% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Total Events</h2>
              <p className="text-2xl font-bold mt-2">56</p>
              <p className="text-sm text-gray-500">+10% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Active Events</h2>
              <p className="text-2xl font-bold mt-2">12</p>
              <p className="text-sm text-gray-500">3 upcoming this week</p>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/admin/event/create" className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                Create New Event
              </Link>
              <button className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                Manage Users
              </button>
              <button className="bg-purple-500 text-white p-4 rounded-lg shadow-md hover:bg-purple-600 transition duration-300">
                View Reports
              </button>
              <button className="bg-red-500 text-white p-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                Settings
              </button>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span>New user registered: John Doe</span>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Event "Tech Conference 2023" created</span>
                  <span className="text-sm text-gray-500">5 hours ago</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>User Jane Smith updated profile</span>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span>Tech Conference 2023</span>
                  <span className="text-sm text-gray-500">October 15, 2023</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Music Festival</span>
                  <span className="text-sm text-gray-500">November 1, 2023</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Business Networking Event</span>
                  <span className="text-sm text-gray-500">November 10, 2023</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AdWrapper>
    </>
  );
};

export default AdminHome;