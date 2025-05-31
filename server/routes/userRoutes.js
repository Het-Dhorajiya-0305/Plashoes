import { Router } from "express";
import { changePassword, loginUser, logOutUser, registerUser } from "../controllers/userController.js";
import verifyUser from "../middleware/authMiddleware.js";


const router = Router();

router.post('/register',registerUser);


router.post('/login',loginUser)

router.get("/logout",verifyUser,logOutUser)

router.post("/changepassword",verifyUser,changePassword)

export default router;