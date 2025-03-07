import { Camera } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore  } from "../store/authStore";

const ProfilePage = () => {
 
  const {authUser , updatePic} = useAuthStore();
  const [selectedPic , setSelectedPic] = useState();

  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader()
    reader.readAsDataURL(file)
    try {
      reader.onload = async ()=>{

        const image = reader.result 
        
        setSelectedPic(image)
        await updatePic({profilePic : image})
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">

        {/* Profile Picture Section */}
        <div className="flex items-center space-x-8 mb-8">
          <div className="relative">
            <img
              src= { selectedPic ||  authUser.profilePic || "https://avatarfiles.alphacoders.com/930/93048.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
            />
            <label
              htmlFor="profile-pic-upload"
              className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition duration-200"
            >
              <Camera className="w-5 h-5 text-base-200"/>

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
            <h2 className="text-2xl font-bold">{authUser.fullName}</h2>
          </div>
        </div>

        {/* Full Name Section */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Full Name</h3>
          <p className="text-gray-300">{authUser.fullName}</p>
        </div>

        {/* Email Section */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Email</h3>
          <p className="text-gray-300">{authUser.email}</p>
        </div>

        {/* Account Information Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Account Information</h3>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="font-semibold">Member Since:</span> {authUser.createdAt?.split("T")[0]}
            </p>
            <p className="text-gray-300 ">
              <span className="font-semibold ">Account Type:</span> 
              <span className="text-green-500 ">  Active </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;