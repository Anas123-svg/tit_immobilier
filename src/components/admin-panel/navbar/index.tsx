import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ChevronDown, Menu, X,LogOut } from "lucide-react"; // Import icons
import { motion, AnimatePresence } from "framer-motion"; // Importing framer-motion

import { sidebarOptions } from "@/data/sidebarOptions";
const Navbar: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu toggle

  return (
    <motion.nav
      className="bg-white shadow-md w-full  md:flex items-center justify-between px-6 py-4 z-40 relative" // Ensure proper z-index
      initial={{ opacity: 0, y: -20 }} // Starting state
      animate={{ opacity: 1, y: 0 }} // Animation on load
      transition={{ duration: 0.5, ease: "easeInOut" }} // Timing of the animation
    >
      {/* Left Section: Logo */}
      <motion.div
        className="flex pb-3 md:pb-0 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-lg font-bold text-primary md:ml-3 heading-5">
          Trauma Support
        </h1>
      </motion.div>

      {/* Middle Section: Links */}
      <motion.ul
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } absolute top-24 md:top-16 border lg:border-none shadow-md  left-0 w-full lg:w-fit bg-white lg:static lg:space-x-8 lg:text-sm lg:font-medium lg:text-gray-700 lg:bg-transparent lg:shadow-none z-30 lg:flex text-sm font-medium text-gray-700`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        
        <li className="border-b lg:border-none">
          <Link to="/" className="block    lg:hover:text-primary transition p-3 lg:p-0  ">
            Main
          </Link>
        </li>
        <li className="border-b lg:border-none">
          <Link
            to="/health-forum"
            className="block   lg:hover:text-primary transition p-3 lg:p-0 "
          >
            Health Forum
          </Link>
        </li>
        <li className="border-b lg:border-none">
          <Link
            to="/pharmacy-store"
            className="block   lg:hover:text-primary transition  p-3 lg:p-0  "
          >
            Pharmacy & Store
          </Link>
        </li>
        <li className="border-b lg:border-none">
          <Link
            to="/how-it-works"
            className="block   lg:hover:text-primary transition p-3 lg:p-0  "
          >
            How It Work?
          </Link>
        </li>
        <li className="border-b lg:border-none">
          <Link
            to="/pages"
            className="block   lg:hover:text-primary transition p-3 lg:p-0  "
          >
            Pages
          </Link>
        </li>
      </motion.ul>


      {/* Right Section: Cart and Profile */}
      <motion.div
        className="flex items-center justify-between space-x-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >{/* Hamburger Icon for Mobile */}
      <div className="flex gap-5">
      <div className="lg:hidden flex justify-self-start items-center">
        <button
          className="text-primary focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

        {/* Cart Icon */}
        <div className="relative justify-self-start">
          <ShoppingCart size={20} className="text-primary cursor-pointer" />
          <motion.span
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            0
          </motion.span>
        </div>
        </div>
        {/* Profile Dropdown */}
        <motion.div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setDropdownOpen(!isDropdownOpen)} // Toggle dropdown
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
        
          <div>
            <p className="text-sm font-semibold text-gray-800">Ava Nguyen</p>
            <p className="text-xs text-blue-500">MBBS, MCPS, MS...</p>
          </div>
          <ChevronDown size={16} className="text-gray-600" />
        </motion.div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className="absolute top-12 right-0 flex-col  bg-white shadow-lg rounded-lg w-48 z-50" // Position the dropdown
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
          <motion.ul
      className={`absolute flex-col lg:border-none shadow-md left-0 w-full lg:w-fit bg-white lg:static  lg:text-sm lg:text-gray-700 lg:bg-transparent lg:shadow-none z-30 lg:flex text-sm  text-gray-700`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
   
          <li
       
          className={`border-b border-[#ffffff79] `}
        >
          <Link
            to={"/logout"}
            className={`flex p-3  transition-all duration-500 ease-in-out  hover:bg-white hover:text-primary`}
          >
          <LogOut size={20} className="mr-2" />
            <span>Logout</span>
          </Link>
        </li>
    </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
