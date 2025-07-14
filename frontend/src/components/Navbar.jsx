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

  // Define handleClickOutside function
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener using handleClickOutside
    document.addEventListener("mousedown", handleClickOutside);
    // Remove event listener using handleClickOutside
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // Empty dependency array since handleClickOutside doesn't depend on state/props

  return (
    <nav className="bg-[#2B2B2B] text-[#E0E0E0] flex md:flex-col justify-between items-center md:items-stretch w-full md:h-screen md:w-20 p-4 shadow-lg border-r border-[#3E3E3E]">
      <h1 className="text-2xl font-bold text-[#FF9F43] hidden md:block text-center">
        CA
      </h1>

      <div className="flex md:flex-col items-center justify-between md:justify-start w-full md:w-auto space-x-2 md:space-x-0 md:space-y-3">
        <button
          onClick={toggleShowAllUsers}
          className="p-2 rounded-full hover:bg-[#3E3E3E] transition-colors duration-200 relative group"
          aria-label="Show all users"
        >
          <HiUsers className="w-5 h-5 text-[#FF9F43]" />
          <span className="absolute hidden group-hover:block bg-[#3E3E3E] text-[#E0E0E0] text-xs rounded px-2 py-1 -top-8 left-1/2 -translate-x-1/2">
            Users
          </span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full hover:bg-[#3E3E3E] transition-colors duration-200 relative group"
            aria-label="Open settings"
          >
            <HiCog className="w-5 h-5 text-[#FF9F43]" />
            <span className="absolute hidden group-hover:block bg-[#3E3E3E] text-[#E0E0E0] text-xs rounded px-2 py-1 -top-8 left-1/2 -translate-x-1/2">
              Settings
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 md:left-full md:top-0 md:ml-2 mt-2 md:mt-0 w-48 bg-[#3E3E3E] rounded-lg shadow-lg border border-[#4E4E4E] z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 flex items-center space-x-2 text-[#E0E0E0] hover:bg-[#4E4E4E] rounded-lg transition duration-200"
                aria-label="Log out"
              >
                <HiLogout className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={handleProfile}
            className="p-2 rounded-full hover:bg-[#3E3E3E] transition-colors duration-200 relative group"
            aria-label="View profile"
          >
            <div className="w-10 h-10 rounded-full bg-[#3E3E3E] flex items-center justify-center overflow-hidden">
              <img
                src={
                  authUser && authUser.profilePic
                    ? authUser.profilePic
                    : "https://avatarfiles.alphacoders.com/930/93048.png"
                }
                alt={`${authUser?.fullName || "User"}'s profile picture`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="absolute hidden group-hover:block bg-[#3E3E3E] text-[#E0E0E0] text-xs rounded px-2 py-1 -top-8 left-1/2 -translate-x-1/2">
              Profile
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;