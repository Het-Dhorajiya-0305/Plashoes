import { Router } from "express";
import { adminLogin, adminLogOut, changePassword, loginUser, logOutUser, registerUser } from "../controllers/userController.js";
import verifyUser from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminAuthMiddleware.js";


const router = Router();

router.post('/register',registerUser);


router.post('/login',loginUser)

router.post('/adminlogin',adminLogin)

router.get('/adminlogout',verifyAdmin,adminLogOut)

router.get("/logout",verifyUser,logOutUser)

router.post("/changepassword",verifyUser,changePassword)

export default router;