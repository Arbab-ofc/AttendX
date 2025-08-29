import React from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-12 bg-black">
      
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 animate-hue bg-[radial-gradient(1200px_800px_at_80%_-10%,#1e40af33,transparent_60%),radial-gradient(1000px_700px_at_15%_30%,#064e3b33,transparent_60%),radial-gradient(900px_700px_at_50%_120%,#4c1d9533,transparent_60%)]" />
        <div className="absolute -top-10 right-[-6rem] w-[28rem] h-[28rem] bg-blue-700/20 blur-3xl rounded-full animate-float" />
        <div className="absolute bottom-16 left-[-8rem] w-[26rem] h-[26rem] bg-emerald-700/20 blur-3xl rounded-full animate-float-slow" />
        <div className="absolute bottom-[-6rem] right-1/3 w-[36rem] h-[36rem] bg-violet-700/20 blur-3xl rounded-full animate-float-slower" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        
        <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-700/30 to-purple-700/30 blur-2xl rounded-3xl" />

        
        <motion.div
          className="relative rounded-2xl shadow-2xl ring-1 ring-white/10 backdrop-blur-xl
                     bg-black/40 border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          
          <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10 bg-black/40">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <div className="ml-3 text-xs text-white/60 truncate">AttendX — Terms & Conditions</div>
          </div>

          
          <div className="p-6 sm:p-10 text-white/90">
            <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
            <p className="mb-6 text-white/70">
              By using AttendX, you agree to these terms. Please read carefully.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-2">1. Use of Service</h2>
                <p className="text-white/80">Use AttendX lawfully and responsibly.</p>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
                <p className="text-white/80">You are responsible for your account.</p>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-2">3. Limitation of Liability</h2>
                <p className="text-white/80">AttendX is provided “as-is.”</p>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-2">4. Changes to Terms</h2>
                <p className="text-white/80">We may update these terms anytime.</p>
              </section>
            </div>

            <p className="text-sm text-white/60 mt-8">
              Last updated: {new Date().toDateString()}
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes hueRotate { 0% { filter: hue-rotate(0deg)} 100%{ filter:hue-rotate(360deg)} }
        .animate-hue { animation: hueRotate 18s linear infinite; }
        @keyframes float { 0%,100%{ transform:translateY(0)} 50%{ transform:translateY(-16px)} }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-slow { animation: float 12s ease-in-out infinite; }
        .animate-float-slower { animation: float 16s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;
