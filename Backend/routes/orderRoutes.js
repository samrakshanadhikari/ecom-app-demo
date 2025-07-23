import { Router } from "express";
import errorHandle from "../services/errorHandler.js";
import { createOrder } from "../controllers/orderController.js";
import { isAuthenticated, restrictTo, Role } from "../middleware/authMiddleware.js";

const router=Router();
router.route("/").post(isAuthenticated, restrictTo(Role.User),createOrder)

export default router