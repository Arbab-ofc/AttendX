
import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { FaCheckCircle } from "react-icons/fa";
import TestimonialCarousel from "../components/TestimonialCarousel"; 
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const visitors = 12000;
const positiveFeedback = 10500;
const goalVisitors = 20000;

const punchlines = [
  
  "Smart Attendance, Zero Hassle",
  "Track Attendance. Save Time",
  "From Roll Call to Reports",
  "Attendance Made Easy & Fast",
  "One Tap, Full Control",

  
  "Time bachaao, tension hataao",
  "Manual register ka full stop",
  "Attendance ka smart jugaad",
  "Present-marking ab digital style",
  "Class ka attendance, bas ek smile",
];

const whyAttendX = [
  "Intuitive and user-friendly interface",
  "Track attendee engagement easily",
  "Receive instant feedback from participants",
  "Create unlimited events without hassle",
  "Secure data storage with encryption",
  "Customizable event templates",
  "24/7 support and assistance",
  "Boosts productivity  🚀",
];

const faqs = [
  { question: "Is AttendX free?", answer: "Yes, AttendX offers a free tier for small events and trials." },
  { question: "Can I manage multiple events?", answer: "Absolutely! You can manage unlimited events with one account." },
  { question: "Is my data secure?", answer: "Yes, we use top-level encryption and secure servers to protect your data." },
  { question: "Can I invite users easily?", answer: "Yes, share event links or QR codes for easy invitations." },
  { question: "Does it support mobile devices?", answer: "AttendX is fully responsive and works on mobile, tablet, and desktop." },
];

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(null);
  console.log("isLoggedIn", isLoggedIn);
  const handleCTA = () => {
    if (isLoggedIn) navigate("/dashboard");
    else navigate("/login");
  };

  return (
    <div className="w-full font-sans bg-black text-white">
      <section className="w-full py-20 px-6 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          
          <span className="text-gray-300">
            <Typewriter
              words={punchlines}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>

        
        <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-12 text-gray-300">
          <div className="text-center">
            <div className="text-4xl font-bold">{visitors.toLocaleString()}+</div>
            <p>Visitors</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{positiveFeedback.toLocaleString()}+</div>
            <p>Positive Feedback</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{goalVisitors.toLocaleString()}+</div>
            <p>Goal Visitors</p>
          </div>
        </div>
      </section>

      
      <section className="py-16 px-6 text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Why You Should Use AttendX</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyAttendX.map((point, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-gray-900 p-4 rounded-lg shadow-md">
              <FaCheckCircle className="w-6 h-6 text-yellow-400 mt-1" />
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="py-16 px-6 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-10">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto text-left">
          {faqs.map((faq, idx) => (
            <div key={idx} className="mb-4 border-b border-gray-700 pb-4">
              <button
                onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                className="w-full flex justify-between items-center font-bold text-lg"
              >
                {faq.question}
                <span>{activeFAQ === idx ? "-" : "+"}</span>
              </button>
              {activeFAQ === idx && <p className="mt-2 text-gray-300">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      
      <section className="py-16 px-6 bg-gray-950">
        <h2 className="text-3xl font-bold text-center mb-10">Testimonials</h2>
        <TestimonialCarousel />
      </section>

      
      <section className="py-20 px-6 text-center relative bg-black">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-pulse">
          Join AttendX Today
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Manage your events efficiently and effortlessly.
        </p>
        <button
          onClick={handleCTA}
          className="relative inline-block px-8 py-4 font-bold text-white rounded-full
                     neon-button shadow-lg hover:scale-105 transition-transform"
        >
          Get Started
        </button>
      </section>

      
      <style>
        {`
          .neon-button {
            text-shadow:
              0 0 5px #fff,
              0 0 0px #fff,
              0 0 0px #fff,
              0 0 0px #fff,
              0 0 0px #fff;
            box-shadow:
              0 0 5px #fff,
              0 0 10px #fff,
              0 0 20px #fff,
              0 0 10px #fff,
              0 0 10px #fff;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
