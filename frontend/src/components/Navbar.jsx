import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { HiUsers, HiLogout, HiCog } from "react-icons/hi";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, authUser, toggleShowAllUsers } = useAuthStore();

  const handleProfile = () => {
    window.location.href = "/profile";
  };

  const handleLogout = async () => {
    await logout();
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#2B2B2B] text-[#E0E0E0] flex md:flex-col justify-between items-center md:items-stretch w-full md:h-screen md:w-20 p-4 shadow-lg border-r border-[#3E3E3E]">
      {/* Logo or Title */}
      <h1 className="text-2xl font-bold text-[#FF9F43] hidden md:block text-center">
        CA
      </h1>

      {/* Icons Section */}
      <div className="flex md:flex-col items-center justify-between md:justify-start w-full md:w-auto space-x-4 md:space-x-0 md:space-y-4">
        {/* Show All Users Button */}
        <button
          onClick={toggleShowAllUsers}
          className="p-2 rounded-full hover:bg-[#3E3E3E] transition-colors duration-200"
          title="Show All Users"
        >
          <HiUsers className="w-6 h-6 text-[#FF9F43]" />
        </button>

       

        {/* Settings Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {/* Settings Icon */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full hover:bg-[#3E3E3E] transition-colors duration-200"
          >
            <HiCog className="w-6 h-6 text-[#FF9F43]" />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 md:left-full md:top-0 md:ml-2 mt-2 md:mt-0 w-48 bg-[#3E3E3E] rounded-lg shadow-lg border border-[#4E4E4E] z-50">
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 flex items-center space-x-2 text-[#E0E0E0] hover:bg-[#4E4E4E] rounded-lg transition duration-200"
              >
                <HiLogout className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

         {/* Profile Picture */}
         <div className="relative">
          <button
            onClick={handleProfile}
            className="p-2 rounded-full hover:bg-[#3E3E3E] transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-[#3E3E3E] flex items-center justify-center overflow-hidden">
              <img
                src={
                  authUser && authUser.profilePic
                    ? authUser.profilePic
                    : "https://avatarfiles.alphacoders.com/930/93048.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;