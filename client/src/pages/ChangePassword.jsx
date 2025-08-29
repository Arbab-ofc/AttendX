// src/pages/ChangePassword.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [hasPassword, setHasPassword] = useState(false);

  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(() => {
    const check = async () => {
      try {
        const res = await axiosInstance.get("/users/has-password");
        setHasPassword(Boolean(res.data?.hasPassword));
      } catch (err) {
        console.error(err);
        toast.error("Failed to check password status");
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  const canSubmit =
    hasPassword &&
    oldPassword.trim().length >= 1 &&
    newPassword.trim().length >= 6 &&
    passwordsMatch &&
    !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      const res = await axiosInstance.post("/users/change-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (res.data?.success) {
        toast.dismiss();
        toast.success("Password changed successfully ✅", { autoClose: 1000 });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.data?.message || "Change password failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Change password failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Change Password
          </h1>
          <p className="text-gray-300 mt-1">
            Keep your account secure by choosing a strong password.
          </p>
        </div>

        
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6">
          {loading ? (
            <div className="text-gray-300 text-center">Loading…</div>
          ) : !hasPassword ? (
            
            <div className="text-center space-y-4">
              <p className="text-gray-200 font-medium">
                You are a <span className="text-purple-400">Google registered user</span>,
                so you can’t change password.
              </p>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
              >
                Go to Home
              </button>
            </div>
          ) : (
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Old Password
                </label>
                <div className="relative">
                  <input
                    type={showOld ? "text" : "password"}
                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                    onClick={() => setShowOld((s) => !s)}
                    aria-label="Toggle old password visibility"
                  >
                    {showOld ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>

              
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                    onClick={() => setShowNew((s) => !s)}
                    aria-label="Toggle new password visibility"
                  >
                    {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>

              
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                    onClick={() => setShowConfirm((s) => !s)}
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="text-sm text-red-400 mt-1">
                    Passwords do not match.
                  </p>
                )}
              </div>

              
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  canSubmit
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-gray-700 text-gray-300 cursor-not-allowed"
                }`}
              >
                {submitting ? "Updating…" : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>

      
      <ToastContainer
        position="top-right"
        autoClose={1200}
        pauseOnHover={false}
        closeOnClick
      />
    </div>
  );
};

export default ChangePassword;
