import React from 'react';
import { Link } from 'react-router-dom'; // Corrected import for Link

const menuItems = [
  {
    name: "Profile",
    active: false,
    link: "/profile",
    icons: 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
  },
  {
    name: "Dashboard",
    active: false,
    link: "/dashboard",
    icons: 'https://www.shutterstock.com/image-vector/dashboard-vector-icon-website-other-600nw-1421089664.jpg'
  },
  {
    name: "events",
    active: false,
    link: "/admin/event/list",
    icons: 'https://thumbs.dreamstime.com/b/calendar-date-date-notes-business-office-event-icon-template-black-color-editable-calendar-date-symbol-flat-vector-illustration-171286982.jpg'
  }
];

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="flex flex-col bg-gray-300 h-screen w-64 p-2">
        {menuItems.map((item, id) => (
          <div key={id} className='flex items-center gap-3 hover:bg-gray-100 transition-all duration-300 p-2 rounded'>
            <img src={item.icons} className='w-8 h-8 object-cover rounded-full' alt={item.name} />
            <Link to={item.link} className="text-lg font-medium">
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;