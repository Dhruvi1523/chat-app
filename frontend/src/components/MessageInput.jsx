import React, { useRef, useState } from "react";
import { Send, ImagePlus } from "lucide-react";
import { useMessageStore } from "../store/messageStore";

function MessageInput() {
  const { sendMessage, selectedUser } = useMessageStore();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const fileRef = useRef();
  const textareaRef = useRef(); // Enhancement: Auto-resize textarea

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

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
    if (textareaRef.current) textareaRef.current.style.height = "auto"; // Reset height
  };

  return (
    <div className="bottom-0 w-full shadow-md py-2 px-3 md:px-3 sticky z-10"> {/* Sticky positioning, increased padding */}
      <div className="w-full max-w-4xl">
        {image && (
          <div className="relative mb-2 w-fit">
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-[#4E4E4E] text-[#E0E0E0] rounded-full p-1 text-xs hover:bg-[#FFAB5C] transition"
              aria-label="Remove image" // Accessibility
            >
              ✖
            </button>
            <img
              src={image}
              className="h-20 w-20 rounded-md border border-[#4E4E4E] shadow"
              alt="Message preview" // Accessibility
              loading="lazy" // Performance
            />
          </div>
        )}

        <div className="flex items-center gap-2 bg-[#3E3E3E] rounded-lg px-3 py-2 border border-[#4E4E4E] shadow-md"> {/* Added shadow */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-[#E0E0E0] placeholder-[#D0D0D0] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9F43] resize-none" // Auto-resize textarea
            rows="1"
            aria-label="Type a message" // Accessibility
          />
          <label
            htmlFor="image-upload"
            className="p-2 rounded-lg hover:bg-[#4E4E4E] cursor-pointer transition"
            aria-label="Upload image" // Accessibility
          >
            <ImagePlus className="w-5 h-5 text-[#E0E0E0]" /> {/* Consistent icon size */}
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileRef}
            />
          </label>
          <button
            className="p-2 bg-[#FF9F43] text-[#2B2B2B] rounded-lg hover:bg-[#FFAB5C] active:scale-95 transition disabled:opacity-50" // Enhancement: Disable when empty
            onClick={handleSendMessage}
            disabled={!text.trim() && !image}
            aria-label="Send message" // Accessibility
          >
            <Send className="w-5 h-5" /> {/* Consistent icon size */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageInput;