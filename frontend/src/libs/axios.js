import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "http://localhost:5252/api",
    withCredentials : true
})