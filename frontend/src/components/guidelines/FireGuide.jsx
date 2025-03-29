import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FireGuide = () => {
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

  const flickerVariants = {
    initial: { opacity: 0.8 },
    animate: {
      opacity: [0.8, 1, 0.9, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
      {/* Fire-Themed Background */}
      <motion.div 
        className="fixed inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Fire gradient layer */}
        <motion.div
          className="absolute inset-0"
          initial={{ background: "linear-gradient(to bottom, #000000, #7F0000, #FF0000)" }}
          animate={{
            background: [
              "linear-gradient(to bottom, #000000, #7F0000, #FF0000)",
              "linear-gradient(to bottom, #000000, #8B0000, #FF4500)",
              "linear-gradient(to bottom, #000000, #7F0000, #FF0000)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Animated fire flicker */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, #FF8C00 0%, transparent 70%)
            `,
            backgroundSize: '200% 200%',
          }}
          variants={flickerVariants}
          initial="initial"
          animate="animate"
        />
        
        {/* Floating embers */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-orange-500/50"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
            }}
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 40 - 20],
              opacity: [1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "linear"
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
            className="inline-flex items-center justify-center bg-orange-500/20 p-3 rounded-full mb-4"
            animate={{
              y: [0, -5, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.3 }
            }}
          >
            Fire Emergency Preparedness Guide
          </motion.h1>
          
          <motion.p
            className="text-xl text-orange-100 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.4 }
            }}
          >
            Essential knowledge to protect yourself and others during fire emergencies
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
          <div className="inline-flex bg-orange-800 rounded-full p-1">
            {["before", "during", "after", "first-aid"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-orange-200 hover:text-white"
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
            className="bg-orange-800/70 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-orange-700/50"
          >
            {/* Before Fire */}
            {activeTab === "before" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold mb-6 text-orange-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Fire Prevention & Preparation
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-orange-500/20 p-2 rounded-lg">
                        <span className="text-orange-300 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Install Smoke Alarms</h3>
                        <p className="text-orange-100">
                          Place alarms on every level, inside bedrooms, and outside sleeping areas.
                          Test monthly and replace batteries yearly.
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-orange-500/20 p-2 rounded-lg">
                        <span className="text-orange-300 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Create Escape Plans</h3>
                        <p className="text-orange-100">
                          Plan two ways out of every room. Practice fire drills twice a year
                          with all household members.
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-orange-500/20 p-2 rounded-lg">
                        <span className="text-orange-300 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Fireproof Your Home</h3>
                        <p className="text-orange-100">
                          Keep flammables away from heat sources. Store matches/lighters safely.
                          Maintain electrical systems.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="space-y-6"
                  >
                    <div className="bg-orange-700/50 p-6 rounded-xl border border-orange-600/30">
                      <h3 className="font-semibold text-orange-200 mb-3">Fire Safety Kit</h3>
                      <ul className="space-y-2 text-orange-100">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✓ Fire extinguisher (ABC-rated)</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✓ Fire escape ladder (for multi-story homes)</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✓ Flashlight with extra batteries</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >✓ Emergency contact numbers</motion.li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* During Fire */}
            {activeTab === "during" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold mb-6 text-orange-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  What To Do During a Fire
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-orange-500/10 p-6 rounded-xl border border-orange-500/20"
                    >
                      <h3 className="font-semibold text-lg text-orange-300 mb-3">Immediate Actions</h3>
                      <p className="text-orange-100">
                        Get out immediately and call emergency services. Crawl low under smoke.
                        Feel doors for heat before opening - use alternate exits if hot.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-orange-400/20 p-2 rounded-lg">
                        <span className="text-orange-300 font-bold">!</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">If Trapped</h3>
                        <p className="text-orange-100">
                          Close doors and seal vents/cracks with wet cloth. Signal from window
                          with flashlight or light-colored cloth.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-orange-400/20 p-2 rounded-lg">
                        <span className="text-orange-300 font-bold">!</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Using Fire Extinguisher</h3>
                        <p className="text-orange-100">
                          Remember PASS: Pull pin, Aim low, Squeeze lever, Sweep side to side.
                          Only attempt if fire is small and contained.
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="bg-orange-700/50 p-6 rounded-xl border border-orange-600/30"
                    >
                      <h3 className="font-semibold text-orange-200 mb-3">Critical Don'ts</h3>
                      <ul className="space-y-2 text-orange-100">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✗ Don't stop to gather belongings</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✗ Don't use elevators</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✗ Don't re-enter burning buildings</motion.li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* After Fire */}
            {activeTab === "after" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold mb-6 text-orange-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  What To Do After a Fire
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-orange-500/20 p-2 rounded-lg">
                        <span className="text-orange-300 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Safety First</h3>
                        <p className="text-orange-100">
                          Only return when authorities say it's safe. Watch for structural damage,
                          electrical hazards, and gas leaks.
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-orange-500/20 p-2 rounded-lg">
                        <span className="text-orange-300 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Document Damage</h3>
                        <p className="text-orange-100">
                          Take photos before cleanup. Contact insurance immediately.
                          Keep receipts for all expenses.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-orange-700/50 p-6 rounded-xl border border-orange-600/30"
                    >
                      <h3 className="font-semibold text-orange-200 mb-3">Recovery Steps</h3>
                      <ul className="space-y-2 text-orange-100">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✓ Contact local disaster relief services</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✓ Check with fire department before cleaning</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✓ Discard contaminated food/cosmetics</motion.li>
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
                  className="text-2xl font-bold mb-6 text-orange-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Fire-Related First Aid
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-orange-500/10 p-6 rounded-xl border border-orange-500/20"
                    >
                      <h3 className="font-semibold text-lg text-orange-300 mb-3">Burn Treatment</h3>
                      <ol className="space-y-3 text-orange-100">
                        <motion.li
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >1. Cool burn with cool (not cold) running water for 10-15 minutes</motion.li>
                        <motion.li
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >2. Remove jewelry/tight clothing before swelling</motion.li>
                        <motion.li
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >3. Cover loosely with sterile non-stick bandage</motion.li>
                      </ol>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-orange-700/50 p-6 rounded-xl border border-orange-600/30"
                    >
                      <h3 className="font-semibold text-orange-200 mb-3">Fire First Aid Kit</h3>
                      <ul className="grid grid-cols-2 gap-2 text-orange-100">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✓ Burn gel or dressings</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✓ Sterile gauze pads</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✓ Emergency blanket</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >✓ Breathing barrier mask</motion.li>
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="bg-red-500/10 p-6 rounded-xl border border-red-500/20"
                    >
                      <h3 className="font-semibold text-lg text-red-300 mb-2">Smoke Inhalation</h3>
                      <p className="text-orange-100">
                        Get to fresh air immediately. Seek medical attention for breathing
                        difficulties, dizziness, or confusion.
                      </p>
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
          className="mt-12 text-center text-orange-200 text-sm"
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            This information is for educational purposes only. Always follow local emergency instructions.
          </motion.p>
          <motion.p 
            className="mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            Practice fire safety drills regularly with all household members.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default FireGuide;