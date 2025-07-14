import React, { useEffect, useState } from "react"; // Added useState
import UserItem from "./Useritem";
import { useMessageStore } from "../store/messageStore";
import { useAuthStore } from "../store/authStore";
import { debounce } from "lodash"; // Requires lodash installation

const UserSideBar = () => {
  const { selectedUser, users, getUsers, setSelectedUser } = useMessageStore();
  const { onlineUsers, toggleShowAllUsers } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState(""); // Enhancement: Search state

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const toggleUser = (user) => {
    if (user === selectedUser) {
      setSelectedUser("");
    } else {
      setSelectedUser(user);
    }
    toggleShowAllUsers();
  };

  // Enhancement: Debounced search
  const handleSearch = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#2B2B2B] h-full overflow-y-auto p-4 border-r border-[#4E4E4E]"> {/* Increased padding */}
      {/* Enhancement: Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-3 py-2 bg-[#3E3E3E] text-[#E0E0E0] rounded-lg focus:outline-none border border-[#4E4E4E] focus:ring-2 focus:ring-[#FF9F43]"
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search users" // Accessibility
        />
      </div>
      {filteredUsers?.length > 0 ? (
        filteredUsers.map((user) => (
          <UserItem
            key={user._id}
            name={user.fullName}
            profilePic={user.profilePic}
            onClick={() => toggleUser(user)}
            isOnline={onlineUsers && onlineUsers.includes(user._id)}
            isSelected={selectedUser === user}
            lastMessage={user.lastMessage || ""} // Requires backend data
          />
        ))
      ) : (
        <p className="text-center text-[#D0D0D0] p-4">No users available</p> // Improved contrast
      )}
    </div>
  );
};

export default UserSideBar;
