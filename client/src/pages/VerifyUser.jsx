import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyUser = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const res = await axios.post("https://attendx-v8hq.onrender.com/api/users/resend-otp", {
        email,
      });

      if (res.data.success) {
        toast.success(res.data.message || "OTP sent successfully!");
        navigate("/verify-otp", { state: { email } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-800 to-gray-700 p-6 transition-all duration-500">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-2xl shadow-lg overflow-hidden bg-white">
        
        
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-500 to-green-700 text-white p-10 flex-col justify-center transition-all duration-700">
          <h2 className="text-3xl font-bold mb-4">Verify Your Account</h2>
          <p className="text-lg leading-relaxed">
            Welcome to <b>AttendX</b>! <br />
            For your security, we require you to verify your account using a 
            One-Time Password (OTP). Enter your email and we’ll send the OTP 
            to you. The OTP will be valid for 10 minutes.
          </p>
        </div>

        
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Resend Verification OTP
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
            >
              Send OTP
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Didn’t receive your OTP earlier? Enter your email again and we’ll send a new one.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
