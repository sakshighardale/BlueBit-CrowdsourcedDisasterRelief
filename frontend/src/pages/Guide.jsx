import React from 'react'
import GuidePage from '../components/GuidePage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Guide = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-50">
        <GuidePage />
      </div>
      <Footer className=" bottom-0 z-20" />
    </div>
  )
}

export default Guide