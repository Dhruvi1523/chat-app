import Message from '../models/messageModel.js'
import User from '../models/userModel.js'
import cloudinary from '../lib/cloudinary.js';
import mongoose from 'mongoose';
import { io, extractSocketId } from '../lib/socket.js';

// user - sender

export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user.userId;

        // find users other than users to display in sidebar
        const filterUsers = await User.find({ _id: { $ne: userId } }).select("-password")

        return res.status(200).json(filterUsers)

    } catch (e) {
        console.log("Error in get users for sidebar controller", e);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const userId = req.user.userId; // Authenticated user's ID
        const { receiverId } = req.params;

        if (!receiverId) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }

        // Ensure userId and receiverId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ message: "Invalid user ID or receiver ID" });
        }

        const messages = await Message.find({
            $or: [
                { senderId: new mongoose.Types.ObjectId(userId), receiverId: new mongoose.Types.ObjectId(receiverId) },
                { senderId: new mongoose.Types.ObjectId(receiverId), receiverId: new mongoose.Types.ObjectId(userId) }
            ]
        }).sort({ createdAt: 1 }); // Sort messages in ascending order (oldest first)

        return res.status(200).json(messages);

    } catch (e) {
        console.error("Error in getMessages controller:", e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const userId = req.user.userId
        const { text, image } = req.body;
        const { receiverId } = req.params;

        let imageUrl = "";

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await new Message({
            senderId: userId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save();

       

        const receiverSocketId = extractSocketId(receiverId);
        
        if (receiverSocketId) {  // Ensure receiverSocketId exists before emitting
            
            io.to(receiverSocketId).emit("new-message", newMessage);
            console.log("message emit")
        }


        return res.status(200).json(newMessage);


    } catch (e) {
        console.log("Error in send message controller", e);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}