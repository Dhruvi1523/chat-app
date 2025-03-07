import React, { useRef, useEffect } from "react";
import { useMessageStore } from "../store/messageStore";
import MessageInput from "./MessageInput.jsx";
import { useAuthStore } from "../store/authStore";
import { formatMessageTime } from "../libs/utils.js";

function ChatContainer() {
  const {
    selectedUser,
    isMessageLoading,
    getMessages,
    messages,
    unsubscribeToMessage,
    subscribeToMessage,
  } = useMessageStore();
  const { authUser, onlineUsers } = useAuthStore();
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

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Selected User Header */}
      <div className="w-full p-4 flex items-center space-x-4 bg-[#1e252f] shadow-md fixed">
        <img
          src={selectedUser.profilePic}
          alt={selectedUser.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-col">
          <h2 className="text-xl font-bold text-white">
            {selectedUser.fullName}
          </h2>
          <p
            className={`text-sm font-medium ${
              onlineUsers.includes(selectedUser)
                ? "text-green-500"
                : "text-gray-400"
            }`}
          >
            {onlineUsers.includes(selectedUser) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-2">
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
                  {/* Profile Picture */}
                  {!isSent && (
                    <img
                      src={selectedUser.profilePic}
                      alt="Receiver"
                      className="w-8 h-8 rounded-full object-cover self-end"
                    />
                  )}

                  {/* Message Content */}
                  <div
                    className={`flex flex-col ${
                      isSent ? "items-end" : "items-start"
                    }`}
                  >
                    <time className="text-xs text-gray-400 mb-1">
                      {formatMessageTime(message.createdAt)}
                    </time>
                    <div
                      className={`p-3 rounded-lg max-w-xs ${
                        isSent
                          ? "bg-[#6d8afd] text-white"
                          : "bg-[#2d333e] text-white"
                      }`}
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

                  {/* Profile Picture for Sender */}
                  {isSent && (
                    <img
                      src={authUser.profilePic}
                      alt="Sender"
                      className="w-8 h-8 rounded-full object-cover self-end"
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