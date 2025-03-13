import React from "react";

const UserItem = ({ name, profilePic, isOnline, onClick, isSelected }) => {
  return (
    <div
      className={`flex items-center p-4 cursor-pointer transition duration-200 ${
        isSelected ? "bg-[#3E3E3E]" : "hover:bg-[#4E4E4E]"
      } rounded-xl`}
      onClick={onClick}
    >
      {/* Profile Picture with Online Indicator */}
      <div className="relative w-10 h-10">
        <img
          src={profilePic}
          alt={name}
          className="w-10 h-10 rounded-full object-cover border-2 border-[#FF9F43]"
        />
        {isOnline && (
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-[#2B2B2B] rounded-full"></span>
        )}
      </div>

      {/* User Details */}
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-[#E0E0E0]">{name}</h3>
        <p className="text-sm text-[#B0B0B0]"></p>
      </div>
    </div>
  );
};

export default UserItem;