import express from "express"
import {signup , login , logout , updateProfile} from "../controller/authController.js"
import { protectRoute } from "../middlewares/protectRoute.js"
import User from "../models/userModel.js"
import { upload } from "../middlewares/multer.js"
const router = express.Router()

router.post('/signup' , signup)
router.post('/login' , login)
router.post('/logout' , logout)
router.put('/update-profile' , protectRoute , updateProfile)
router.get('/check' , protectRoute ,async ( req , res)=>{
    const user = await User.findOne({ _id : req.user.userId } ).select("-password")

    res.status(200).json(user)
})


export default router