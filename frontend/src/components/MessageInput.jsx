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
    <div className=" bottom-0 w-full shadow-md py-1 px-1 md:px-1">
      <div className="w-full max-w-4xl ">
        {/* Image Preview */}
        {image && (
          <div className="relative mb-2 w-fit">
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-[#2c3744] text-white rounded-full p-1 text-xs hover:bg-red-600 transition"
            >
              ✖
            </button>
            <img
              src={image}
              className="h-20 w-20 rounded-md border border-gray-300 shadow"
              alt="Preview"
            />
          </div>
        )}

        {/* Input & Buttons Container */}
        <div className="flex items-center gap-2 bg-[#2d333e] rounded-lg px-3 py-2">
          {/* Text Input */}
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 px-3 py-2 rounded-md focus:outline-none"
          />

          {/* Image Upload Button */}
          <label htmlFor="image-upload" className="p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition">
            <ImagePlus className="w-5 h-5 md:w-6 md:h-6" />
            <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleImageChange} ref={fileRef} />
          </label>

          {/* Send Button */}
          <button
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
