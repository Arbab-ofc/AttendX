import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import RegistrationPage from './pages/RegistrationPage';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import VerifyOtp from "./pages/VerifyOtp";
import VerifyUser from "./pages/VerifyUser";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import CreateCategory from "./pages/CreateCategory";
import CategoryAttendancePage from "./pages/CategoryAttendancePage";
import UpdateCategory from "./pages/UpdateCategory";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import FAQ from "./pages/FAQ";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />

      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <RegistrationPage /> : <Navigate to="/dashboard" />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/user-verification" element={<VerifyUser />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/category" element={<CategoryAttendancePage />} />
        <Route path="/categories/:categoryId/edit" element={<UpdateCategory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable={false}
        theme="dark"
      />
    </Router>
  );
};

export default App;
