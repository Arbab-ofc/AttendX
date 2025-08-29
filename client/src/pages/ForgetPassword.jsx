import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const res = await axios.post("https://attendx-v8hq.onrender.com/api/users/forget-password", { email });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/reset-password", { state: { email } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-gray-700 flex items-center justify-center bg-cover bg-center px-4"
    >
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden transition-all">
        
        <div className="hidden md:flex flex-col justify-center bg-green-600 text-white p-8 w-1/2 space-y-6 transition-all duration-500">
          <h2 className="text-3xl font-bold">Why Reset Your Password?</h2>
          <ul className="list-disc list-inside space-y-3 text-lg">
            <li>Secure your AttendX account</li>
            <li>Recover access easily</li>
            <li>Protect your personal data</li>
            <li>Get back on track quickly</li>
          </ul>
        </div>

        
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Forget Password
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all"
            >
              Send Reset OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
