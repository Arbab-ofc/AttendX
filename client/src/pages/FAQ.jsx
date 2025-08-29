import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is AttendX?",
    a: "AttendX helps you create categories and mark attendance (present/absent/leave), view trends, export CSVs, and manage your profile securely."
  },
  {
    q: "How do I create a new category?",
    a: "Go to Dashboard → Create Category. Give it a title and description, then start marking attendance for that category."
  },
  {
    q: "Can I edit or delete attendance for a specific date?",
    a: "Yes. Open a category, pick a date with the mini date picker, then use Update or Delete for that record."
  },
  {
    q: "How is my data secured?",
    a: "We use secure cookies/session handling, hashed passwords, and server-side validation. We never sell your data."
  },
  {
    q: "How do I export my attendance?",
    a: "Open a category and click Export to download a CSV with date, status, and timestamps."
  },
  {
    q: "I signed up with Google. Can I change password?",
    a: "Google-registered accounts don’t have a local password. You’ll see a message on the Change Password page explaining this."
  },
  {
    q: "Why can I mark attendance only for today (by default)?",
    a: "To keep records accurate. You can still mark other dates via the mini date picker controls on the category page."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-12 bg-black">
      
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 animate-hue bg-[radial-gradient(1200px_800px_at_10%_-10%,#4c1d9533,transparent_60%),radial-gradient(1000px_700px_at_90%_20%,#1e3a8a33,transparent_60%),radial-gradient(900px_700px_at_50%_120%,#9d174d33,transparent_60%)]" />
        <div className="absolute -top-16 -left-16 w-96 h-96 bg-purple-700/20 blur-3xl rounded-full animate-float-slow" />
        <div className="absolute top-24 -right-20 w-[28rem] h-[28rem] bg-indigo-700/20 blur-3xl rounded-full animate-float" />
        <div className="absolute bottom-[-6rem] left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-pink-700/20 blur-3xl rounded-full animate-float-slower" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        
        <div className="absolute -inset-2 bg-gradient-to-tr from-purple-700/30 to-indigo-700/30 blur-2xl rounded-3xl" />

        
        <motion.div
          className="relative rounded-2xl shadow-2xl ring-1 ring-white/10 backdrop-blur-xl bg-black/40 border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          
          <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10 bg-black/40">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <div className="ml-3 text-xs text-white/60 truncate">AttendX — FAQs</div>
          </div>

          
          <div className="p-6 sm:p-10 text-white/90">
            <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
            <p className="mb-8 text-white/70">
              Quick answers about AttendX. Tap a question to expand.
            </p>

            <ul className="space-y-3">
              {faqs.map((item, i) => (
                <li key={i}>
                  <motion.button
                    onClick={() => toggle(i)}
                    aria-expanded={openIndex === i}
                    className="w-full text-left bg-white/5 hover:bg-white/10 transition
                               border border-white/10 rounded-xl px-4 py-4
                               flex items-start justify-between gap-4"
                    whileTap={{ scale: 0.995 }}
                  >
                    <span className="font-medium text-white/90">{item.q}</span>
                    <motion.span
                      className="ml-4 text-white/60"
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      ▼
                    </motion.span>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pt-3 pb-5 text-white/80">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

            
            <div className="mt-8 text-sm text-white/60">
              Didn’t find your answer? Reach us via the Contact page.
            </div>
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

export default FAQ;
