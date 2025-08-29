import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateCategory() {
  const navigate = useNavigate();
  const { categoryId: paramId } = useParams();
  const location = useLocation();

  
  const categoryId = useMemo(
    () => paramId || location.state?.categoryId || null,
    [paramId, location.state]
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [initial, setInitial] = useState({ title: "", description: "" });

  useEffect(() => {
    if (!categoryId) {
      toast.error("Category ID missing!");
      return;
    }
    const fetchCategory = async () => {
      try {
        const res = await axiosInstance.get(`/attendance-category/${categoryId}`);
        const { title, description = "" } = res.data.category || {};
        setForm({ title, description });
        setInitial({ title, description });
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to load category");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [categoryId]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const hasChanges =
    form.title.trim() !== initial.title.trim() ||
    (form.description || "").trim() !== (initial.description || "").trim();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!hasChanges) {
      toast.info("No changes to save");
      return;
    }
    try {
      setSaving(true);
      const res = await axiosInstance.put(`/attendance-category/${categoryId}`, {
        title: form.title.trim(),
        description: (form.description || "").trim(),
      });
      if (res.data.success) {
        toast.dismiss();
        toast.success("Category updated successfully!", {
          autoClose: 900,
          pauseOnHover: false,
        });
        setInitial({ ...form });
        setTimeout(() => navigate("/dashboard"), 950);
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error while updating");
    } finally {
      setSaving(false);
    }
  };

  if (!categoryId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-800 to-gray-700 text-white">
        Category ID not provided
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-800 to-gray-700 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-800 to-gray-700 text-white px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">
        
        <div className="h-1 w-full bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-500" />

        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-gray-100 mb-6">
            Update Category
          </h1>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. DSA, Web Dev, Gym"
                value={form.title}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Short description (optional)"
                value={form.description}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving || !form.title.trim()}
                className={`px-5 py-3 rounded-lg font-semibold transition ${
                  saving || !form.title.trim()
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white"
                }`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 text-gray-100 transition"
              >
                Cancel
              </button>
            </div>

            {!hasChanges && (
              <p className="text-xs text-gray-400">
                Tip: Make a change to enable “Save Changes”.
              </p>
            )}
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}
