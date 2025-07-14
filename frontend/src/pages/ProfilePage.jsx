import { Camera } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";

const ProfilePage = () => {
  const { authUser, updatePic } = useAuthStore();
  const [selectedPic, setSelectedPic] = useState(null); // Fixed: Null initial state

  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    try {
      reader.onload = async () => {
        const image = reader.result;
        setSelectedPic(image);
        await updatePic({ profilePic: image });
      };
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#2B2B2B] text-[#E0E0E0] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-8 mb-8">
          <div className="relative">
            <img
              src={
                selectedPic ||
                authUser.profilePic ||
                "https://avatarfiles.alphacoders.com/930/93048.png"
              }
              alt={`${authUser.fullName}'s profile picture`} // Accessibility
              className="w-32 h-32 rounded-full object-cover border-4 border-[#4E4E4E]"
              loading="lazy" // Performance
            />
            <label
              htmlFor="profile-pic-upload"
              className="absolute bottom-0 right-0 bg-[#FF9F43] p-2 rounded-full cursor-pointer hover:bg-[#FFAB5C] transition duration-200" // Softer hover
              aria-label="Change profile picture" // Accessibility
            >
              <Camera className="w-5 h-5 text-[#2B2B2B]" />
              <input
                type="file"
                id="profile-pic-upload"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </label>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#E0E0E0]">{authUser.fullName}</h2> {/* Larger font */}
          </div>
        </div>

        {/* Enhancement: Preview selected picture */}
        {selectedPic && (
          <div className="mb-6">
            <p className="text-[#D0D0D0] mb-2">Preview:</p> {/* Improved contrast */}
            <img
              src={selectedPic}
              alt="Profile picture preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#4E4E4E]"
              loading="lazy" // Performance
            />
          </div>
        )}

        <div className="bg-[#3E3E3E] p-6 rounded-lg mb-6 border border-[#4E4E4E]">
          <h3 className="text-xl font-bold mb-4">Full Name</h3>
          <p className="text-[#D0D0D0]">{authUser.fullName}</p> {/* Improved contrast */}
        </div>

        <div className="bg-[#3E3E3E] p-6 rounded-lg mb-6 border border-[#4E4E4E]">
          <h3 className="text-xl font-bold mb-4">Email</h3>
          <p className="text-[#D0D0D0]">{authUser.email}</p> {/* Improved contrast */}
        </div>

        <div className="bg-[#3E3E3E] p-6 rounded-lg border border-[#4E4E4E]">
          <h3 className="text-xl font-bold mb-4">Account Information</h3>
          <div className="space-y-2">
            <p className="text-[#D0D0D0]">
              <span className="font-semibold">Member Since:</span>{" "}
              {authUser.createdAt?.split("T")[0]}
            </p>
            <p className="text-[#D0D0D0]">
              <span className="font-semibold">Account Type:</span>{" "}
              <span className="text-green-500">Active</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;