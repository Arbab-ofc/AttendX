import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); 

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("https://attendx-v8hq.onrender.com/api/users/current-user", {
          withCredentials: true,
        });

        if (res.data.success) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
