import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/authStore";
import { useMessageStore } from "./store/messageStore";
import { axiosInstance } from "./libs/axios";
import axios from "axios";
import { Loader } from "lucide-react";
import {Toaster } from "react-hot-toast"

function App() {
  const { authUser, checkAuth, isCheckingAuth , onlineUsers} = useAuthStore();
  const { getUsers , users , getMessages} = useMessageStore();
  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <HomePage /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: !authUser ? <LoginPage /> : <Navigate to="/" />,
    },
    {
      path: "/signup",
      element: !authUser ? <SignUpPage /> : <Navigate to="/" />,
    },
    {
      path: "/profile",
      element: authUser ? <ProfilePage /> : <Navigate to="/login" />,
    },
    {
      path: "/setting",
      element: <SettingPage />,
    },
  ]);


  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth(); 
    };
    checkUserAuth();
  }, [authUser]);


  if (isCheckingAuth && !authUser)
    return <Loader className="animate-spin size-10" />;

  return (
    <div className="max-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        
      </div>
      <div className="">
      
      <RouterProvider router={router} />

      </div>
    </div>
  );
}

export default App;
