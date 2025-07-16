import express from "express";
import verifyUser from "../middleware/authMiddleware.js";
import { adminOrders, deleteAllOrders, placeOrder, placeOrderStripe, updateStatus, userOrders, verifyStripe } from "../controllers/ordersController.js";
import verifyAdmin from "../middleware/adminAuthMiddleware.js";

const orderRouter=express.Router();

orderRouter.post("/place",verifyUser,placeOrder)
orderRouter.post("/stripe",verifyUser,placeOrderStripe)

orderRouter.post("/verifystripe",verifyUser,verifyStripe)

orderRouter.get("/userorders",verifyUser,userOrders)

orderRouter.get("/adminorders",verifyAdmin,adminOrders)
orderRouter.post("/updatestatus",verifyAdmin,updateStatus)

orderRouter.get("/deleteall",deleteAllOrders)


export default orderRouter;