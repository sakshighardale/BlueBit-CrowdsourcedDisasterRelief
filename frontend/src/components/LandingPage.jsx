import React from "react";
import Footer from "./Footer";
import backgroundImage from "../assets/background.png";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";

const LandingPage = () => {
  return (
    <>
      <AnimatePresence>

        {/* Background Section */}
        <div
          className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-opacity-60"></div>

          {/* Hero Section */}
          <div className="relative z-10 text-white text-center max-w-3xl px-6">
            <motion.button
              className="px-4 py-2  text-white text-4xl font-bold uppercase tracking-wide"
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
              className="text-lg mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Whenever God gives disaster, they also send helping hands to save you.
            </motion.p>

            <motion.button
              className="mt- flex items-center justify-around space-x-2 text-lg text-white hover:text-gray-300"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <span>▶ Watch the video</span>
              
            </motion.button>
            
            <div className="mt-9 w-40 h-10">
              <Button text={"Join Us"}/>
              </div>

          </div>
        </div>

        <Footer />
      </AnimatePresence>
    </>
  );
};

export default LandingPage;
