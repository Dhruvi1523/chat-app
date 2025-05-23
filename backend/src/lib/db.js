import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

export default async function connectDB() {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("db connected")
    }
    catch{
        console.log("error")
    }
}