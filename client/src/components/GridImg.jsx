import React from 'react';
import { motion } from 'framer-motion';

const imageData1 = [
  {
    id: 1,
    imageUrl: "https://plus.unsplash.com/premium_photo-1682497887035-c5412e60d1e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    imageUrl: "https://media.istockphoto.com/id/2080779787/photo/singer-of-music-band-performing-on-stage-light-and-smoke-effects.jpg?s=1024x1024&w=is&k=20&c=w8BaZywQC6FE4-HkJsUAIyIFoqUVt8ZiWvI2qCgSnQ8=",
  },
];

const imageData2 = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    imageUrl: "https://media.istockphoto.com/id/1080830898/photo/band-of-two.jpg?s=1024x1024&w=is&k=20&c=TL3RhsJHBX6M5hTd37RS_h_sR84nfGZOxQRgapFLiCY=",
  },
  {
    id: 3,
    imageUrl: "https://media.istockphoto.com/id/848525662/photo/rock-band-live-concert.jpg?s=1024x1024&w=is&k=20&c=4WLCSm12HpC_y_usxDdd_xX3iipVjdpnUscbXwH3lYg=",
  },
];

const GridImg = () => {
  // Animation variants for the images
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  // Animation variants for the text overlay
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      {/* First Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:p-16">
        {imageData1.map((item, id) => (
          <motion.div
            key={id}
            className="relative overflow-hidden"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <img
              src={item.imageUrl}
              alt=""
              className="lg:w-full w-96 h-full px-4 lg:px-7 object-cover"
            />
            <motion.div
              className="flex flex-col justify-center items-center absolute inset-0 w-full h-full bg-gray-500 bg-opacity-0 hover:bg-opacity-50 text-white rounded-md transition-all duration-300"
              variants={textVariants}
              whileHover="visible"
            >
              <h1 className="text-2xl font-bold">{item.heading}</h1>
              <p>{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </section>

      {/* Second Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 lg:p-12">
        {imageData2.map((item, id) => (
          <motion.div
            key={id}
            className="relative overflow-hidden"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <img
              src={item.imageUrl}
              alt=""
              className="w-96 h-full px-4 object-cover"
            />
            <motion.div
              className="flex flex-col justify-center items-center absolute inset-0 w-full h-full bg-gray-500 bg-opacity-0 hover:bg-opacity-50 text-white rounded-md transition-all duration-300"
              variants={textVariants}
              whileHover="visible"
            >
              <h1 className="text-2xl font-bold">{item.heading}</h1>
              <p>{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </section>
    </>
  );
};

export default GridImg;