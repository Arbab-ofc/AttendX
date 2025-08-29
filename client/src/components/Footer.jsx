import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Footer() {
  const { isLoggedIn } = useContext(AuthContext);

  
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about-us" },
    { label: "Contact Us", to: "/contact-us" },
    
    isLoggedIn
      ? { label: "Dashboard", to: "/dashboard" }
      : { label: "Login", to: "/login" },
  ];

  const supportLinks = [
    { label: "FAQ", to: "/faq" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms & Conditions", to: "/terms-and-conditions" },
    { label: "Help Center", to: "/contact-us" },
  ];

  return (
    <footer className="bg-gradient-to-r from-black via-gray-800 to-gray-700 text-gray-300">
      <div className="max-w-7xl mx-auto px-0 py-12">
        
        <div className="grid grid-cols-1 gap-10 lg:hidden text-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-white to-gray-400 cursor-pointer"
            >
              AttendX
            </motion.h2>
            <p className="mt-3 text-sm text-gray-400">
              Your Attendance, Simplified.
            </p>

            <div className="flex justify-center gap-5 mt-5 text-xl">
              <motion.a whileHover={{ scale: 1.2, color: "#D44638" }} href="mailto:arbabprvt22@gmail.com">
                <FaEnvelope />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2, color: "#0A66C2" }} href="https://www.linkedin.com/in/arbab-arshad-0b2961326/">
                <FaLinkedin />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2, color: "#fff" }} href="https://github.com/Arbab-ofc">
                <FaGithub />
              </motion.a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((item, i) => (
                  <li key={i}>
                    <Link to={item.to} className="relative group">
                      {item.label}
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((item, i) => (
                  <li key={i}>
                    <Link to={item.to} className="relative group">
                      {item.label}
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>Email: arbabprvt22@gmail.com</li>
              <li>Phone: +91 91423 14823</li>
              <li>Address: Patna, India</li>
            </ul>
          </div>
        </div>

       
        <div className="hidden lg:grid grid-cols-4 gap-12 text-left">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-white to-gray-400 cursor-pointer"
            >
              AttendX
            </motion.h2>
            <p className="mt-3 text-sm text-gray-400">
              Your Attendance, Simplified.
            </p>

            <div className="flex gap-5 mt-5 text-xl">
              <motion.a whileHover={{ scale: 1.2, color: "#D44638" }} href="mailto:arbabprvt22@gmail.com">
                <FaEnvelope />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2, color: "#0A66C2" }} href="https://www.linkedin.com/in/arbab-arshad-0b2961326/">
                <FaLinkedin />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2, color: "#fff" }} href="https://github.com/Arbab-ofc">
                <FaGithub />
              </motion.a>
            </div>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item, i) => (
                <li key={i}>
                  <Link to={item.to} className="relative group">
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((item, i) => (
                <li key={i}>
                  <Link to={item.to} className="relative group">
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>Email: arbabprvt22@gmail.com</li>
              <li>Phone: +91 91423 14823</li>
              <li>Address: Patna, India</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} AttendX. All rights reserved.
        <span className="ml-2">Made with ❤️ by Arbab Arshad</span>
      </div>
    </footer>
  );
}
