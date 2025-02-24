import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { CiSaveUp2 } from "react-icons/ci";

const NavbarData = {
  menu: [
    { title: "Home", href: '/' },
    { title: "About", href: '/about' },
    { title: "Contact", href: '/contact' },
    { title: "Services", href: '/services' },
  ]
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="bg-gray-700 text-red-500 p-5 h-24 w-full flex justify-between items-center">
        <div className=" bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-gray-200 to-red-300 text-2xl font-bold">Evento</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="flex space-x-6">
            {NavbarData.menu.map((item, id) => (
              <li key={id}>
                <Link to={item.href} className="hover:text-red-400">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex md:items-center space-x-4">
          <CiSaveUp2 className='cursor-pointer' size={28} onClick={() => navigate('/saved')} />
          <Link className='bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-gray-200 to-red-300' to='/user/register'>Register</Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button className='md:hidden' onClick={toggleMobileMenu}>
          <BiMenu color='white' size={32} />
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-gray-700 w-full`}>
        <ul className='flex flex-col p-4'>
          {NavbarData.menu.map((item, id) => (
            <li key={id} className="mb-2">
              <Link to={item.href} className="block text-white hover:text-red-400" onClick={toggleMobileMenu}>
                {item.title}
              </Link>
            </li>
          ))}
          <li className="mb-2">
            <Link to="/user/register" className="block text-white hover:text-red-400" onClick={toggleMobileMenu}>
              Register
            </Link>
          </li>
          <li>
            <Link to="/saved" className="block text-white hover:text-red-400" onClick={toggleMobileMenu}>
              Save
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;