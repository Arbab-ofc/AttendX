
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white flex items-center justify-center px-4 py-10">
      
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,#ff0080,#7928ca,#2af598,#009efd,#f6d365,#f093fb)] bg-[length:200%_100%] animate-[scan_12s_linear_infinite]" />

      
      <div className="absolute inset-0">
        <div className="absolute w-1 h-1 bg-white/40 rounded-full left-1/5 top-1/4 blur-[1px]" />
        <div className="absolute w-1 h-1 bg-white/40 rounded-full left-2/3 top-1/3 blur-[1px]" />
        <div className="absolute w-1 h-1 bg-white/40 rounded-full left-1/2 top-2/3 blur-[1px]" />
        <div className="absolute w-1 h-1 bg-white/40 rounded-full left-3/4 top-1/5 blur-[1px]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        
        <div className="mx-auto rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/10 overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-900/70 to-neutral-800/80 backdrop-blur-xl">
          
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-neutral-900/60">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="ml-auto flex items-center gap-2 text-xs sm:text-sm text-white/60 bg-white/5 rounded-lg px-2 py-1">
              <FiSearch className="opacity-70" />
              <span className="truncate">Search…</span>
            </div>
          </div>

          
          <div className="p-6 sm:p-10">
            
            <div className="flex flex-col items-center text-center">
              <motion.h1
                className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent drop-shadow"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                404
              </motion.h1>
              <p className="mt-3 text-lg sm:text-xl text-white/80">
                Oops! The page you’re looking for doesn’t exist.
              </p>
              <p className="text-sm text-white/50">
                It may have been moved, renamed, or never existed at all.
              </p>
            </div>

            
            <motion.div
              className="mt-8 sm:mt-10 mx-auto max-w-lg aspect-[16/9] rounded-xl border border-white/10 bg-gradient-to-b from-neutral-800/70 to-neutral-900/70 backdrop-blur-md flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
            >
              
              <svg
                viewBox="0 0 200 120"
                className="w-[85%] h-[85%] opacity-90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="10" y="20" width="180" height="80" rx="10" className="fill-white/5 stroke-white/15" />
                <path d="M20 40 C60 10, 140 130, 180 40" className="stroke-cyan-400/70" strokeWidth="2" />
                <circle cx="55" cy="55" r="6" className="fill-emerald-400/80" />
                <circle cx="110" cy="70" r="6" className="fill-fuchsia-400/80" />
                <circle cx="150" cy="50" r="6" className="fill-yellow-400/80" />
                <path d="M100 25 L105 40 L95 40 Z" className="fill-white/60" />
              </svg>
            </motion.div>

            
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition border border-white/10"
              >
                <FiArrowLeft className="opacity-80 group-hover:-translate-x-0.5 transition" />
                Go Back
              </button>
              <button
                onClick={() => navigate("/")}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 transition shadow"
              >
                <FiHome className="opacity-90" />
                Go Home
              </button>
            </div>

            
            <div className="mt-6 text-center text-xs text-white/40">
              Error code: <span className="font-mono">404_NOT_FOUND</span>
            </div>
          </div>
        </div>
      </motion.div>

      
      <style>{`
        @keyframes scan {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
