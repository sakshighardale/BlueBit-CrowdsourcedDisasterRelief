import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext"; // Ensure useAuth is correctly implemented

const Navbar = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, loading, logout } = useAuth();
    return (
        <div className={`sticky top-0 z-50 ${className}`}>
            <motion.nav
                className="bg-[#1995AD] shadow-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto flex items-center justify-between p-2">
                    
                    {/* Logo */}
                    <motion.div
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <img src={logo} alt="Helping Bridge Logo" className="h-10 w-10 rounded-2xl" />
                        <Link to="/" className="text-xl font-bold text-gray-800">Helping Bridge</Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.ul 
                        className="hidden md:flex space-x-6"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {/* <NavItem to="/" text="Home" /> */}
                        <NavItem to="/map" text="Map" />
                        <NavItem to="/disasters" text="Disasters" />
                        <NavItem to="/donations" text="Donations" />
                        <NavItem to="/about" text="About" />
                        <NavItem to="/guide" text="Guidlines" />

                        {/* Conditional Profile / Join Us Link */}
                        {!loading && (
                            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                {user ? (
                                    <Link to="/profile" className="text-gray-700 font-semibold hover:text-blue-600 flex items-center gap-2">
                                        <FaUser className="h-6 w-6 text-gray-800" />
                                        <span className="text-sm font-semibold text-gray-800">Profile</span>
                                    </Link>
                                ) : (
                                    <Link to="/login" className="text-gray-700 font-semibold hover:text-blue-600">Join Us</Link>
                                )}
                            </motion.li>
                        )}
                    </motion.ul>

                    {/* Mobile Menu Button */}
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

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul 
                            className="md:hidden space-y-2 bg-white px-4 py-2 shadow-md"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* <NavItem to="/" text="Home" mobile /> */}
                            <NavItem to="/map" text="Map" mobile />
                            <NavItem to="/about" text="About" mobile />
                            <NavItem to="/guide" text="Guidline" mobile />

                            {/* Conditional Profile / Join Us for Mobile */}
                            {!loading && (
                                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    {user ? (
                                        <Link to="/profile" className="block py-2 text-gray-700 hover:text-blue-600">Profile</Link>
                                    ) : (
                                        <Link to="/login" className="block py-2 text-gray-700 hover:text-blue-600">Join Us</Link>
                                    )}
                                </motion.li>
                            )}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
};

// Reusable NavItem Component
const NavItem = ({ to, text, mobile }) => (
    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to={to} className={`text-gray-700 font-semibold hover:text-blue-600 ${mobile ? "block py-2" : ""}`}>{text}</Link>
    </motion.li>
);

export default Navbar;
