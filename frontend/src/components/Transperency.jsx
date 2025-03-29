import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/donate/donations";

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(API_URL);
        setDonations(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading donations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-red-500 text-lg font-medium"
          >
            Error loading donations: {error}
          </motion.div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
        >
          Recent Donations
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {donations.map((donation, index) => (
            <motion.div
              key={donation._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {donation.name}
                  </h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    ₹{donation.amount}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {donation.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Disaster:</span> {donation.typeDisaster}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Payment:</span> {donation.paymentMethod}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(donation.date).toLocaleDateString()}
                  </p>
                </div>

                {donation.comment && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-gray-600 italic">"{donation.comment}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {donations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No donations found</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DonationsList;
