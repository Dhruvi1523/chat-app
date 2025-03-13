import React from "react";

const DefaultChat = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#2B2B2B]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#E0E0E0] mb-4">
          Welcome to Chat App
        </h2>
        <p className="text-[#B0B0B0]">
          Select a user to start chatting.
        </p>
      </div>
    </div>
  );
};

export default DefaultChat;