import { Router } from "express";
import { addProduct, deleteProduct, listProduct, singleProduct } from "../controllers/productController.js";
import { upload } from "../middleware/multerMiddleware.js";
import verifyAdmin from "../middleware/adminAuthMiddleware.js";

const router = Router();

router.post("/addproduct",verifyAdmin,upload.single("proImage"), addProduct)
router.post("/deleteproduct",verifyAdmin,deleteProduct)
router.get("/listproduct",listProduct)
router.get("/:productId",singleProduct)


export default router;