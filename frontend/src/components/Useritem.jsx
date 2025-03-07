import React from "react";

const UserItem = ({ name, profilePic,isOnline , onClick , isSelected }) => {
 
  return (
    <div
    className={`flex items-center p-4  cursor-pointer transition duration-200 ${isSelected ? "bg-[#2d333e]" : ""} rounded-2xl`}
      onClick={onClick}
    >
      {/* Profile Picture with Online Indicator */}
      <div className="relative w-10 h-10">
        <img
          src={profilePic}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        {isOnline && (
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></span>
        )}
      </div>

      {/* User Details */}
      <div className="ml-4 ">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-sm text-gray-400"></p>
      </div>
    </div>
  );
};

export default UserItem;
