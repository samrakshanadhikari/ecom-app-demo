import { Router } from "express";
import errorHandle from "../services/errorHandler.js";
import { addToCart } from "../controllers/cartController.js";
import { isAuthenticated, restrictTo, Role } from "../middleware/authMiddleware.js";

const router=Router();

router.route("/").post(isAuthenticated,restrictTo(Role.User), errorHandle(addToCart))

export default  router