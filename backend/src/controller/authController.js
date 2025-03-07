import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/util.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { email, fullName, password  } = req.body;
    if (!email || !fullName || !password) {
        return res.status(400).json({ message: "All fields required" })
    }

    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }
        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "User is already exist" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)


        

       


        const newUser = await new User({
            email,
            fullName,
            password: hashPassword
        })


        if (newUser) {
            const token = generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic : newUser.profilePic
                
            })
        }



    } catch (e) {
        console.log("Error in signup controller", e)
        return res.status(500).json({ message: "internal server error" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields required" })
    }
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);


        if (!isCorrectPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic : user.profilePic
        })
    }
    catch (e) {
        console.log("Error in login controller", e)
        return res.status(500).json({ message: "Internal serval error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("chatToken", "", {
            maxAge: 0
        });
        return res.status(200).json({ message: "logged out successfully" })
    } catch (e) {
        console.log("Error in log out controller", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {

    try {
        const { profilePic } = req.body  ;

        const userId = req.user.userId ;

        if(!profilePic){
            return res.status(400).json({ message: "Profile picture is required" })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { profilePic: profilePic } },
            {new : true}
        ).select("-password")

        res.status(200).json({updatedUser})


    } catch (e) {
        console.log("Error in update profile controller", e);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}