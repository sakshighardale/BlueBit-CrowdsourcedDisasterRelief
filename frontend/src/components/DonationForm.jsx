import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    paymentMethod: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setFormData({ name: "", email: "", amount: "", paymentMethod: "" });

      // Redirect to map after 3 seconds
      setTimeout(() => {
        navigate("/map");
      }, 3000);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 p-8 rounded-xl shadow-lg max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-black text-center mb-6">Donate Relief</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full p-3 rounded-lg bg-gray-200 text-black placeholder-gray-500 outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-black font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-gray-200 text-black placeholder-gray-500 outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-black font-semibold mb-1">Donation Amount ($)</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              className="w-full p-3 rounded-lg bg-gray-200 text-black placeholder-gray-500 outline-none"
              min="1"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-black font-semibold mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              className="w-full p-3 rounded-lg bg-gray-200 text-black outline-none"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select payment method</option>
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="razorpay">Razorpay</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? <span className="loading loading-spinner"></span> : "Donate Now"}
          </motion.button>
        </form>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-purple-300 text-black rounded-lg text-center font-semibold"
            >
              🎉 Thank you for your donation! Redirecting to the map...
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DonationForm;
