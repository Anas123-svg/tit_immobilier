import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, ChevronDown, Menu, X,LogOut,Shield,Settings } from "lucide-react"; // Import icons
import { motion, AnimatePresence } from "framer-motion"; // Importing framer-motion


const Navbar: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu toggle
  const profileOptions = [
    { name: "My Profile", path: "/profile", icon: User },
    { name: "Change Password", path: "/change-password", icon: Shield },
    { name: "Setting", path: "/settings", icon: Settings },
    { name: "Log out", path: "/logout", icon: LogOut },
  ];
  return (
    <motion.nav
      className="bg-white shadow-md w-full  flex items-center justify-between px-6 py-4 z-40 relative" // Ensure proper z-index
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
        TIT-immobilier
        </h1>
      </motion.div>

      

  

    
        {/* Profile Dropdown */}
        <motion.div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setDropdownOpen(!isDropdownOpen)} // Toggle dropdown
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
        
          <div>
            
          </div>
                {/* User Icon */}
<div className="relative justify-self-start">
  <User size={20} className="text-primary cursor-pointer" />

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
   
   {profileOptions.map((option, index) => (
        <li
          key={index}
          className={`border-b border-[#ffffff79] last:border-b-0`}
        >
          <Link
            to={option.path}
            className={`flex items-center p-3 transition-all duration-500 ease-in-out hover:bg-white hover:text-primary`}
          >
            <option.icon size={20} className="mr-2" />
            <span>{option.name}</span>
          </Link>
        </li>
      ))}
    </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
   
    </motion.nav>
  );
};

export default Navbar;
