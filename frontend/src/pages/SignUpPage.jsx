import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import {Loader} from "lucide-react"
import toast from "react-hot-toast";

const SignUpPage = () => {

  const {isSignUp , signUp } = useAuthStore()
 
  const [data , setData] = useState({
    fullName : "" ,
    email : "" ,
    password : ""
  })

  function validateForm() {
    console.log("sign up")

    if (!data.fullName?.trim() || !data.email?.trim() || !data.password?.trim()) {
      console.log("hi")
        toast.error("All fields are required");
        return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        toast.error("Invalid email");
        return false;
    }

    if (data.password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return false;
    }

    return true;
}


  async function handleSignUp(e){
    e.preventDefault() ;
    if(validateForm() === true) {
      await signUp(data);
      

    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
        <form
           onSubmit={ handleSignUp}
        >
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="fullname">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              onChange={(e)=>{
                setData({
                  ...data , 
                  fullName : e.target.value
                })
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={(e)=>{
                setData({
                  ...data , 
                  email : e.target.value
                })
              }}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={(e)=>{
                setData({
                  ...data , 
                  password : e.target.value
                })
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            disabled = {isSignUp} 
          >
          Sign Up
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;