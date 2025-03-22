import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const sliderData = [
    {
      img: 'https://media.istockphoto.com/id/1443887485/photo/young-adult-black-male-music-singer-passionately-singing-in-a-beautiful-illuminated-studio.jpg?s=1024x1024&w=is&k=20&c=QTqDvluCi8F1oZuLny0QBvw-sUQYRD6d9pgsqeR08BQ=', // Suggestion: Abstract, artistic image
      title: 'Stay Tune',
      description: 'Something extraordinary is brewing... Prepare for an experience that will elevate your senses and leave you wanting more. Mark your calendars – the unveiling is coming soon!',
    },
    {
      img: 'https://media.istockphoto.com/id/2160318527/photo/woman-photographing-a-catrina.jpg?s=1024x1024&w=is&k=20&c=vWsS4G9B0MBHNREsFJs-dpDweSl-KFiF9tf-O8RDt5o=', // Suggestion:  Mysterious, behind-the-scenes image
      title: 'Stay Tune',
      description: 'The countdown has begun! Get ready to witness something truly special.  A fusion of talent, creativity, and innovation is on the horizon. Dont miss the grand reveal!',
    },
    {
      img: 'https://media.istockphoto.com/id/938763258/photo/young-male-singer-with-a-microphone-performing-on-stage-in-backlit.jpg?s=1024x1024&w=is&k=20&c=xJLEvdpnpT5nmRQ1ico6x0dQT41T0sIe-hJelbI-FLg=', // Suggestion:
      title: 'Stay Tune',
      description: 'Excitement is in the air! Were working on something incredible that you wont want to miss. Prepare to be amazed, inspired, and thoroughly entertained. Stay tuned for more details!',
    },
  ];
  
const UpComingHome = () => {
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="max-w-7xl mx-auto overflow-hidden text-gray-500">
                <h1 className='font-bold text-4xl my-4'>Upcoming Events</h1>
                <div className="relative h-80 w-full overflow-hidden">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={slide}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <img src={sliderData[slide].img} className='w-full h-full object-cover' alt={`Slide ${slide}`} />
                            <div className="flex flex-col justify-center items-center absolute inset-0 bg-black bg-opacity-50">
                                <p className='font-bold text-2xl'>{sliderData[slide].title}</p>
                                <p className='text-center w-1/2'>{sliderData[slide].description}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default UpComingHome;