import React, { useState , useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const VerifyOtp = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!email || !otp) {
      toast.error("Email and OTP are required!");
      return;
    }

    try {
      setLoading(true);

      
      const res = await axios.post(
        "https://attendx-v8hq.onrender.com/api/users/verify-otp",
        { email, otp },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("OTP Verified Successfully!");
        setTimeout(() => {
          setIsLoggedIn(true);
          navigate("/login");
        }, 800);
      } else {
        toast.error(res.data.message || "OTP Verification failed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-neutral-900 text-white">
      
      
      <div className="hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-neutral-800 to-neutral-950 shadow-xl">
        <h1 className="font-extrabold mb-6 text-white text-[clamp(1.2rem,3vw,2.5rem)]">
          Email Verification
        </h1>
        <ul className="space-y-4 text-lg text-gray-300">
          <li>✔ Enter your registered email</li>
          <li>✔ Check your inbox for the OTP</li>
          <li>✔ Enter OTP here to verify</li>
          <li>✔ Secure your account access</li>
        </ul>
      </div>

      
      <div className="flex items-center justify-center p-6">
        <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Verify OTP
          </h2>

          
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-neutral-900 text-gray-400 focus:outline-none"
          />

          
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
