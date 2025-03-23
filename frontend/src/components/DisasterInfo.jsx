import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFire, FaHouseCrack, FaTornado, FaWater } from "react-icons/fa6";

const disasters = [
  {
    title: "Disaster",
    description: "Disasters from natural calamities like hurricanes, earthquakes, floods, and conflicts.",
    icon: <FaFire className="text-red-500 text-4xl" />,
  },
  {
    title: "Earthquakes",
    description: "Earthquakes occur when there's a sudden release of energy in the Earth's crust, causing the ground to shake.",
    icon: <FaHouseCrack className="text-gray-500 text-4xl" />,
  },
  {
    title: "Tornado",
    description: "Tornadoes are powerful, rapidly rotating columns of air extending from thunderstorms to the ground.",
    icon: <FaTornado className="text-blue-500 text-4xl" />,
  },
  {
    title: "Floods",
    description: "Floods are natural disasters characterized by the overflowing of water onto land that is usually dry.",
    icon: <FaWater className="text-blue-600 text-4xl" />,
  },
];

const DisasterInfo = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  return (
    <div className="relative bg-cover bg-center py-16" style={{ backgroundImage: "url('/images/rescurer2.webp')" }}>
      <div className="container mx-auto px-6">
        {/* Heading Section */}
        <div className="text-center mb-8">
          <span className="text-lg font-semibold text-white uppercase tracking-wide">Help</span>
          <h2 className="text-4xl font-bold text-white mt-2">Help Today</h2>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {disasters.map((disaster, index) => (
            <div key={index} className="relative w-full h-48">
              <motion.div
                className="w-full h-full relative preserve-3d transition-transform duration-500"
                animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
                onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
              >
                {/* Front Side */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 backface-hidden">
                  {disaster.icon}
                  <h3 className="text-lg font-semibold mt-4">{disaster.title}</h3>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg shadow-lg p-6 transform rotate-y-180 backface-hidden">
                  <h3 className="text-lg font-semibold">{disaster.title}</h3>
                  <p className="text-sm text-center mt-2">{disaster.description}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisasterInfo;
