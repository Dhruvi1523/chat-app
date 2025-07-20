import {Server} from "socket.io"
import http from "http"
import express from "express"
import { Socket } from "dgram";

const app = express();

const server = http.createServer(app)

const socketMap = {};

const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173" || "https://chat-app-1-9s03.onrender.com", // Allow frontend to connect
      methods: ["GET", "POST", "PUT", "DELETE"] // Allow these request methods
    }
  });
  
  export const extractSocketId = (userId)=>{
    return socketMap[userId];
  }

io.on("connect" , (socket)=>{
    console.log("connected" , socket.id);

    const userId = socket.handshake.query.userId ;

    if(userId) socketMap[userId] = socket.id ;

    // send online uses 
    io.emit("getOnlineUsers" , Object.keys(socketMap))

    socket.on("disconnect" , ()=>{
        console.log("disconnected" , socket.id)
        delete socketMap[userId]
        io.emit("getOnlineUsers" , Object.keys(socketMap))
    })
})

export  {app , server , io}