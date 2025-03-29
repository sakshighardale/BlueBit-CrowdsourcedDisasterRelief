import React from 'react'
import Navbar from '../components/Navbar'
import DisasterSeverityDashboard from '../components/DisasterSeverityDashboard'
import Footer from '../components/Footer'

const Severity = () => {
  return (
    <div>
        <Navbar/>
        <DisasterSeverityDashboard/>
        <Footer/>
    </div>
  )
}

export default Severity