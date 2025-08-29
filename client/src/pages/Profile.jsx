
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUserCircle,
  FaEdit,
  FaSave,
  FaLock,
  FaSignOutAlt,
  FaTrash,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const [hasPassword, setHasPassword] = useState(false);

  
  const ok = (m) => {
    toast.dismiss();
    toast.success(m);
  };
  const err = (m) => {
    toast.dismiss();
    toast.error(m);
  };

  
  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/users/current-user", {
        withCredentials: true,
      });
      setUser(res.data.user);
      setName(res.data.user.name || "");
      setPhone(res.data.user.phone || "");

      
      try {
        const hp = await axiosInstance.get("/users/has-password", {
          withCredentials: true,
        });
        setHasPassword(Boolean(hp.data?.hasPassword));
      } catch {
        
        setHasPassword(false);
      }
    } catch (e) {
      console.error(e);
      err("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    toast.dismiss(); 
  }, []);

  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        "/users/update",
        { name, phone },
        { withCredentials: true }
      );
      if (res.data.success) {
        ok("Profile updated");
        await loadUser();
      } else {
        err(res.data.message || "Update failed");
      }
    } catch (e) {
      console.error(e);
      err(e.response?.data?.message || "Update failed");
    }
  };

  
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      return err("All password fields are required");
    }
    try {
      const res = await axiosInstance.post(
        "/users/change-password",
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      if (res.data.success) {
        ok("Password changed");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        err(res.data.message || "Change password failed");
      }
    } catch (e) {
      console.error(e);
      err(e.response?.data?.message || "Change password failed");
    }
  };

  
  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post(
        "/users/logout",
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        ok("Logged out");
        setIsLoggedIn(false);
        setTimeout(() => navigate("/login"), 600);
      } else {
        err(res.data.message || "Logout failed");
      }
    } catch (e) {
      console.error(e);
      err("Logout failed");
    }
  };

 
  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Delete your account permanently? This cannot be undone."
      )
    )
      return;
    try {
      const res = await axiosInstance.delete("/users/delete-account", {
        withCredentials: true,
      });
      if (res.data.success) {
        ok("Account deleted");
        setIsLoggedIn(false);
        setTimeout(() => navigate("/register"), 800);
      } else {
        err(res.data.message || "Delete failed");
      }
    } catch (e) {
      console.error(e);
      err(e.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading profile…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center">
        <div className="text-gray-700">No user found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-4 sm:p-6">
      
      <div className="max-w-6xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <FaUserCircle className="text-4xl sm:text-5xl text-purple-600" />
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
              {user.name || "User"}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base break-all">
              {user.email}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              {user.isVerified ? "✅ Verified" : "⚠ Not Verified"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-red-600 border border-red-200 hover:bg-red-50 px-3 sm:px-4 py-2 rounded-xl shadow-sm"
          >
            <FaSignOutAlt /> Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 px-3 sm:px-4 py-2 rounded-xl shadow"
          >
            <FaTrash /> Delete Account
          </button>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        <div className="bg-white rounded-2xl shadow p-5 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
            Profile
          </h2>
          <div className="space-y-3 text-gray-700 text-sm sm:text-base">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Name</span>
              <span className="font-medium truncate max-w-[60%] text-right">
                {user.name || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-normal break-all text-right">
                {user.email || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium truncate max-w-[60%] text-right">
                {user.phone || "-"}
              </span>
            </div>
            <div className="pt-3 text-xs sm:text-sm text-gray-500">
              Tip: Email can’t be changed.
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow p-5 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <FaEdit /> Edit Details
          </h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                Name
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                Phone
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow"
            >
              <FaSave /> Save Changes
            </button>
          </form>
        </div>

        
        {hasPassword && (
          <div className="bg-white rounded-2xl shadow p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <FaLock /> Change Password
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Old password"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow"
              >
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        theme="colored"
      />
    </div>
  );
};

export default Profile;
