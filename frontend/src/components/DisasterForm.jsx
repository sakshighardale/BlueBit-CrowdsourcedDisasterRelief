// components/DisasterForm.jsx
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import Footer from './Footer';

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const inputVariants = {
  focus: { scale: 1.02, boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)' }
};

const DisasterForm = ({ 
  onSubmit, 
  location, 
  loadingLocation, 
  error, 
  imageFile, 
  setImageFile 
}) => {
  return (
    <>
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={formVariants}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Report Disaster</h1>
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Location Section */}
        <motion.div 
          className="bg-blue-50 p-4 rounded-lg"
          whileHover={{ scale: 1.005 }}
        >
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Location
          </h3>
          {loadingLocation ? (
            <div className="flex items-center gap-2 text-gray-600">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
              />
              Fetching your location...
            </div>
          ) : location ? (
            <div className="text-sm text-blue-700">
              Latitude: {location.lat.toFixed(4)}, 
              Longitude: {location.lng.toFixed(4)}
            </div>
          ) : (
            <div className="text-red-500">Location services disabled</div>
          )}
        </motion.div>

        {/* Form Fields */}
        <div className="space-y-6">
          <motion.div variants={formVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disaster Type *
            </label>
            <motion.select
              whileFocus="focus"
              variants={inputVariants}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="flood">🌊 Flood</option>
              <option value="earthquake">🌍 Earthquake</option>
              <option value="fire">🔥 Fire</option>
              <option value="storm">⛈️ Storm</option>
            </motion.select>
          </motion.div>

          <motion.div variants={formVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity *
            </label>
            <motion.select
              whileFocus="focus"
              variants={inputVariants}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Severity</option>
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </motion.select>
          </motion.div>

          <motion.div variants={formVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <motion.textarea
              whileFocus="focus"
              variants={inputVariants}
              className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the situation..."
            />
          </motion.div>

          <motion.div variants={formVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-600">
                  {imageFile ? imageFile.name : 'Click to upload disaster image'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          disabled={loadingLocation}
        >
          {loadingLocation ? (
            <div className="flex items-center justify-center gap-2">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Submitting...
            </div>
          ) : (
            'Submit Report'
          )}
        </motion.button>
      </form>
    </motion.div>
    
    </>
  );
};

export default DisasterForm;