import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../assets/logo.png"; 



const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); 


    return (
        <motion.nav 
            className="bg-sky-200 shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >


            <div 
            className="container mx-auto flex items-center justify-between p-2">
                {/* Left - Logo */}
                <motion.div 
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img src={logo} alt="Helping Bridge Logo" className="h-10 rounded-2xl w-10" />
                    <span className="text-xl font-bold text-gray-800">Helping Bridge</span>
                </motion.div>



                {/* Center - Navigation Links (Hidden on Mobile) */}
                <motion.ul 
                    className="hidden md:flex space-x-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Link to="/" className="text-gray-700 font-semibold hover:text-blue-600">Home</Link>
                    </motion.li>
                    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Link to="/map" className="text-gray-700 font-semibold hover:text-blue-600">Map</Link>
                    </motion.li>
                    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Link to="/about" className="text-gray-700 font-semibold hover:text-blue-600">About</Link>
                    </motion.li>
                    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Link to="/join" className="text-gray-700 font-semibold hover:text-blue-600">Join Us</Link>
                    </motion.li>
                </motion.ul>

                {/* Right - Mobile Menu Button */}
                <motion.div 
                    className="md:hidden"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <button
                        className="text-gray-700 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <motion.svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </motion.svg>
                    </button>
                </motion.div>
            </div>

            {/* Mobile Menu - Shows when isOpen is true */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul 
                        className="md:hidden space-y-2 bg-white px-4 py-2 shadow-md"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">Home</Link>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/map" className="block py-2 text-gray-700 hover:text-blue-600">Map</Link>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-600">About</Link>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/join" className="block py-2 text-gray-700 hover:text-blue-600">Join Us</Link>
                        </motion.li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
