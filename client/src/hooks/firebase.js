
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB9ab0vpQ9FREb4A-7l_PsJZEWSOX_2ZDg",
  authDomain: "attendx-84a73.firebaseapp.com",
  projectId: "attendx-84a73",
  storageBucket: "attendx-84a73.appspot.com",
  messagingSenderId: "268739232398",
  appId: "1:268739232398:web:f45e59007d9c1183f5ffdf"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);


export const googleProvider = new GoogleAuthProvider();


export default app;
