import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/users/reset-password", {
        email,
        otp,
        newPassword,
        confirmPassword,
      });

      if (res.data.success) {
        toast.success("Password reset successfully!", {
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden transition-all duration-500">
        
        
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white flex-col justify-center items-center p-10 space-y-8 transition-all duration-500 relative">
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          
          <h2 className="text-4xl font-extrabold z-10 text-center drop-shadow-lg">
            Reset Your Password 🔐
          </h2>
          <p className="text-lg text-center max-w-md z-10 text-gray-200">
            Secure your <span className="font-semibold text-white">AttendX</span> account in a few easy steps.
          </p>

          <ul className="space-y-5 text-left z-10">
            <li className="flex items-center space-x-3">
              <span className="text-2xl">📧</span>
              <span className="text-lg">Enter the OTP from your email</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-2xl">🔑</span>
              <span className="text-lg">Create a strong new password</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-2xl">✅</span>
              <span className="text-lg">Confirm and reset securely</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-2xl">🚀</span>
              <span className="text-lg">Login again with confidence</span>
            </li>
          </ul>
        </div>

        
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email || ""}
                disabled
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>

      
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordPage;
