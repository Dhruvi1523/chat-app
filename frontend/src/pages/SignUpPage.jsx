import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const { isSignUp, signUp } = useAuthStore();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  function validateForm() {
    if (!data.fullName?.trim() || !data.email?.trim() || !data.password?.trim()) {
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

  async function handleSignUp(e) {
    e.preventDefault();
    if (validateForm() === true) {
      await signUp(data);
    }
  }

  return (
    <div className="min-h-screen bg-[#2B2B2B] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-[#3E3E3E] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md border border-[#4E4E4E]">
        <h2 className="text-3xl font-bold text-[#E0E0E0] mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              className="block text-[#D0D0D0] text-sm sm:text-base font-bold mb-2" // Improved contrast
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className={`w-full px-3 py-2 bg-[#3E3E3E] text-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9F43] border ${
                data.fullName && !data.fullName.trim() ? "border-red-500" : "border-[#4E4E4E]"
              } text-sm sm:text-base`} // Enhancement: Validation feedback
              placeholder="Enter your full name"
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
              aria-label="Full name" // Accessibility
            />
            {data.fullName && !data.fullName.trim() && (
              <p className="text-red-500 text-xs mt-1">Full name is required</p> // Enhancement: Validation error
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-[#D0D0D0] text-sm sm:text-base font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-3 py-2 bg-[#3E3E3E] text-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9F43] border ${
                data.email && !/^\S+@\S+\.\S+$/.test(data.email) ? "border-red-500" : "border-[#4E4E4E]"
              } text-sm sm:text-base`} // Enhancement: Validation feedback
              placeholder="Enter your email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              aria-label="Email address" // Accessibility
            />
            {data.email && !/^\S+@\S+\.\S+$/.test(data.email) && (
              <p className="text-red-500 text-xs mt-1">Invalid email format</p> // Enhancement: Validation error
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-[#D0D0D0] text-sm sm:text-base font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-3 py-2 bg-[#3E3E3E] text-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9F43] border ${
                data.password && data.password.length < 6 ? "border-red-500" : "border-[#4E4E4E]"
              } text-sm sm:text-base`} // Enhancement: Validation feedback
              placeholder="Enter your password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              aria-label="Password" // Accessibility
            />
            {data.password && data.password.length < 6 && (
              <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters</p> // Enhancement: Validation error
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF9F43] text-[#2B2B2B] py-2 sm:py-3 rounded-lg hover:bg-[#FFAB5C] transition duration-200 font-bold text-sm sm:text-base" // Softer hover
            disabled={isSignUp}
            aria-label="Sign up" // Accessibility
          >
            {isSignUp ? <Loader className="animate-spin mx-auto" /> : "Sign Up"}
          </button>
        </form>
        <p className="text-[#D0D0D0] text-sm sm:text-base mt-4 text-center"> {/* Improved contrast */}
          Already have an account?{" "}
          <a href="/login" className="text-[#FF9F43] hover:text-[#FFAB5C] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;