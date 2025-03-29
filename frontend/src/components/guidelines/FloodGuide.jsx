import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FloodGuide = () => {
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
    <div className="relative min-h-screen overflow-hidden bg-blue-900 text-white">
      {/* Enhanced Water-Themed Background */}
      <motion.div 
        className="fixed inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Water gradient layer */}
        <motion.div
          className="absolute inset-0"
          initial={{ background: "linear-gradient(to bottom, #1e3a8a, #3b82f6, #93c5fd)" }}
          animate={{
            background: [
              "linear-gradient(to bottom, #1e3a8a, #3b82f6, #93c5fd)",
              "linear-gradient(to bottom, #1e40af, #2563eb, #60a5fa)",
              "linear-gradient(to bottom, #1e3a8a, #3b82f6, #93c5fd)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Animated water waves */}
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
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating water droplets */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
            animate={{
              y: [null, Math.random() * 100],
              x: [null, Math.random() * 30 - 15],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
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
            className="inline-flex items-center justify-center bg-blue-500/20 p-3 rounded-full mb-4"
            variants={floatingVariants}
            animate="float"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.3 }
            }}
          >
            Flood Emergency Preparedness Guide
          </motion.h1>
          
          <motion.p
            className="text-xl text-blue-100 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.4 }
            }}
          >
            Essential knowledge to stay safe during flood events
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
            {/* Before Flood */}
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
                  Preparation Before a Flood
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
                        <h3 className="font-semibold text-lg">Know Your Risk</h3>
                        <p className="text-blue-100">
                          Check flood maps for your area and know evacuation routes. 
                          Identify whether your property is in a flood-prone zone.
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
                        <h3 className="font-semibold text-lg">Prepare Your Property</h3>
                        <p className="text-blue-100">
                          Install check valves in plumbing, elevate electrical components, 
                          and use waterproofing compounds on walls.
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
                        <h3 className="font-semibold text-lg">Create Emergency Kits</h3>
                        <p className="text-blue-100">
                          Prepare waterproof "go bags" with supplies for at least 3 days 
                          including medications, important documents, and drinking water.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="space-y-6"
                  >
                    <div className="bg-blue-700/50 p-6 rounded-xl border border-blue-600/30">
                      <h3 className="font-semibold text-blue-200 mb-3">Flood Emergency Kit</h3>
                      <ul className="space-y-2 text-blue-100">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✓ Waterproof container with important documents</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✓ Life jackets for each family member</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✓ Waterproof flashlight + batteries</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >✓ Water purification tablets</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >✓ Waterproof first aid kit</motion.li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* During Flood */}
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
                  What To Do During a Flood
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/20"
                    >
                      <h3 className="font-semibold text-lg text-blue-300 mb-3">Immediate Actions</h3>
                      <p className="text-blue-100">
                        Move to higher ground immediately if in a flood-prone area. 
                        Do not wait for instructions if flash flooding is possible.
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
                        <h3 className="font-semibold text-lg">If Indoors</h3>
                        <p className="text-blue-100">
                          Move to the highest level of your home. Do not go into the attic 
                          unless you have roof access - you could become trapped.
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
                        <h3 className="font-semibold text-lg">If Outdoors</h3>
                        <p className="text-blue-100">
                          Climb to high ground immediately. Just 6 inches of moving water 
                          can knock you down, and 1 foot can sweep your vehicle away.
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
                        >✗ Don't walk through moving water</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✗ Don't drive in flood waters</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✗ Don't touch electrical equipment if wet</motion.li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* After Flood */}
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
                  What To Do After a Flood
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
                          Return home only when authorities say it's safe. Watch for 
                          downed power lines and contaminated water.
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
                          Take photos of damage for insurance claims before cleanup. 
                          Contact your insurance company immediately.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-blue-700/50 p-6 rounded-xl border border-blue-600/30"
                    >
                      <h3 className="font-semibold text-blue-200 mb-3">Cleanup Safety</h3>
                      <ul className="space-y-2 text-blue-100">
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >✓ Wear protective gear (gloves, masks, boots)</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >✓ Disinfect everything that got wet</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✓ Watch for mold growth</motion.li>
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
                  Flood-Related First Aid
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/20"
                    >
                      <h3 className="font-semibold text-lg text-blue-300 mb-3">Hypothermia Treatment</h3>
                      <ol className="space-y-3 text-blue-100">
                        <motion.li
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >1. Move to warm, dry area</motion.li>
                        <motion.li
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >2. Remove wet clothing</motion.li>
                        <motion.li
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >3. Warm center of body first (chest, neck, groin)</motion.li>
                      </ol>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-blue-700/50 p-6 rounded-xl border border-blue-600/30"
                    >
                      <h3 className="font-semibold text-blue-200 mb-3">Flood-Specific First Aid Kit</h3>
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
                        >✓ Antibiotic ointment</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >✓ Water purification tablets</motion.li>
                        <motion.li 
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >✓ Thermal blanket</motion.li>
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
          className="mt-12 text-center text-blue-200 text-sm"
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
            Flood risks vary by region - know your local flood warning systems.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default FloodGuide;