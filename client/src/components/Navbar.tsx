import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { Link } from 'react-router-dom';

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <div className="flex justify-between px-7 items-center h-16 bg-gray-800 text-white shadow-sm font-mono">
        <div className='Evento'>Logo</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className='flex space-x-6'>
            {NavbarData.menu.map((item, id) => (
              <li key={id}>
                <Link to={item.href} className="hover:text-gray-400">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Login and Save Icons */}
          <div className="flex space-x-4">
            <Link to="/user/login" className="hover:text-gray-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                ></path>
              </svg>
            </Link>
            <Link to="/saved" className="hover:text-gray-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                ></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
<BiMenu size={32} />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-gray-800`}>
        <ul className="flex flex-col space-y-4 p-4">
          {NavbarData.menu.map((item, id) => (
            <li key={id}>
              <Link
                to={item.href}
                className="block text-white hover:text-gray-400"
                onClick={toggleMobileMenu}
              >
                {item.title}
              </Link>
            </li>
          ))}

          {/* Login and Save Icons in Mobile Menu */}
          <li>
            <Link to="/user/login" className="block text-white hover:text-gray-400" onClick={toggleMobileMenu}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/saved" className="block text-white hover:text-gray-400" onClick={toggleMobileMenu}>
              Save
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;