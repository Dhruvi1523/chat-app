import express from "express"
import {getUsersForSidebar, sendMessage} from "../controller/messageController.js"
import { protectRoute } from "../middlewares/protectRoute.js";
import {getMessages} from "../controller/messageController.js"

const router = express.Router();

// user - sender


router.get('/users' , protectRoute , getUsersForSidebar)
router.get('/:receiverId', protectRoute , getMessages   )
router.post('/send/:receiverId' , protectRoute , sendMessage)

export default router ;