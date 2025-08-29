import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateCategory = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/attendance-category/create",
        { title, description },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Category created successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 p-6 gap-6">
      
      
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 h-[400px] md:h-[500px] relative flex items-center justify-center"
      >
        <div className="relative w-full md:w-[90%] h-full rounded-2xl bg-gradient-to-br from-indigo-500 via-pink-400 to-purple-600 shadow-2xl text-white p-10 flex flex-col justify-between overflow-hidden">
          
          
          <div className="absolute -top-16 -right-16 w-52 h-52 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-black opacity-10 rounded-full blur-3xl"></div>

          
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
              Organize Smarter,
              <br /> Manage Better
            </h1>
            <p className="mt-6 text-base md:text-lg font-light tracking-wide leading-relaxed">
              ✦ Create personalized categories <br />
              ✦ Keep your attendance structured <br />
              ✦ Empower your workflow
            </p>
          </div>

          
          <div className="flex justify-between items-center mt-8 text-xs md:text-sm opacity-80">
            <span>Issue #21 • AttendX</span>
            <span className="tracking-widest">||| || | |||| |</span>
          </div>
        </div>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full md:w-[500px] h-[500px] flex flex-col justify-center hover:shadow-2xl hover:scale-105 transition duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
            Create Category
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              rows="3"
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:from-pink-500 hover:to-purple-600 transition duration-300"
            >
              Create
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateCategory;
