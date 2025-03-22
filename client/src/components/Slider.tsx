import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sliderData = [
  {
    img: 'https://cdn.pixabay.com/photo/2020/05/11/09/03/conductor-5157153_1280.jpg',
    title: 'Piano Music & Spiritual Awakening',
    description:
      'Immerse yourself in the soothing sounds of piano music and embark on a journey of spiritual discovery. This event combines the beauty of classical melodies with moments of reflection and mindfulness, leaving you feeling refreshed and inspired.',
  },
  {
    img: 'https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=1024x1024&w=is&k=20&c=iCUzJvudLPi2HnpAAzIVVqgQVAlnI9TigkEcXcH2NY4=',
    title: 'Career & School Guidance Workshop',
    description:
      "Navigate your future with confidence! Our career and school guidance workshop offers expert advice, personalized strategies, and valuable resources to help you make informed decisions about your education and career path. Discover your potential and unlock your success.",
  },
  {
    img: 'https://cdn.pixabay.com/photo/2023/04/03/12/59/crowd-7896788_1280.jpg',
    title: 'Dance & Music Fusion Festival',
    description:
      'Experience the electrifying energy of our Dance & Music Fusion Festival! A vibrant celebration of movement and sound, featuring captivating performances, interactive workshops, and unforgettable moments. Get ready to groove to the rhythm and let your spirit soar!',
  },
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlide = (direction: string) => {
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlide('next');
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={sliderData[currentSlide].img}
            alt={sliderData[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-4">
            <motion.h2
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-red-500 via-white to-red-300"
            >
              {sliderData[currentSlide].title}
            </motion.h2>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center w-full md:w-1/2 font-bold bg-gradient-to-r bg-clip-text text-transparent from-red-500 via-white to-red-300"
            >
              {sliderData[currentSlide].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-400 bg-opacity-50 text-white p-2 rounded-full"
        onClick={() => handleSlide('prev')}
      >
        &#8592;
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-400 bg-opacity-50 text-white p-2 rounded-full"
        onClick={() => handleSlide('next')}
      >
        &#8594;
      </motion.button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderData.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}