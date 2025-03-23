import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Map from "./pages/Map";
import ReportDisaster from './pages/Report';
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
        {/* <Route path="/login" element={<AuthPage />} /> {/auth/login } to be used*/}
      </Routes>
    </Router>
  )
}

export default App