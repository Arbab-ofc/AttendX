import { motion } from "framer-motion";
import { FaLock, FaUsers, FaBolt, FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiFirebase, SiJsonwebtokens, SiAxios , SiExpress } from "react-icons/si";export default function AboutUs() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 sm:px-12 py-12 space-y-24">
      
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
          About AttendX
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Making attendance smarter, simpler, and future-ready.
        </p>
      </motion.div>

      
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Why We Exist</h2>
          <ul className="space-y-3 text-gray-300 list-disc pl-6">
            <li>Traditional attendance wastes time ⏳</li>
            <li>Data loss & inaccuracy in manual registers 📒</li>
            <li>Lack of real-time tracking 📉</li>
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold text-lg text-cyan-400">Our Solution 🚀</h3>
          <p className="text-gray-300 mt-2">
            AttendX automates attendance, provides real-time tracking, ensures secure storage, and reduces human error.
          </p>
        </div>
      </div>

      
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-red-900/40 rounded-2xl">
          <h3 className="font-bold text-xl mb-3">Old Way ❌</h3>
          <ul className="space-y-2 text-gray-300 list-disc pl-6">
            <li>Manual Registers</li>
            <li>Time Wasted</li>
            <li>Inaccurate Reports</li>
          </ul>
        </div>
        <div className="p-6 bg-green-900/40 rounded-2xl">
          <h3 className="font-bold text-xl mb-3">AttendX Way ✅</h3>
          <ul className="space-y-2 text-gray-300 list-disc pl-6">
            <li>Automated Attendance</li>
            <li>Real-Time Analytics</li>
            <li>Cloud-Secured Data</li>
          </ul>
        </div>
      </div>

      
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 text-center">
        <div className="bg-gray-800 p-6 rounded-2xl">
          <h3 className="text-cyan-400 font-bold text-xl">Our Vision 👀</h3>
          <p className="mt-2 text-gray-300">To make attendance seamless and intelligent for every institution.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl">
          <h3 className="text-blue-400 font-bold text-xl">Our Mission 🎯</h3>
          <p className="mt-2 text-gray-300">Empower organizations with a fast, reliable, and secure attendance system.</p>
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Fun Fact 🎉</h2>
        <p className="text-gray-300">AttendX has saved over <b>1000+ hours</b> of manual work till date!</p>
      </div>

      
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div><h3 className="text-3xl font-bold">10+</h3><p className="text-gray-400">Institutions</p></div>
        <div><h3 className="text-3xl font-bold">5k+</h3><p className="text-gray-400">Users</p></div>
        <div><h3 className="text-3xl font-bold">99.9%</h3><p className="text-gray-400">Accuracy</p></div>
        <div><h3 className="text-3xl font-bold">1000+</h3><p className="text-gray-400">Hours Saved</p></div>
      </div>

      
      <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
        <div className="bg-gray-800 p-6 rounded-2xl">
          <FaLock className="text-3xl text-cyan-400 mx-auto" />
          <h4 className="mt-3 font-bold">Security</h4>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl">
          <FaUsers className="text-3xl text-blue-400 mx-auto" />
          <h4 className="mt-3 font-bold">Collaboration</h4>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl">
          <FaBolt className="text-3xl text-yellow-400 mx-auto" />
          <h4 className="mt-3 font-bold">Speed</h4>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-6">Our Tech Stack ⚙️</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: <FaReact className="text-cyan-400 text-4xl" />, name: "React" },
            { icon: <SiTailwindcss className="text-sky-400 text-4xl" />, name: "TailwindCSS" },
            { icon: <FaNodeJs className="text-green-500 text-4xl" />, name: "Node.js" },
            { icon: <SiMongodb className="text-green-400 text-4xl" />, name: "MongoDB" },
            { icon: <SiFirebase className="text-yellow-400 text-4xl" />, name: "Firebase" },
            { icon: <SiJsonwebtokens className="text-red-400 text-4xl" />, name: "JWT" },
            { icon: <SiAxios className="text-blue-400 text-4xl" />, name: "Axios" },
            { icon: <SiExpress className="text-gray-500 text-4xl" />, name: "Express.js" },
          ].map((tech, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              {tech.icon}
              <p className="mt-2 text-gray-300">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto text-center bg-gray-800 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-3">What Our Creator Says 👨‍💻</h2>
        <p className="text-gray-300">
          “AttendX was born to solve a simple but painful problem — wasted time on attendance.
          I built AttendX so that institutions can focus on what truly matters: <b>learning & growth</b>.”
        </p>
      </div>
    </div>
  );
}
