import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const EarthquakeGuide = () => {
  const [activeTab, setActiveTab] = useState("before");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
      {/* Enhanced Animated Background */}
      <motion.div 
        className="fixed inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Base gradient layer with subtle animation */}
        <motion.div
          className="absolute inset-0"
          initial={{ background: "linear-gradient(to bottom right, #111827, #1f2937, #374151)" }}
          animate={{
            background: [
              "linear-gradient(to bottom right, #111827, #1f2937, #374151)",
              "linear-gradient(to bottom left, #111827, #1f2937, #374151)",
              "linear-gradient(to top right, #111827, #1f2937, #374151)"
            ]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Animated seismic waves */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, #ffffff 10%, transparent 70%)
            `,
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating tectonic plates with physics-based animation */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-yellow-400/30 rounded-lg"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              rotate: Math.random() * 360,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 100 + 50}px`,
            }}
            animate={{
              x: [null, Math.random() * 50 - 25],
              y: [null, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              type: "spring",
              damping: 5,
              stiffness: 20
            }}
          />
        ))}
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              type: "spring",
              stiffness: 100,
              damping: 10
            }
          }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center justify-center bg-red-500/20 p-3 rounded-full mb-4"
            variants={floatingVariants}
            animate="float"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-300"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.3 }
            }}
          >
            Earthquake Preparedness Guide
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.4 }
            }}
          >
            Essential knowledge to protect yourself and others during seismic events
          </motion.p>
        </motion.div>

        {/* Animated Navigation Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.5 }
          }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-gray-800 rounded-full p-1">
            {["before", "during", "after", "first-aid"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-red-500 text-white shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab === "before" && "Before"}
                {tab === "during" && "During"}
                {tab === "after" && "After"}
                {tab === "first-aid" && "First Aid"}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content with Animated Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50"
          >
            {/* Before Earthquake */}
            {activeTab === "before" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold mb-6 text-yellow-300 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Preparation Before an Earthquake
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-red-500/20 p-2 rounded-lg">
                        <span className="text-red-400 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Secure Your Space</h3>
                        <p className="text-gray-300">
                          Anchor heavy furniture to walls, install latches on cabinets, 
                          and place heavy objects on lower shelves.
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-red-500/20 p-2 rounded-lg">
                        <span className="text-red-400 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Create Emergency Kits</h3>
                        <p className="text-gray-300">
                          Prepare a "go bag" with water, food, flashlight, batteries, 
                          first aid supplies, medications, and important documents.
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-red-500/20 p-2 rounded-lg">
                        <span className="text-red-400 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Plan & Practice</h3>
                        <p className="text-gray-300">
                          Identify safe spots in each room and conduct earthquake drills 
                          with your family every 6 months.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="space-y-6"
                  >
                    <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600/30">
                      <h3 className="font-semibold text-yellow-300 mb-3">Emergency Kit Checklist</h3>
                      <ul className="space-y-2 text-gray-300">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✓ Water (1 gallon per person per day)</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✓ Non-perishable food (3+ day supply)</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✓ First aid kit + medications</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >✓ Flashlight + extra batteries</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >✓ Whistle (to signal for help)</motion.li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* During Earthquake */}
            {activeTab === "during" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold mb-6 text-yellow-300 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  What To Do During an Earthquake
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-red-500/10 p-6 rounded-xl border border-red-500/20"
                    >
                      <h3 className="font-semibold text-lg text-red-400 mb-3">DROP, COVER, and HOLD ON</h3>
                      <p className="text-gray-300">
                        Immediately drop to your hands and knees to prevent being knocked down.
                        Cover your head and neck with your arms and seek additional shelter under 
                        sturdy furniture if nearby. Hold on until shaking stops.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-yellow-500/20 p-2 rounded-lg">
                        <span className="text-yellow-400 font-bold">!</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">If Indoors</h3>
                        <p className="text-gray-300">
                          Stay inside - don't run outside. Stay away from windows, 
                          exterior walls, and objects that could fall.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-yellow-500/20 p-2 rounded-lg">
                        <span className="text-yellow-400 font-bold">!</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">If Outdoors</h3>
                        <p className="text-gray-300">
                          Move to an open area away from buildings, trees, streetlights, 
                          and utility wires. Drop to the ground and protect your head.
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="bg-gray-700/50 p-6 rounded-xl border border-gray-600/30"
                    >
                      <h3 className="font-semibold text-yellow-300 mb-3">Remember</h3>
                      <ul className="space-y-2 text-gray-300">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✓ Expect aftershocks</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✓ Don't use elevators</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✓ If near shore, move to higher ground</motion.li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* After Earthquake */}
            {activeTab === "after" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold mb-6 text-yellow-300 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  What To Do After an Earthquake
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <span className="text-green-400 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Check for Injuries</h3>
                        <p className="text-gray-300">
                          Provide first aid to anyone who needs it. Don't move seriously 
                          injured people unless they're in immediate danger.
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <span className="text-green-400 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Inspect Your Surroundings</h3>
                        <p className="text-gray-300">
                          Check for structural damage, gas leaks, electrical system damage, 
                          and water line breaks. Evacuate if the building is unsafe.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-gray-700/50 p-6 rounded-xl border border-gray-600/30"
                    >
                      <h3 className="font-semibold text-yellow-300 mb-3">Safety Checklist</h3>
                      <ul className="space-y-2 text-gray-300">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✓ Wear sturdy shoes</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✓ Check for fires</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✓ Shut off utilities if damaged</motion.li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* First Aid */}
            {activeTab === "first-aid" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold mb-6 text-yellow-300 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Earthquake First Aid Guide
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-red-500/10 p-6 rounded-xl border border-red-500/20"
                    >
                      <h3 className="font-semibold text-lg text-red-400 mb-3">Serious Bleeding</h3>
                      <ol className="space-y-3 text-gray-300">
                        <motion.li
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >1. Apply direct pressure with clean cloth</motion.li>
                        <motion.li
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >2. Elevate injured area if possible</motion.li>
                        <motion.li
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >3. Use pressure points if needed</motion.li>
                      </ol>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-gray-700/50 p-6 rounded-xl border border-gray-600/30"
                    >
                      <h3 className="font-semibold text-yellow-300 mb-3">First Aid Kit Essentials</h3>
                      <ul className="grid grid-cols-2 gap-2 text-gray-300">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✓ Sterile gauze pads</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✓ Adhesive bandages</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✓ Antiseptic wipes</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >✓ Medical tape</motion.li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 0.8 }
          }}
          className="mt-12 text-center text-gray-400 text-sm"
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            This information is for educational purposes only. Consult local authorities for region-specific guidelines.
          </motion.p>
          <motion.p 
            className="mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            Regularly review and practice your earthquake preparedness plan.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default EarthquakeGuide;