import { motion } from 'framer-motion';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


const AuthForm = ({ isLogin = true }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });


  const { login, register } = useAuth();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

// Update handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsSubmitting(true);

  try {
    if (!isLogin) {
      // Add password confirmation check
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match");
      }
      
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
    } else {
      await login({
        email: formData.email,
        password: formData.password
      });
    }
    
    // Clear form after successful submission
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
    
  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};

// Add error display section (inside return statement)
{error && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-red-500 mb-4 text-center text-sm"
  >
    {error}
  </motion.div>
)}

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
    // ...
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <div className="flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-white rounded-full animate-spin"></div>
        {isLogin ? 'Signing In...' : 'Creating Account...'}
      </div>
    ) : (
      isLogin ? 'Sign In' : 'Create Account'
    )}
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