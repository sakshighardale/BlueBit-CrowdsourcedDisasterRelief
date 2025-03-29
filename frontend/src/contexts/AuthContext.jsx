// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

// Fix the checkAuth function
const checkAuth = async () => {
  try {
    const { data } = await axios.get('/api/auth/me', { 
      withCredentials: true 
    });
    setUser(data);
  } catch (error) {
    setUser(null);
    Cookies.remove('token'); // Clear invalid token
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post('/api/auth/login', credentials, {
        withCredentials: true
      });
      setUser(data.user);
      navigate('/map');
      return data;
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  };

  const register = async (userData) => {
    try {
      await axios.post('/api/auth/register', userData);
      // Auto-login after registration
      await login({
        email: userData.email,
        password: userData.password
      });
    } catch (error) {
      throw error.response?.data?.error || 'Registration failed';
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { 
        withCredentials: true 
      });
    } finally {
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);