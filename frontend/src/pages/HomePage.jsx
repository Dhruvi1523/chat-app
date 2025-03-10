import React from "react";
import UseSidebar from "../components/UserSidebar.jsx";
import DefaultChat from "../components/DefaultChat.jsx";
import { useMessageStore } from "../store/messageStore";
import ChatContainer from "../components/ChatContainer.jsx";
import Navbar from "../components/Navbar.jsx";
import MessageInput from "../components/MessageInput.jsx";
import { useAuthStore } from "../store/authStore.js";

const ChatUI = () => {
  const { selectedUser } = useMessageStore();
  const { showAllUsers } = useAuthStore();

  return (
    <div className="h-screen w-full bg-[#202329] flex flex-col sm:flex-row">
      {/* Vertical Navbar for larger screens */}
      <div className="hidden sm:flex flex-col w-16 bg-[#131313]">
        <Navbar />
      </div>

      {/* Sidebar for Users */}
      <aside
        className={`border-r border-gray-700 ${
          showAllUsers ? "w-full sm:w-60 md:w-72 lg:w-80" : "hidden"
        } sm:block`}
      >
        <UseSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-auto">
          {selectedUser ? <ChatContainer /> : <DefaultChat />}
        </div>

        {/* Message Input Bar */}
        {selectedUser && (
          <div className="w-full bg-[#202329] p-3 border-t border-gray-700">
            <MessageInput />
          </div>
        )}
      </div>

      {/* Bottom Navbar for Mobile */}
      <div className="flex sm:hidden fixed bottom-0 w-full bg-[#131313] z-10">
        <Navbar />
      </div>
    </div>
  );
};

export default ChatUI;
