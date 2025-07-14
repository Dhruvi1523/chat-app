import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import connectDB  from "./lib/db.js";
import authRoute from "./routes/authRoute.js"
import messageRoute from "./routes/messageRoute.js"
import cors from "cors"

import {app , server } from "./lib/socket.js"
 

dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(express.json({ limit: "50mb" })); 
app.use(cookieParser())
app.use(express.urlencoded({ limit: "50mb"  , extended: true }));
app.use(cors(
   {
    origin : "http://localhost:5173" || "https://chat-app-1-9s03.onrender.com",
    credentials : true ,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
   }
))



app.use('/api/auth' , authRoute)
app.use('/api/message' , messageRoute)

server.listen(PORT , ()=>{
    connectDB()
})