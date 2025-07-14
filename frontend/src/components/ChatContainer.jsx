
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useMessageStore } from "../store/messageStore";
import { useAuthStore } from "../store/authStore";
import { formatMessageTime } from "../libs/utils.js";
import { HiChevronLeft, HiDotsVertical } from "react-icons/hi";

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

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goBack = () => {
    setSelectedUser("");
    toggleShowAllUsers();
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-[#2B2B2B]">
      {/* Header */}
      <div className="w-full p-4 flex items-center space-x-4 bg-[#3E3E3E] shadow-md fixed border-b border-[#4E4E4E] z-10">
        <button
          onClick={goBack}
          className="text-[#E0E0E0] font-semibold py-2 px-1 rounded transition duration-300 flex items-center sm:flex md:hidden hover:text-[#FFAB5C]"
          aria-label="Go back to user list"
        >
          <HiChevronLeft className="w-8 h-8 mr-2" />
        </button>
        <img
          src={selectedUser.profilePic}
          alt={`${selectedUser.fullName}'s profile picture`}
          className="w-10 h-10 rounded-full object-cover border-2 border-[#FF9F43]"
          loading="lazy"
        />
        <div className="flex-col">
          <h2 className="text-2xl font-bold text-[#E0E0E0]">{selectedUser.fullName}</h2>
          <p
            className={`text-sm font-normal ${
              onlineUsers?.includes(selectedUser._id)
                ? "text-green-500"
                : "text-[#D0D0D0]"
            }`}
          >
            {onlineUsers?.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>

        <div className="relative ml-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-[#E0E0E0] hover:bg-[#4E4E4E] rounded-full"
            aria-label="Open chat options"
          >
            <HiDotsVertical className="w-5 h-5" />
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-40 bg-[#3E3E3E] shadow-lg rounded-lg p-2 border border-[#4E4E4E] z-20"
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
      <div className="flex-1 overflow-y-auto px-4 pt-24 pb-6 flex flex-col-reverse"> {/* Changed to flex-col-reverse for bottom alignment */}
        <div ref={messagesEndRef} /> {/* Moved to top of flex-col-reverse to anchor bottom */}
        {isMessageLoading ? (
          <div className="space-y-4 px-4 flex flex-col-reverse"> {/* Added flex-col-reverse for consistency */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2 animate-pulse">
                <div className="w-8 h-8 bg-[#4E4E4E] rounded-full"></div>
                <div className="flex-1 h-12 bg-[#4E4E4E] rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex items-end justify-center text-center text-[#D0D0D0] pb-4"> {/* Aligned to bottom */}
            No messages yet. Start the conversation!
          </div>
        ) : (
          <div className="space-y-4 flex flex-col-reverse"> {/* Added flex-col-reverse for messages */}
            {messages.slice().reverse().map((message, index) => { // Reversed messages array for rendering
              const isSent = message.senderId === authUser._id;
              const showDate =
                index === 0 ||
                new Date(message.createdAt).toDateString() !==
                  new Date(messages[messages.length - index - 1]?.createdAt).toDateString(); // Adjusted index for reversed order
              return (
                <React.Fragment key={message._id}>
                  {showDate && (
                    <div className="text-center text-[#D0D0D0] text-sm my-4 ">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </div>
                  )}
                  <div
                    className={`flex items-start space-x-2 animate-fadeIn ${
                      isSent ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isSent && (
                      <img
                        src={selectedUser.profilePic}
                        alt={`${selectedUser.fullName}'s profile picture`}
                        className="w-8 h-8 rounded-full object-cover self-end border border-[#4E4E4E]"
                        loading="lazy"
                      />
                    )}

                    <div className={`flex flex-col ${isSent ? "items-end" : "items-start"}`}>
                      <time className="text-xs text-[#D0D0D0] mb-1 drop-shadow-sm">
                        {formatMessageTime(message.createdAt)}
                      </time>
                      <div
                        className={`p-3 rounded-lg max-w-xs transition-all duration-300 ease-in-out group relative ${
                          isSent
                            ? "bg-[#FF9F43] text-[#2B2B2B]"
                            : "bg-[#3E3E3E] text-[#E0E0E0]"
                        } border border-[#4E4E4E]`}
                      >
                        {message.image && (
                          <img
                            src={message.image}
                            alt="Chat attachment"
                            className="mb-1 rounded max-h-60 object-contain cursor-pointer"
                            loading="lazy"
                          />
                        )}
                        {message.text && <p>{message.text}</p>}
                      </div>
                    </div>

                    {isSent && (
                      <img
                        src={authUser.profilePic}
                        alt={`${authUser.fullName}'s profile picture`}
                        className="w-8 h-8 rounded-full object-cover self-end border border-[#4E4E4E]"
                        loading="lazy"
                      />
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatContainer;
