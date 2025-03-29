// import React, { useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faHandsHelping, 
//   faWater, 
//   faMountain, 
//   faWind, 
//   faSun, 
//   faTree 
// } from '@fortawesome/free-solid-svg-icons';
// import { 
//   faTwitter, 
//   faFacebookF, 
//   faLinkedinIn 
// } from '@fortawesome/free-brands-svg-icons';

// const IndianDonorsDisasterRelief = () => {
//   // Donor data
//   const donors = [
//     {
//       id: 1,
//       initials: 'AK',
//       name: 'Riya Kapoor',
//       location: 'Mumbai, Maharashtra',
//       amount: '$1200',
//       disasterType: 'Flood',
//       disasterIcon: faWater,
//       disasterColor: 'flood'
//     },
//     {
//       id: 2,
//       initials: 'PS',
//       name: 'Priya Sharma',
//       location: 'Delhi, NCR',
//       amount: '$2700',
//       disasterType: 'Earthquake',
//       disasterIcon: faMountain,
//       disasterColor: 'earthquake'
//     },
//     {
//       id: 3,
//       initials: 'RM',
//       name: 'Rahul Mehta',
//       location: 'Ahmedabad, Gujarat',
//       amount: '$1000',
//       disasterType: 'Cyclone',
//       disasterIcon: faWind,
//       disasterColor: 'cyclone'
//     },
//     {
//       id: 4,
//       initials: 'SP',
//       name: 'Sunita Patel',
//       location: 'Bangalore, Karnataka',
//       amount: '$5250',
//       disasterType: 'Drought',
//       disasterIcon: faSun,
//       disasterColor: 'drought'
//     },
//     {
//       id: 5,
//       initials: 'VK',
//       name: 'Vikram Khanna',
//       location: 'Dehradun, Uttarakhand',
//       amount: '₹10,00,000',
//       disasterType: 'Landslide',
//       disasterIcon: faTree,
//       disasterColor: 'landslide'
//     },
//     {
//       id: 6,
//       initials: 'NG',
//       name: 'Neha Gupta',
//       location: 'Chennai, Tamil Nadu',
//       amount: '₹7,50,000',
//       disasterType: 'Flood',
//       disasterIcon: faWater,
//       disasterColor: 'flood'
//     }
//   ];

//   // Color mappings
//   const colorMap = {
//     flood: {
//       bg: 'bg-blue-500',
//       text: 'text-blue-500',
//       border: 'border-blue-500',
//       bgOpacity: 'bg-opacity-20'
//     },
//     earthquake: {
//       bg: 'bg-red-