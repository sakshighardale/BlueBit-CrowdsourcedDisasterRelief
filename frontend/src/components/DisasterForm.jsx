import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

const DisasterForm = ({ location, loadingLocation, error }) => {
  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!type || !severity || !state) {
      alert("Please fill all required fields!");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("type", type);
    formData.append("severity", severity);
    formData.append("state", state);
    formData.append("description", description);
    formData.append("location", JSON.stringify(location));
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/disasters/report",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        alert("Disaster reported successfully!");
        window.location.href = "/map";
      }
    } catch (error) {
      console.error("Error reporting disaster:", error);
      alert("Failed to report disaster.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Disaster Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Base image with parallax effect */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://external-preview.redd.it/til-the-costliest-natural-disaster-in-us-is-severe-v0-CmB9GtjIlfVUtE6K7YfGSSTvfmLVG5PgdgLnoSvXoAU.jpg?width=1080&crop=smart&auto=webp&s=48466da81cc8d49640c281cd464851b3f6144f9a')`,
            y: scrollPosition * 0.3,
            scale: 1.1
          }}
        ></motion.div>
        
        {/* Animated overlay elements */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Floating emergency elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-16 h-16 bg-red-500/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute top-1/3 right-1/3 w-8 h-8 bg-white/10 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
        
        {/* Emergency grid overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'pan 30s linear infinite'
          }}
        ></div>
      </div>

      {/* Form Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/30"
      >
        {/* Emergency Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
          </div>
          <div className="relative z-10">
            <motion.h1 
              className="text-3xl font-bold text-white flex items-center gap-3"
              animate={{ x: [0, -2, 2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Emergency Disaster Report
            </motion.h1>
            <p className="text-red-100 mt-1">Your report helps save lives - please provide accurate information</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-800 mb-6 p-4 bg-red-100 rounded-lg border border-red-200 flex items-start gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="font-semibold">Location Error</h3>
                  <p>{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Card */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-blue-50/70 p-5 rounded-xl border border-blue-200/70 backdrop-blur-sm"
            >
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Current Location
              </h3>
              {loadingLocation ? (
                <div className="flex items-center gap-3 text-blue-700">
                  <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Detecting your location...</span>
                </div>
              ) : location ? (
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Coordinates detected</p>
                    <p className="text-xs text-blue-600">Lat: {location.lat.toFixed(4)} | Lng: {location.lng.toFixed(4)}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-800">Location services disabled</p>
                    <p className="text-xs text-red-600">Please enable location services for accurate reporting</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Disaster Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <span className="text-red-500 font-bold">*</span>
                <span>Disaster Type</span>
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white/90"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Select Disaster Type</option>
                <option value="flood" className="flex items-center gap-2">
                  🌊 Flood
                </option>
                <option value="earthquake">🌍 Earthquake</option>
                <option value="fire">🔥 Fire/Wildfire</option>
                <option value="storm">⛈️ Severe Storm</option>
                <option value="landslide">⛰️ Landslide</option>
                <option value="tsunami">🌊 Tsunami</option>
                <option value="cyclone">🌀 Cyclone/Hurricane</option>
                <option value="drought">☀️ Drought</option>
                <option value="other">⚠️ Other Emergency</option>
              </select>
            </div>

            {/* Severity Level */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <span className="text-red-500 font-bold">*</span>
                <span>Severity Level</span>
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white/90"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                required
              >
                <option value="">Select Severity Level</option>
                <option value="low" className="text-green-600">🟢 Low - Minor incident</option>
                <option value="medium" className="text-yellow-600">🟡 Medium - Significant impact</option>
                <option value="high" className="text-orange-600">🔴 High - Life-threatening</option>
                <option value="critical" className="text-red-600">⚠️ Critical - Large-scale emergency</option>
              </select>
            </div>

            {/* State Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <span className="text-red-500 font-bold">*</span>
                <span>State/Region</span>
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white/90"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="">Select State/Region</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Delhi">Delhi</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Other">Other Region</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Additional Details
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white/90 h-40"
                placeholder="Provide critical details about the situation (affected area, casualties, immediate needs, etc.)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Upload Images (Optional)
              </label>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="relative cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-all hover:border-red-400 hover:bg-red-50/20 group"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  multiple
                />
                <div className="flex flex-col items-center justify-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {imageFile ? (
                    <div className="text-center">
                      <p className="font-medium text-red-600">{imageFile.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Click to change image</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                        Drag & drop images here or click to browse
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG (Max 5MB each)</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-3 group"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting Emergency Report...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Submit Emergency Report</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes pan {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @keyframes pulse {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default DisasterForm;