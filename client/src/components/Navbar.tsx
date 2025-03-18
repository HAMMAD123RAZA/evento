import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { CiSaveUp2 } from "react-icons/ci";
import { motion, AnimatePresence } from 'framer-motion';

const NavbarData = {
  menu: [
    { title: "Home", href: '/' },
    { title: "Events", href: '/events' },
    { title: "blog", href: '/blog' },
    { title: "User", href: '/user' }
  ]
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" }
  };

  return (
    <>
      <motion.div 
        className="bg-gray-950 text-red-500 p-5 h-24 w-full flex justify-between items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-gray-200 to-red-300 text-2xl font-bold"
          whileHover={{ scale: 1.8 }}
          whileTap={{ scale: 0.9 }}
          animate={{ x: 20, rotate: 360 }}
          transition={{ duration: 0.9 }}


        >
          Evento
        </motion.div>
        
        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="flex space-x-6">
            {NavbarData.menu.map((item, id) => (
              <motion.li key={id} whileHover={{ scale: 1.6 }} whileTap={{ scale: 0.9 }}>
                <Link to={item.href} className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-red-500 hover:bg-gradient-to-r hover:from-white hover:via-red-500 hover:to-white transition-all ease-in-out duration-300 hover:border-b-2 border-gray-500">
                  {item.title}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex md:items-center space-x-4">
          <motion.div whileHover={{ scale: 1.8 }} whileTap={{ scale: 0.9 }}>
            <CiSaveUp2 className='cursor-pointer' size={28} onClick={() => navigate('/saved')} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.8 }} whileTap={{ scale: 0.9 }}>
            <Link className='bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-gray-200 to-red-300' to='/user/register'>Register</Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <motion.button 
          className='md:hidden' 
          onClick={toggleMobileMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <BiMenu color='white' size={32} />
        </motion.button>
      </motion.div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-black w-full"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
          >
            <ul className='flex flex-col p-4'>
              {NavbarData.menu.map((item, id) => (
                <motion.li 
                  key={id} 
                  className="mb-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link to={item.href} className="block text-white hover:text-red-400" onClick={toggleMobileMenu}>
                    {item.title}
                  </Link>
                </motion.li>
              ))}
              <motion.li 
                className="mb-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/user/register" className="block text-white hover:text-red-400" onClick={toggleMobileMenu}>
                  Register
                </Link>
              </motion.li>
              <motion.li 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/saved" className="block text-white hover:text-red-400" onClick={toggleMobileMenu}>
                  Save
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;