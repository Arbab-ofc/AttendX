import express from 'express';
import {registerUser , loginUser , googleAuth , logoutUser , getCurrentUser , verifyOtp , resendOtp , forgetPassword , resetPassword , changePassword , deleteAccount ,updateUserDetails , hasPassword} from '../controllers/User.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const UserRouter = express.Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/login', loginUser);
UserRouter.post('/google-auth', googleAuth);
UserRouter.post('/logout', authMiddleware, logoutUser);
UserRouter.get('/current-user', authMiddleware, getCurrentUser);
UserRouter.post('/verify-otp', verifyOtp);
UserRouter.post('/resend-otp', resendOtp);
UserRouter.put("/update", authMiddleware, updateUserDetails);
UserRouter.post('/forget-password', forgetPassword);
UserRouter.post('/reset-password', resetPassword);
UserRouter.post('/change-password', authMiddleware, changePassword);
UserRouter.delete("/delete-account", authMiddleware, deleteAccount);
UserRouter.get("/has-password", authMiddleware, hasPassword);

export default UserRouter;