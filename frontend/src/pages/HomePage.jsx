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

      {showAllUsers && (
        <aside
          className={`border-r border-gray-700 ${
            showAllUsers ? "w-full sm:w-60 md:w-72 lg:w-80" : "hidden"
          } sm:block `}
        >
          <UseSidebar />
        </aside>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Collapsible on small screens */}

        {/* Chat Container with Message Input */}
        <div className="flex-1 flex flex-col w-full sm:w-auto relative">
          <div className="">
            {selectedUser ? <ChatContainer /> : <DefaultChat />}
          </div>
          {/* Message Input at Bottom with extra padding for mobile */}
          {selectedUser ? (
            <>
              <div className="absolute bottom-0 w-full bg-[#202329]  sm:static  pb-16 sm:pb-0">
                <MessageInput />
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Bottom Navbar for Mobile */}
      <div className="flex sm:hidden fixed bottom-0 w-full bg-[#131313] z-10">
        <Navbar />
      </div>
    </div>
  );
};

export default ChatUI;
