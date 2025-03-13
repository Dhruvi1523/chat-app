import React, { useRef, useState } from "react";
import { Send, ImagePlus } from "lucide-react";
import { useMessageStore } from "../store/messageStore";

function MessageInput() {
  const { sendMessage, selectedUser } = useMessageStore();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const fileRef = useRef();

  const handleTextChange = (e) => setText(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImage(reader.result);
    reader.onerror = (error) => console.error("Upload failed:", error);
  };

  const removeImage = () => {
    setImage("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSendMessage = async () => {
    if (!text.trim() && !image) return;
    await sendMessage(selectedUser._id, { text, image });
    setText("");
    setImage("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="bottom-0 w-full shadow-md py-1 px-1 md:px-1 ">
      <div className="w-full max-w-4xl">
        {/* Image Preview */}
        {image && (
          <div className="relative mb-2 w-fit">
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-[#4E4E4E] text-[#E0E0E0] rounded-full p-1 text-xs hover:bg-[#FF9F43] transition"
            >
              ✖
            </button>
            <img
              src={image}
              className="h-20 w-20 rounded-md border border-[#4E4E4E] shadow"
              alt="Preview"
            />
          </div>
        )}

        {/* Input & Buttons Container */}
        <div className="flex items-center gap-2 bg-[#3E3E3E] rounded-lg px-3 py-2 border border-[#4E4E4E]">
          {/* Text Input */}
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-[#E0E0E0] placeholder-[#B0B0B0] px-3 py-2 rounded-md focus:outline-none"
          />

          {/* Image Upload Button */}
          <label htmlFor="image-upload" className="p-2 rounded-lg hover:bg-[#4E4E4E] cursor-pointer transition">
            <ImagePlus className="w-5 h-5 md:w-6 md:h-6 text-[#E0E0E0]" />
            <input 
              type="file" 
              id="image-upload" 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange} 
              ref={fileRef} 
            />
          </label>

          {/* Send Button */}
          <button
            className="p-2 bg-[#FF9F43] text-[#2B2B2B] rounded-lg hover:bg-[#FF8F33] transition"
            onClick={handleSendMessage}
          >
            <Send className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageInput;