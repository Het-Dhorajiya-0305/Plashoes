import { Router } from "express";
import { addProduct, deleteProduct } from "../controllers/productController.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = Router();

router.post("/addproduct",upload.single("proImage"), addProduct)
router.post("/deleteproduct",deleteProduct)

export default router;