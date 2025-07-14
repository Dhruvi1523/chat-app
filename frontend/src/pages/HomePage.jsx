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
      <div className="hidden sm:flex flex-col w-16 bg-[#131313]">
        <Navbar />
      </div>

      <aside
        className={`border-r border-gray-700 h-full flex flex-col fixed sm:static top-0 left-0 transform ${
          showAllUsers ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 w-full sm:w-60 md:w-80 lg:w-80 pb-20 bg-[#2B2B2B]`} // Enhancement: Slide-in sidebar
      >
        <div className="overflow-y-auto flex-1">
          <UseSidebar />
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {selectedUser ? <ChatContainer /> : <DefaultChat />}
        </div>

        {selectedUser && (
          <div className="w-full bg-[#2B2B2B] p-3 border-t border-gray-700 sticky bottom-0 z-10"> {/* Sticky positioning */}
            <MessageInput />
          </div>
        )}
      </div>

      {!selectedUser && (
        <div className="flex sm:hidden fixed bottom-0 w-full bg-[#131313] z-10">
          <Navbar />
        </div>
      )}
    </div>
  );
};

export default ChatUI;