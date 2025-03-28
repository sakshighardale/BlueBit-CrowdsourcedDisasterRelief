import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Map from "./pages/Map";
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ReportDisaster from './pages/Report';
import Profile from './pages/Profile';
import DonatePage from './pages/Donate';
import Guide from './pages/Guide';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Severity from './pages/Severity';
import Donations from './pages/Donations';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/donate" element={<DonatePage />} />

          {/* Protected Routes */}
          <Route path="/map" element={
            <ProtectedRoute>
              <Map />
            </ProtectedRoute>
          } />
          <Route path="/report" element={
            <ProtectedRoute>
              <ReportDisaster />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/disasters" element={<Severity />} />
          <Route path='/donations' element={<Donations />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;