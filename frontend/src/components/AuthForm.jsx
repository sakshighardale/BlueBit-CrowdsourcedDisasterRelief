import { motion } from 'framer-motion';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin = true }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // if (isLogin) {
    //   console.log('Logging in with:', formData.email, formData.password);
    // } else {
    //   console.log('Signing up with:', formData);
    // }
    //it is just frontend implementation so redirect to map page
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });

    // Redirect to map page
    navigate('/map');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center mb-8"
        >
          <FontAwesomeIcon 
            icon={faRightToBracket} 
            className="text-4xl text-purple-600 mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to continue' : 'Join our community today'}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <FontAwesomeIcon 
                icon={faUser} 
                className="absolute top-3 left-3 text-gray-400"
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <FontAwesomeIcon 
              icon={faEnvelope} 
              className="absolute top-3 left-3 text-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <FontAwesomeIcon 
              icon={faLock} 
              className="absolute top-3 left-3 text-gray-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </motion.div>

          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <FontAwesomeIcon 
                icon={faLock} 
                className="absolute top-3 left-3 text-gray-400"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!isLogin}
              />
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <a href="/signup" className="text-purple-600 hover:underline font-semibold">
                Sign Up
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-purple-600 hover:underline font-semibold">
                Login
              </a>
            </p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AuthForm;