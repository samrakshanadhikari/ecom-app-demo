import { Router } from "express";
import errorHandle from "../services/errorHandler.js";
import { isAuthenticated, restrictTo, Role } from "../middleware/authMiddleware.js";
import { addToWishList } from "../controllers/wishlistController.js";

const router=Router();

router.route("/").post(isAuthenticated, addToWishList)


export default  router