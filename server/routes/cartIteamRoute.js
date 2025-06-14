import { Router } from "express";
import { addToCart,getCartIteams,deleteCartIteam } from "../controllers/cartController.js";
import verifyUser from "../middleware/authMiddleware.js";

const router=Router();

router.post('/addtocart',verifyUser,addToCart);
router.get('/getcartiteams',verifyUser,getCartIteams);
router.post('/deletecartiteam',verifyUser,deleteCartIteam);

export default router;