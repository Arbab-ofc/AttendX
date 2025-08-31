import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FaFolderOpen,
  FaSignOutAlt,
  FaUserCircle,
  FaPlusCircle,
  FaCog,
} from "react-icons/fa";
import CategoryCard from "../components/CategoryCard.jsx";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";


const Dashboard = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.post(
        "https://attendx-v8hq.onrender.com/api/users/logout",
        {},
        { withCredentials: true }
      );
      console.log("Logout successful");
      
      toast.dismiss();
      toast.success("Logged out successfully!", {
        autoClose: 600,
        pauseOnHover: false,
        draggable: false,
      });
      setIsLoggedIn(false);
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      console.error(err);
      toast.error("Logout failed!", { autoClose: 1500 });
    }
  };

  const fetchDashboardData = async () => {
    try {
      const userRes = await axiosInstance.get("users/current-user");
      setUser(userRes.data.user);

      const categoryRes = await axiosInstance.get("attendance-category/all");
      console.log(categoryRes.data.data)
      setCategories(categoryRes.data.data);

      toast.success("Dashboard data loaded 🚀");
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard data ❌");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Hey {user?.name || "User"} 👋
          </h1>
          <p className="text-gray-600">Today is {today}</p>
          <p className="italic text-purple-700">
            “Consistency beats intensity. Keep showing up! 💪”
          </p>
        </div>
        <div className="hover:scale-105 flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-md">
          <FaUserCircle className="text-3xl text-purple-600" />
          <button  onClick={logoutHandler} className="flex items-center gap-2 text-red-500">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      
      <div className="bg-gradient-to-r from-pink-500 to-red-400 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center hover:scale-105 transition mb-8">
        <div className="flex items-center gap-4">
          <FaFolderOpen className="text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Categories</h2>
            <p className="text-2xl font-bold">{categories.length}</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/create-category")}
          className="flex items-center gap-2 bg-white text-pink-600 px-3 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          <FaPlusCircle /> Create
        </button>
      </div>

      
      {categories.length > 0 && (
        <div  className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-lg font-semibold mb-4">Your Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat._id} category={cat} />
            ))}
          </div>
        </div>
      )}

      
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Profile & Settings</h2>
        <div className="flex flex-col gap-3">
          <button onClick={() => navigate("/profile")} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            <FaUserCircle /> Edit Profile
          </button>
          <button onClick={() => navigate("/change-password")} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            <FaCog /> Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
