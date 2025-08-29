
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { AuthProvider } from './context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
    <AuthProvider>
         <App />
    </AuthProvider>
)
