import React from "react";

const UserItem = ({ name, profilePic, isOnline, onClick, isSelected, lastMessage }) => {
  return (
    <div
      className={`flex items-center p-5 cursor-pointer transition duration-200 transform hover:scale-105 ${
        isSelected ? "bg-gradient-to-r from-[#FF9F43]/20 to-[#3E3E3E] border-l-4 border-[#FF9F43]" : "hover:bg-[#4E4E4E] border-l-4 border-transparent"
      } rounded-xl`}
      onClick={onClick}
      aria-label={`Select ${name} for chat`} // Accessibility: Added ARIA label
    >
      {/* Profile Picture with Online Indicator */}
      <div className="relative w-10 h-10">
        <img
          src={profilePic}
          alt={`${name}'s profile picture`} // Accessibility: Descriptive alt text
          className="w-10 h-10 rounded-full object-cover border-2 border-[#FF9F43]"
          loading="lazy" // Performance: Lazy load images
        />
        {isOnline && (
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-[#2B2B2B] rounded-full"></span>
        )}
      </div>

      {/* User Details */}
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-[#E0E0E0]">{name}</h3>
        <p className="text-sm font-normal text-[#D0D0D0] truncate max-w-[200px]">
          {lastMessage || "No recent messages"} {/* Enhancement: Last message preview */}
        </p>
      </div>
    </div>
  );
};

export default React.memo(UserItem); // Performance: Memoize to prevent unnecessary re-renders