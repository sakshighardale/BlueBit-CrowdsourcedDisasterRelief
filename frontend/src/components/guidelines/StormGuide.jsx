import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const StormGuide = () => {
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

  const stormVariants = {
    initial: { opacity: 0.8 },
    animate: {
      opacity: [0.7, 0.9, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-800 text-blue-200">
      {/* Storm-Themed Background */}
      <motion.div 
        className="fixed inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Storm gradient layer */}
        <motion.div
          className="absolute inset-0"
          initial={{ background: "linear-gradient(to bottom, #0f172a, #1e293b, #334155)" }}
          animate={{
            background: [
              "linear-gradient(to bottom, #0f172a, #1e293b, #334155)",
              "linear-gradient(to bottom, #0f172a, #1e40af, #334155)",
              "linear-gradient(to bottom, #0f172a, #1e293b, #334155)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Animated rain effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, transparent 95%, #ffffff 100%)
            `,
            backgroundSize: '100% 20px',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '0% 100%']
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Lightning flashes */}
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          variants={stormVariants}
          initial="initial"
          animate="animate"
        />
        
        {/* Wind-blown debris */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gray-400 rounded-sm"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              rotate: Math.random() * 360,
              width: `${Math.random() * 30 + 5}px`,
              height: `${Math.random() * 5 + 2}px`,
            }}
            animate={{
              x: [null, Math.random() * 200 - 100],
              y: [null, Math.random() * 100 + 100],
              rotate: [null, Math.random() * 360]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "loop"
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
            className="inline-flex items-center justify-center bg-blue-500/20 p-3 rounded-full mb-4"
            animate={{
              rotate: [0, 5, -5, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10l7 7-7-7zm0 0l7-7-7 7z" />
            </svg>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-900"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.3 }
            }}
          >
            Storm Emergency Preparedness Guide
          </motion.h1>
          
          <motion.p
            className="text-xl text-blue-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.4 }
            }}
          >
            Essential knowledge for hurricanes, tornadoes, and severe weather events
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
          <div className="inline-flex bg-blue-800 rounded-full p-1">
            {["before", "during", "after", "first-aid"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-blue-200 hover:text-white"
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
            className="bg-blue-800/70 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-blue-700/50"
          >
            {/* Before Storm */}
            {activeTab === "before" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold mb-6 text-blue-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Storm Preparation
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <span className="text-blue-300 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Secure Your Property</h3>
                        <p className="text-blue-100">
                          Install storm shutters or board up windows. Secure outdoor items.
                          Trim trees and remove dead branches.
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <span className="text-blue-300 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Create Emergency Plans</h3>
                        <p className="text-blue-100">
                          Identify evacuation routes and shelter locations. Establish family
                          communication plans if separated.
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <span className="text-blue-300 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Prepare Supplies</h3>
                        <p className="text-blue-100">
                          Stock non-perishable food, water, medications, and batteries.
                          Prepare for potential power outages.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="space-y-6"
                  >
                    <div className="bg-blue-700/50 p-6 rounded-xl border border-blue-600/30">
                      <h3 className="font-semibold text-blue-200 mb-3">Storm Survival Kit</h3>
                      <ul className="space-y-2 text-blue-100">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✓ Battery-powered weather radio</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✓ Flashlights + extra batteries</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✓ Emergency whistle</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >✓ Waterproof documents container</motion.li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* During Storm */}
            {activeTab === "during" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold mb-6 text-blue-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Surviving the Storm
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/20"
                    >
                      <h3 className="font-semibold text-lg text-blue-300 mb-3">Immediate Actions</h3>
                      <p className="text-blue-100">
                        Monitor emergency broadcasts. Move to the lowest interior room
                        (for tornadoes) or evacuate if ordered (for hurricanes).
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-blue-400/20 p-2 rounded-lg">
                        <span className="text-blue-300 font-bold">!</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">If Shelter Needed</h3>
                        <p className="text-blue-100">
                          Stay away from windows. Use mattresses or heavy furniture for
                          protection. Cover with blankets.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-blue-400/20 p-2 rounded-lg">
                        <span className="text-blue-300 font-bold">!</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">If Caught Outside</h3>
                        <p className="text-blue-100">
                          Find low ground away from trees/poles. Lie flat in a ditch if
                          tornado approaches. Never drive through flood waters.
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="bg-blue-700/50 p-6 rounded-xl border border-blue-600/30"
                    >
                      <h3 className="font-semibold text-blue-200 mb-3">Critical Don'ts</h3>
                      <ul className="space-y-2 text-blue-100">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✗ Don't use candles (fire risk)</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✗ Don't touch downed power lines</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✗ Don't go outside during eye of hurricane</motion.li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* After Storm */}
            {activeTab === "after" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold mb-6 text-blue-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Post-Storm Recovery
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <span className="text-blue-300 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Safety First</h3>
                        <p className="text-blue-100">
                          Watch for hazards like broken glass, downed power lines,
                          and gas leaks. Avoid flood waters which may be contaminated.
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <span className="text-blue-300 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Document Damage</h3>
                        <p className="text-blue-100">
                          Take photos before cleanup. Contact insurance immediately.
                          Keep receipts for all storm-related expenses.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-blue-700/50 p-6 rounded-xl border border-blue-600/30"
                    >
                      <h3 className="font-semibold text-blue-200 mb-3">Recovery Checklist</h3>
                      <ul className="space-y-2 text-blue-100">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✓ Check for structural damage</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✓ Discard spoiled food</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✓ Boil water if advised</motion.li>
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
                  className="text-2xl font-bold mb-6 text-blue-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Storm-Related First Aid
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/20"
                    >
                      <h3 className="font-semibold text-lg text-blue-300 mb-3">Injury Treatment</h3>
                      <ol className="space-y-3 text-blue-100">
                        <motion.li
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >1. Control bleeding with direct pressure</motion.li>
                        <motion.li
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >2. Clean wounds with clean water</motion.li>
                        <motion.li
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >3. Immobilize suspected fractures</motion.li>
                      </ol>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-blue-700/50 p-6 rounded-xl border border-blue-600/30"
                    >
                      <h3 className="font-semibold text-blue-200 mb-3">Storm First Aid Kit</h3>
                      <ul className="grid grid-cols-2 gap-2 text-blue-100">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✓ Waterproof bandages</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✓ Antiseptic wipes</motion.li>
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
                        >✓ Water purification tablets</motion.li>
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="bg-red-500/10 p-6 rounded-xl border border-red-500/20"
                    >
                      <h3 className="font-semibold text-lg text-red-300 mb-2">Hypothermia</h3>
                      <p className="text-blue-100">
                        For cold exposure: Remove wet clothing, warm core first (chest/groin),
                        give warm (not hot) drinks if conscious.
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
          className="mt-12 text-center text-blue-500 text-sm"
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
            Different storms require different preparations - know your local risks.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default StormGuide;