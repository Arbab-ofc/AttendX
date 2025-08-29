import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaUser,
  FaCommentDots,
  FaCheckCircle,
  FaPaperPlane,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/contact-us", formData,);

      if (res.data.success) {
        toast.success("Message sent successfully!", {
          autoClose: 1200,
          pauseOnHover: false,
        });
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message", { autoClose: 1500 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        
        
        <div className="hidden md:flex flex-col justify-center p-10 space-y-6 bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <FaCheckCircle className="text-green-400" /> Why Contact Us?
          </h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center gap-3 hover:text-green-400 transition">
              <FaEnvelope /> Quick email support
            </li>
            <li className="flex items-center gap-3 hover:text-green-400 transition">
              <FaPhoneAlt /> Direct phone assistance
            </li>
            <li className="flex items-center gap-3 hover:text-green-400 transition">
              <FaMapMarkerAlt /> Office locations for queries
            </li>
            <li className="flex items-center gap-3 hover:text-green-400 transition">
              <FaCommentDots /> Personalized guidance
            </li>
          </ul>
        </div>

        
        <div className="flex flex-col justify-center p-10 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-md hover:shadow-lg transition">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>

            
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-md hover:shadow-lg transition">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>

            
            <div className="flex items-start gap-3 border rounded-xl px-4 py-3 bg-white shadow-md hover:shadow-lg transition">
              <FaCommentDots className="text-gray-500 mt-1" />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full outline-none resize-none"
              />
            </div>

            
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition"
            >
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
