// pages/Report.jsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DisasterForm from '../components/DisasterForm';
import Footer from '../components/Footer';

const Report = () => {
  // const [isLoggedIn] = useState(true);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      
      setLoadingLocation(false);
      return;
    }


    // Get user's current location when the page loads
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoadingLocation(false);
      },
      (error) => {
        setError("Please enable location services to report disasters");
        setLoadingLocation(false);
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (!location) {
      setError('Location is required');
      return;
    }

    try {
      console.log('Submitting:', Object.fromEntries(formData));
      // Reset form
      setError('');
      setImageFile(null);
      alert('Report submitted successfully!');
    } catch (err) {
      setError('Submission failed. Please try again.');
    }
  };

//   if (!isLoggedIn) return <Navigate to="/auth/login" replace />; to be done later phase

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
      >
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <DisasterForm
          onSubmit={handleSubmit}
          location={location}
          loadingLocation={loadingLocation}
          error={error}
          imageFile={imageFile}
          setImageFile={setImageFile}
          />
      </div>
    </motion.div>
    
    <Footer/>
          </>
  );
};

export default Report;