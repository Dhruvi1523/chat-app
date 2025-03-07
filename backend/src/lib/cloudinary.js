import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("❌ Missing Cloudinary environment variables. Check your .env file.");
  process.exit(1); // Exit if env variables are missing
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
