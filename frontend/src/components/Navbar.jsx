import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { HiUsers } from "react-icons/hi";


const Navbar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { logout, authUser , toggleShowAllUsers } = useAuthStore();
 
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-[#131313] h-full w-full p-2 text-white flex-col justify-between items-center">
      <h1 className="text-2xl font-bold"></h1>
      <div className="flex items-center space-x-4 relative">
        {/* Profile Icon */}

        {/* Settings Dropdown */}
        <div className="relative">
          <button onClick={toggleSettings} className="">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
              <img
                src={
                  authUser && authUser.profilePic
                    ? authUser.profilePic
                    : "https://avatarfiles.alphacoders.com/930/93048.png"
                }
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </button>

          <button
            onClick={toggleShowAllUsers}
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 mt-2 flex items-center justify-center cursor-pointer">
            <HiUsers className="w-6 h-6" />

            </div>
          </button>

          {/* Dropdown Menu */}
          {isSettingsOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-600 rounded-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
