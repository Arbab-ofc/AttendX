import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../hooks/firebase";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const HandleNavigate = () => {
    navigate("/forget-password");
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Email and Password are required!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
  "http://localhost:3000/api/users/login",
  {
    email,
    password,
  },
  {
    withCredentials: true,
  }
);

      if (res.data.success) {
        toast.success("Login Successful!");
        setIsLoggedIn(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 800);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await axios.post(
        "http://localhost:3000/api/users/google-auth",
        {
          name: user.displayName,
          email: user.email,
        },
        { withCredentials: true }
      );

      toast.success("Google Login Successful!");
      setIsLoggedIn(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      console.error(error);
      toast.error("Google Login failed!");
    }
  };

  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-neutral-900 text-white">
      
      <div className="flex items-center justify-center p-6">
        <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Login to Your Account
          </h2>

          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
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
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-600 py-3 rounded-lg hover:bg-neutral-700 transition"
          >
            <FcGoogle size={22} /> Login with Google
          </button>

          
          <div className="text-center mt-6 text-sm text-gray-300">
            <p>
              Not registered?{" "}
              <span
                className="text-blue-400 cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </p>
            <p onClick={HandleNavigate} className="mt-2 cursor-pointer hover:underline">Forgot Password?</p>
          </div>
        </div>
      </div>

      
      <div className="hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-neutral-800 to-neutral-950 shadow-xl">
        <h1 className="font-extrabold mb-6 text-white leading-tight text-[clamp(1.2rem,3vw,2.5rem)]">
          Welcome back to <span className="text-blue-400">AttendX</span>
        </h1>
        <ul className="space-y-3 text-lg text-gray-200">
          <li>✔ Quick and secure login</li>
          <li>✔ Access your dashboard instantly</li>
          <li>✔ Seamless Google sign-in</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
