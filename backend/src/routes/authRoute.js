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
    res.status(200).json(req.user)
})


export default router