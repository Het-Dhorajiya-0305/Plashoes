import { Router } from "express";
import { adminLogin, adminLogOut, checkAuth, forgotPassword, googleLogin, loginUser, logOutUser, registerUser, resetPassword } from "../controllers/userController.js";
import verifyUser from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminAuthMiddleware.js";
import passport from "passport";


const router = Router();

router.post('/register',registerUser);

router.post('/login',loginUser)

router.post('/forgotpassword',forgotPassword)

router.post('/reset-password',verifyUser,resetPassword)

router.post('/adminlogin',adminLogin)

router.get('/adminlogout',verifyAdmin,adminLogOut)

router.get("/logout",verifyUser,logOutUser)

router.get("/authorized",verifyUser,checkAuth)


// Google OAuth routes

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/user/register', // Frontend login page
    session: false,
  }),
  googleLogin
);

export default router;