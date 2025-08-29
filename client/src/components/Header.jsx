import { useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUser, FaSignInAlt, FaUserPlus, 
  FaInfoCircle, FaPhone, FaTachometerAlt, 
  FaSignOutAlt, FaBars, FaTimes, FaHome
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../context/AuthContext";

const RippleLink = ({ to, children, onClick }) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple = { x, y, size };

    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
  };

  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative overflow-hidden px-2 py-1"
      onMouseDown={createRipple}
    >
      {children}
      {ripples.map((r, i) => (
        <span
          key={i}
          className="absolute bg-gray-400 opacity-40 rounded-full animate-ripple"
          style={{
            width: r.size,
            height: r.size,
            left: r.x,
            top: r.y,
          }}
        />
      ))}
    </Link>
  );
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

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

  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  
  const commonLinks = [
    { name: "Contact Us", icon: <FaPhone />, path: "/contact-us" },
    { name: "About Us", icon: <FaInfoCircle />, path: "/about-us" },
  ];

  
  const guestLinks = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Login", icon: <FaSignInAlt />, path: "/login" },
    { name: "Register", icon: <FaUserPlus />, path: "/register" },
  ];

  
  const userLinks = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Logout", icon: <FaSignOutAlt />, onClick: logoutHandler },
  ];

  
  const links = [...commonLinks, ...(isLoggedIn ? userLinks : guestLinks)];

  return (
    <header className="bg-gradient-to-r from-black via-gray-800 to-gray-700 text-white shadow-lg static top-0 z-50">
      <div className="flex justify-between items-center px-6 py-3">
        
        <motion.h1
          onClick={() => navigate("/")}
          className="text-3xl font-extrabold cursor-pointer select-none"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-white to-gray-400 drop-shadow-md"
            style={{ backgroundSize: "200% 200%" }}
            whileHover={{
              textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
              color: "#f3f4f6",
            }}
          >
            AttendX
          </motion.span>
        </motion.h1>

        
        {isDesktop && (
          <nav className="flex gap-8">
            {links.map((link, idx) =>
              link.path ? (
                <RippleLink key={idx} to={link.path}>
                  <motion.span
                    className="relative text-base font-medium cursor-pointer text-gray-200 flex items-center gap-2"
                    whileHover={{ scale: 1.1, color: "#9ca3af" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.icon}
                    {link.name}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-400 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.span>
                </RippleLink>
              ) : (
                <button
                  key={idx}
                  onClick={link.onClick}
                  className="flex items-center gap-2 text-gray-200 hover:text-gray-400 transition"
                >
                  {link.icon}
                  {link.name}
                </button>
              )
            )}
          </nav>
        )}

        
        {isTablet && (
          <nav className="flex gap-12">
            {links.map((link, idx) =>
              link.path ? (
                <RippleLink key={idx} to={link.path}>
                  <motion.div className="text-2xl text-gray-300 hover:scale-125 transition">
                    {link.icon}
                  </motion.div>
                </RippleLink>
              ) : (
                <button
                  key={idx}
                  onClick={link.onClick}
                  className="text-2xl text-gray-300 hover:scale-125 transition"
                >
                  {link.icon}
                </button>
              )
            )}
          </nav>
        )}

        
        {isMobile && (
          <div
            className="text-2xl cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </div>
        )}
      </div>

      
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 flex flex-col items-center justify-center z-50"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="absolute top-6 right-6 text-3xl cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </div>

            {links.map((link, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.15, color: "#9ca3af" }}
                className="mb-6"
              >
                {link.path ? (
                  <RippleLink
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="text-xl flex items-center gap-3 transition">
                      {link.icon} <span>{link.name}</span>
                    </span>
                  </RippleLink>
                ) : (
                  <button
                    onClick={() => {
                      link.onClick();
                      setMenuOpen(false);
                    }}
                    className="text-xl flex items-center gap-3 text-gray-200 hover:text-gray-400 transition"
                  >
                    {link.icon} <span>{link.name}</span>
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
