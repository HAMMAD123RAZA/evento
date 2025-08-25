import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa"; // Corrected the import path
import {motion} from 'framer-motion'

const footerData = {
  AboutUs: {
    title: "About Us",
    links: [
      "Our Mission",
      "Our Team",
      "Contact Us",
      "FAQs",
      "Testimonials",
    ]
  },
  Events: {
    title: "Events",
    links: [
      "Upcoming Events",
      "Past Events",
      "Event Categories",
      "Event Calendar",
      "Event Blog",
    ]
  },
  Resources: {
    title: "Resources",
    links: [
      "Event Planning Guide",
      "Venue Finder",
      "Event Tips",
      "Industry News",
      "Downloads",
    ]
  },
  StayConnected: {
    title: "Stay Connected",
    links: [
      "Facebook",
      "Instagram",
      "Twitter",
      "LinkedIn",
      "Discord",
    ]
  },
}

const Footer = () => {
  return (
    <>
      <div className="bg-gray-950 max-w-7xl mx-auto h-full py-10 text-gray-400">
        {/* logo */}
        <h2 className="text-2xl font-bold text-center my-2 ">DEVELOPED BY HAMMAD RAZA</h2>

        <div className='flex justify-center gap-5 items-center py-8 cursor-pointer'>
          <motion.div
            whileHover={{ scale: 0.9, y: 20 }}
            initial={{ x: 0, rotate: 0 }}
            animate={{ x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaLinkedin />
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.9, y: 20 }}
            initial={{ x: 0, rotate: 0 }}
            animate={{ x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaTwitter />
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.9, y: 20 }}
            initial={{ x: 0, rotate: 0 }}
            animate={{ x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaFacebookF />
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.9, y: 20 }}
            initial={{ x: 0, rotate: 0 }}
            animate={{ x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaGithub />
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.9, y: 20 }}
            initial={{ x: 0, rotate: 0 }}
            animate={{ x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaDiscord />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  px-3">
          {Object.values(footerData).map((section, id) => {
            return (
              <div key={id}>
                <motion.div
                  className='font-bold text-white py-4'
                >{section.title}</motion.div>
                <ul>
                  {section.links.map((item, id) => {
                    return (
                      <motion.div whileHover={{ scale: 1, x: 20 }} key={id}>
                        <li className='text-white cursor-pointer'>{item}</li>
                      </motion.div>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Footer
