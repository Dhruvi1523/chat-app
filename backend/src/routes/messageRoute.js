import express from "express"
import {deleteChat, getUsersForSidebar, sendMessage} from "../controller/messageController.js"
import { protectRoute } from "../middlewares/protectRoute.js";
import {getMessages} from "../controller/messageController.js"

const router = express.Router();

// user - sender


router.get('/users' , protectRoute , getUsersForSidebar)
router.get('/:receiverId', protectRoute , getMessages   )
router.post('/send/:receiverId' , protectRoute , sendMessage)
router.delete('/delete-chat/:receiverId' , protectRoute , deleteChat)

export default router ;