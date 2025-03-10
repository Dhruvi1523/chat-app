import {create} from "zustand"
import {axiosInstance} from "../libs/axios.js"
import toast from "react-hot-toast"
import { useAuthStore } from "./authStore.js"

export const useMessageStore = create((set , get)=>(
   {
    users : [] ,
    messages : [] ,
    selectedUser : null ,
    isUsersLoading : false ,
    isMessageLoading : false ,

    getUsers : async ()=>{
        set({ isUsersLoading  : true}) 
        try{
            const res = await axiosInstance.get('/message/users')
            console.log(res.data)
            set({users : res.data})
        }catch(e){
            console.log("Error in getting users " , e);
            toast.error(e.response.data.message)
        }finally{
            set({ isUsersLoading  : false}) 
        }
    } ,

    getMessages: async (id) => {
        set({ isMessageLoading: true });
    
        try {
            const res = await axiosInstance.get(`/message/${id}`);
            console.log("Fetched Messages:", res.data);
            set({ messages: res.data });
        } catch (e) {
            console.error("Error in getting messages:", e);
            toast.error(e.response?.data?.message || "Something went wrong");
        } finally {
            set({ isMessageLoading: false });
        }
    } ,

    setSelectedUser : (user)=>{
        set({selectedUser : user})
    } ,

    sendMessage: async (id, data) => {
        try {
            // encryption
            const res = await axiosInstance.post(`/message/send/${id}`, data);
            console.log("Message Sent:", res.data);
    
            set((state) => {
                const updatedMessages = [...state.messages, res.data];
                console.log("Updated Messages:", updatedMessages); // Log after updating
                return { messages: updatedMessages };
            });
    
        } catch (e) {
            console.error("Error in sending messages:", e);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    } ,

    subscribeToMessage: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
    
        const socket = useAuthStore.getState().socket; // Access Zustand state properly
    
        if (!socket) {
            console.error("Socket is not connected!");
            return;
        }
    
        socket.on("new-message", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id)
                return;
            // decryption
            set({ messages: [...get().messages, newMessage] }); // Ensure correct state update
        });
    },
    
    unsubscribeToMessage: () => {
        const socket = useAuthStore.getState().socket; // Access Zustand state properly
    
        if (!socket) {
            console.error("Socket is not connected!");
            return;
        }
    
        socket.off("new-message");
    },

    deleteChat : async (id)=>{
        try {
            const res = await axiosInstance.delete(`/message/delete-chat/${id}`);
            console.log("dlete");
    
        } catch (e) {
            console.error("Error in sending messages:", e);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    }
    
    
    
    
}


))
