import React from "react";
import UserItem from "./Useritem";
import { useMessageStore } from "../store/messageStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const UserSideBar = () => {
  const { selectedUser, users, getUsers, setSelectedUser } = useMessageStore();
  const { onlineUsers, toggleShowAllUsers } = useAuthStore();

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

  return (
    <div className="bg-[#2B2B2B] h-full overflow-y-auto p-2 border-r border-[#4E4E4E]">
      {users?.length > 0 ? (
        users.map((user) => (
          <UserItem
            key={user._id}
            name={user.fullName}
            profilePic={user.profilePic}
            onClick={() => toggleUser(user)}
            isOnline={onlineUsers && onlineUsers.includes(user._id)}
            isSelected={selectedUser === user}
          />
        ))
      ) : (
        <p className="text-center text-[#B0B0B0] p-4">No users available</p>
      )}
    </div>
  );
};

export default UserSideBar;