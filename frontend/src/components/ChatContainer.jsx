import React, { useState, useRef, useEffect } from "react";
import { useMessageStore } from "../store/messageStore";
import MessageInput from "./MessageInput.jsx";
import { useAuthStore } from "../store/authStore";
import { formatMessageTime } from "../libs/utils.js";
import { HiChevronLeft } from "react-icons/hi";
import { HiDotsVertical } from "react-icons/hi"; // 3-dot icon

function ChatContainer() {
  const {
    selectedUser,
    isMessageLoading,
    getMessages,
    messages,
    unsubscribeToMessage,
    subscribeToMessage,
    setSelectedUser,
    deleteChat,
  } = useMessageStore();

  const { authUser, onlineUsers, toggleShowAllUsers } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessage();

    return () => {
      unsubscribeToMessage();
    };
  }, [getMessages, selectedUser._id, subscribeToMessage, unsubscribeToMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function goBack() {
    setSelectedUser("");
    toggleShowAllUsers();
  }

 return (
    <div className="flex flex-col h-screen w-full bg-[#2B2B2B]">
      {/* Selected User Header */}
      <div className="w-full p-4 flex items-center space-x-4 bg-[#3E3E3E] shadow-md fixed border-b border-[#4E4E4E]">
        <button
          onClick={goBack}
          className="text-[#E0E0E0] font-semibold py-2 px-1 rounded transition duration-300 flex items-center sm:flex md:hidden hover:text-[#FF9F43]"
        >
          <HiChevronLeft className="w-8 h-8 mr-2" />
        </button>
        <img
          src={selectedUser.profilePic}
          alt={selectedUser.fullName}
          className="w-10 h-10 rounded-full object-cover border-2 border-[#FF9F43]"
        />
        <div className="flex-col">
          <h2 className="text-xl font-bold text-[#E0E0E0]">
            {selectedUser.fullName}
          </h2>
          <p
            className={`text-sm font-medium ${
              onlineUsers && onlineUsers.includes(selectedUser._id)
                ? "text-green-500"
                : "text-[#B0B0B0]"
            }`}
          >
            {onlineUsers && onlineUsers.includes(selectedUser._id)
              ? "Online"
              : "Offline"}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-[#E0E0E0] hover:bg-[#4E4E4E] rounded-full"
          >
            <HiDotsVertical className="w-6 h-6" />
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-40 bg-[#3E3E3E] shadow-lg rounded-lg p-2 border border-[#4E4E4E]"
            >
              <button
                onClick={() => {
                  deleteChat(selectedUser._id);
                  setMenuOpen(false);
                }}
                className="block w-full text-left text-[#E0E0E0] px-4 py-2 hover:bg-[#4E4E4E] rounded"
              >
                Delete Chat
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-2 pt-20">
        <div className="space-y-4">
          {messages &&
            messages.map((message, index) => {
              const isSent = message.senderId === authUser._id;
              return (
                <div
                  key={message._id}
                  className={`flex items-start space-x-2 ${
                    isSent ? "justify-end" : "justify-start"
                  }`}
                  ref={index === messages.length - 1 ? messagesEndRef : null}
                >
                  {!isSent && (
                    <img
                      src={selectedUser.profilePic}
                      alt="Receiver"
                      className="w-8 h-8 rounded-full object-cover self-end border border-[#4E4E4E]"
                    />
                  )}

                  <div
                    className={`flex flex-col ${
                      isSent ? "items-end" : "items-start"
                    }`}
                  >
                    <time className="text-xs text-[#B0B0B0] mb-1">
                      {formatMessageTime(message.createdAt)}
                    </time>
                    <div
                      className={`p-3 rounded-lg max-w-xs ${
                        isSent
                          ? "bg-[#FF9F43] text-[#2B2B2B]"
                          : "bg-[#3E3E3E] text-[#E0E0E0]"
                      } border border-[#4E4E4E]`}
                    >
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Message Attachment"
                          className="mb-1 rounded"
                        />
                      )}
                      {message.text && <p>{message.text}</p>}
                    </div>
                  </div>

                  {isSent && (
                    <img
                      src={authUser.profilePic}
                      alt="Sender"
                      className="w-8 h-8 rounded-full object-cover self-end border border-[#4E4E4E]"
                    />
                  )}
                </div>
              );
            })}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;