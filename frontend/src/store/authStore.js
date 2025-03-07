import { create } from "zustand"
import { axiosInstance } from "../libs/axios.js"
import toast from "react-hot-toast"
import { io } from "socket.io-client"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSignUp: false,
    isLogin: false,
    isUpdating: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data });
            get().connectSocket(); // Connect only if auth check is successful
        } catch (e) {
            console.error("Error in checkAuth:", e);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        try {
            set({ isSignUp: true });
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data });
            toast.success("Account Created Successfully...");
            get().connectSocket();
            window.location.href = '/';
        } catch (e) {
            console.error("Error in signUp:", e);
            toast.error(e.response?.data?.message || "Signup failed");
            set({ authUser: null });
        } finally {
            set({ isSignUp: false });
        }
    },

    login: async (data) => {
        try {
            set({ isLogin: true });
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data });
            toast.success("Login Successfully...");
            get().connectSocket();
            window.location.href = '/';
        } catch (e) {
            console.error("Error in login:", e);
            toast.error(e.response?.data?.message || "Login failed");
            set({ authUser: null });
        } finally {
            set({ isLogin: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            toast.success("Logout Successfully...");
            get().disconnectSocket(); // Disconnect socket on logout
            set({ authUser: null, socket: null });
            window.location.href = '/login';
        } catch (e) {
            console.error("Error in logout:", e);
            toast.error(e.response?.data?.message || "Logout failed");
        }
    },

    updatePic: async (data) => {
        set({ isUpdating: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: res.data });
            toast.success("Profile Updated Successfully...");
        } catch (e) {
            console.error("Error in updatePic:", e);
            toast.error(e.response?.data?.message || "Update failed");
        } finally {
            set({ isUpdating: false });
        }
    },

    connectSocket: () => {
        const { authUser, socket } = get();
        if (!authUser) return; // Ensure user is authenticated
        if (socket) return; // Prevent multiple socket instances

        const newSocket = io("http://localhost:5252", {
            query: {
                userId: authUser._id
            }
        });

        newSocket.on("getOnlineUsers", (users) => {
            set({onlineUsers : users})
        }

        )
        newSocket.on("connect", () => console.log("Socket connected:", newSocket.id));
        newSocket.on("disconnect", () => console.log("Socket disconnected"));
        newSocket.on("error", (error) => console.error("Socket error:", error));

        set({ socket: newSocket });
    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket.connected) {
            socket.disconnect();
            set({ socket: null });
        }
    }
}));
