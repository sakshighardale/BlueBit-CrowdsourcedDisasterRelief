import React from 'react'
import Navbar from '../components/Navbar'
// import TransparencyDashboard from '../components/TransparencyDashboard'
import Footer from '../components/Footer'
import DonationsList from '../components/Transperency'

const Donations = () => {
  return (
    <div>
        <Navbar/>
        <DonationsList/>
        <Footer/>
    </div>
  )
}

export default Donations