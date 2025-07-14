import connectDB from "../lib/db.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const seeds = [
  {
    fullName: "Rohan Patel",
    email: "rohan.patel@example.com",
    password: "Rohan#4567",
  },
  {
    fullName: "Kavya Nair",
    email: "kavya.nair@example.com",
    password: "Kavya$2025",
  },
  {
    fullName: "Vikram Singh",
    email: "vikram.singh@example.com",
    password: "Vikram_1234",
  },
  {
    fullName: "Priya Desai",
    email: "priya.desai@example.com",
    password: "Priya@9876",
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
   

    process.exit(0); // Exit the script successfully
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // Exit with an error
  }
};

seedBackend();
