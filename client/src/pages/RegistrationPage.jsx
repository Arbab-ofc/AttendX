import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../hooks/firebase";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const RegistrationPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleVerifyUser = () => {
    navigate("/user-verification");
  }

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, phone, password } = formData;

    if (!name || !email || !phone || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://attendx-v8hq.onrender.com/api/users/register", {
        name,
        email,
        phone,
        password,
      });

      if (res.data.success) {
        toast.success("Registration Successful!");

        setTimeout(() => {
          navigate("/verify-otp", { state: { email } });
        }, 800);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await axios.post(
        "https://attendx-v8hq.onrender.com/api/users/google-auth",
        {
          name: user.displayName,
          email: user.email,
        },
        { withCredentials: true }
      );

      toast.success("Google Registration Successful!");
      setIsLoggedIn(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      console.error(error);
      toast.error("Google Register failed!");
    }
  };

  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 bg-neutral-900 text-white">
      
      <div className="hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-neutral-800 to-neutral-950 shadow-xl">
        <h1 className="font-extrabold mb-6 text-white leading-tight text-[clamp(1.2rem,3vw,2.5rem)]">
          Welcome to <span className="text-blue-400">AttendX</span>
        </h1>
        <ul className="space-y-3 text-lg text-gray-200">
          <li>✔ Real-time attendance</li>
          <li>✔ Easy event management</li>
          <li>✔ Secure & fast</li>
          <li>✔ Accessible anywhere</li>
          <li>✔ Professional experience</li>
        </ul>
      </div>

      
      <div className="flex items-center justify-center p-6">
        <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Create Your Account
          </h2>

          
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-xl text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          
          <button
            disabled={loading}
            onClick={handleRegister}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          
          <button
            onClick={handleGoogleRegister}
            className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-600 py-3 rounded-lg hover:bg-neutral-700 transition"
          >
            <FcGoogle size={22} /> Register with Google
          </button>

          
          <div className="text-center mt-6 text-sm text-gray-300">
            <p onClick={handleVerifyUser}  className="mb-2 cursor-pointer hover:underline">Verify your email</p>
            <p>
              Already registered?{" "}
              <span
                className="text-blue-400 cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
