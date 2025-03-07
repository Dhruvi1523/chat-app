import connectDB from "../lib/db.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const seeds = [
  {
    fullName: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    password: "SecurePass123",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    fullName: "Saanvi Sharma",
    email: "saanvi.sharma@example.com",
    password: "Password@2024",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
 
  {
    fullName: "Ananya Iyer",
    email: "ananya.iyer@example.com",
    password: "Ananya_789",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
 
  {
    fullName: "Meera Kapoor",
    email: "meera.kapoor@example.com",
    password: "Meera@pass890",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  
];

const seedBackend = async () => {
  try {
    await connectDB()

    // Hash passwords before inserting
    const hashedSeeds = await Promise.all(
      seeds.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.insertMany(hashedSeeds);
    console.log("Database seeded successfully");

    process.exit(0); // Exit the script successfully
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // Exit with an error
  }
};

seedBackend();
