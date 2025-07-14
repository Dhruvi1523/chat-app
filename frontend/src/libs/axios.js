import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://chat-app-10gs.onrender.com/api",
    withCredentials : true
})