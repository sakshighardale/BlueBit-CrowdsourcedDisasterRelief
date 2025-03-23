import React from "react";
import Footer from "./Footer";
import backgroundImage from "../assets/background.png";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/scrollImages/img1.jpg";
import img2 from "../assets/scrollImages/img2.jpg";
import img3 from "../assets/scrollImages/img3.png";
import img4 from "../assets/scrollImages/img4.jpg";
import img5 from "../assets/scrollImages/img5.jpg";
import img6 from "../assets/scrollImages/img6.jpg";
import img7 from "../assets/scrollImages/img7.png";
// import DisasterInfo from "./DisasterInfo";




const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const intervalRef = useRef();

  // Your images array
  const images = [img1, img2, img3, img4, img5, img6, img7];

  // Calculate visible items based on container width
  useEffect(() => {
    const calculateVisibleItems = () => {
      if (containerRef.current && imageRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const imageWidth = imageRef.current.offsetWidth;
        const gap = 44; // Match your gap-8 (32px)
        const visible = Math.floor(containerWidth / (imageWidth + gap));
        setVisibleItems(Math.max(1, visible));
      }
    };

    const observer = new ResizeObserver(calculateVisibleItems);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Auto-scroll
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  // Calculate scroll position
  const scrollX = -currentIndex * (100 / visibleItems);



  return (
    <>
      <AnimatePresence>
        {/* Background Section */}
        <div
          className="relative w-full h-screen bg-cover mb-[0.1rem] bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-opacity-60"></div>

          {/* Hero Section */}
          <div className="relative z-10 text-white text-center max-w-3xl px-6">
            <motion.button
              className="px-4 py-2 text-white text-4xl font-bold uppercase tracking-wide"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Helping Bridge
            </motion.button>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Give a helping hand to those who need it!
            </motion.h1>

            <motion.p
              className="text-lg mt-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Whenever God gives disaster, they also send helping hands to save you.
            </motion.p>

            <motion.button
              className="mt-4 flex items-center justify-center space-x-2 text-lg text-white hover:text-gray-300"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <span>▶ Watch the video</span>
            </motion.button>

            {/* Button Container Modified */}
            <motion.div
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <Link to="/donate" className="w-full sm:w-auto">
                <Button text="Donate Relief" className="w-full sm:w-48 px-4 py-1" />
              </Link>
              <Link to="/report" className="w-full sm:w-auto">
                <Button text="Report Disaster" className="w-full sm:w-48 px-4 py-1" />
              </Link>

            </motion.div>
          </div>
        </div>


{/* disaster information
<DisasterInfo/> */}


        {/* div for displaying disaster related images */}

        {/* Disaster Image Carousel */}
        <motion.div
          className="relative h-96 w-full my-16 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100 to-transparent" />

          {/* Carousel Container */}
          {/* Disaster Image Carousel */}
          <div className="w-full py-12 overflow-hidden">
            <div
              ref={containerRef}
              className="relative h-64 w-full"
              onMouseEnter={() => clearInterval(intervalRef.current)}
              onMouseLeave={() => {
                intervalRef.current = setInterval(() => {
                  setCurrentIndex(prev => (prev + 1) % images.length);
                }, 3000);
              }}
            >
              <motion.div
                className="absolute flex gap-8 h-full"
                animate={{ x: `${scrollX}%` }}
                transition={{ type: 'tween', duration: 0.8 }}
              >
                {images.map((img, index) => (
                  <motion.div
                    key={index}
                    ref={index === 0 ? imageRef : null}
                    className="relative w-64 h-64 shrink-0 rounded-lg overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={img}
                      alt={`Disaster ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Navigation Arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/30 rounded-full backdrop-blur-sm hover:bg-white/50"
                onClick={() => setCurrentIndex(prev => (prev - 1 + images.length) % images.length)}
              >
                ←
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/30 rounded-full backdrop-blur-sm hover:bg-white/50"
                onClick={() => setCurrentIndex(prev => (prev + 1) % images.length)}
              >
                →
              </button>
            </div>
          </div>
        </motion.div>

        <Footer />
      </AnimatePresence>
    </>
  );
};

export default LandingPage;