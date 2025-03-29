import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Map from "./pages/Map";
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ReportDisaster from './pages/Report'
import Profile from './pages/Profile';
import DonatePage from './pages/Donate';
import Guide from './pages/Guide';
// import AuthPage from './pages/AuthPage';
// import Join from "./pages/Join";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />
        <Route path="/report" element={<ReportDisaster />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/guide" element={<Guide />} />
        {/* <Route path="/login" element={<AuthPage />} /> {/auth/login } to be used*/}
      </Routes>
    </Router>
  )
}

export default App