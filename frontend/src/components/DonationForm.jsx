import { useState } from "react";
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
  const navigate = useNavigate();

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

  // Disaster statistics data
  const disasterStats = [
    { value: "12,000+", label: "People Affected" },
    { value: "45+", label: "Villages Impacted" },
    { value: "3", label: "Critical Regions" },
    { value: "72hr", label: "Response Time" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://image.cnbcfm.com/api/v1/image/104891321-RTX3OCDD.jpg?v=1529452409"
          alt="Disaster relief workers helping"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/70 to-blue-700/50"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-4xl w-full relative z-10 border border-white/30" // Increased to max-w-4xl
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Disaster Information Block - Left Side */}
          <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/20 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Emergency Alert</h2>
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Flood Crisis in Southeast Asia
            </h3>
            <p className="mb-6 opacity-90">
              Catastrophic flooding has displaced thousands and destroyed
              critical infrastructure. Your donation provides immediate relief
              including food, clean water, and medical supplies.
            </p>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>$125,000 raised</span>
                <span>of $500,000 goal</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5">
                <div
                  className="bg-yellow-400 h-2.5 rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {disasterStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 p-3 rounded-lg text-center"
                >
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Last updated: 2 hours ago</span>
              </div>
            </div>
          </div>

          {/* Donation Form - Right Side */}
          <div className="md:w-2/3">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center bg-blue-100 rounded-full p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Emergency Relief Fund
              </h1>
              <p className="text-gray-600">
                Your support makes a direct impact in disaster-affected areas
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Donation Amount ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="amount"
                      placeholder="0.00"
                      className="w-full pl-8 px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      min="1"
                      step="0.01"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select payment method
                    </option>
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="razorpay">Razorpay</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>
                </div>
              </div>

              {/* Suggested donation amounts */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Quick Donation
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[25, 50, 100, 250].map((amount) => (
                    <motion.button
                      key={amount}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        formData.amount === amount.toString()
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-200 hover:border-blue-300 text-gray-700"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, amount: amount.toString() })
                      }
                    >
                      ${amount}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Donate Now
                  </>
                )}
              </motion.button>
            </form>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center font-medium flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Thank you for your generous donation! Redirecting...
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>Your donation is secure and tax-deductible</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationForm;
