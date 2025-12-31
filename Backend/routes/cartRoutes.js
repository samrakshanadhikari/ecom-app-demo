import { Router } from "express";
import errorHandle from "../services/errorHandler.js";
import { addToCart, deleteCartItem, getCartItem, updateCartItem } from "../controllers/cartController.js";
import { isAuthenticated, restrictTo, Role } from "../middleware/authMiddleware.js";

const router=Router();

// Cart should be accessible to ALL authenticated users (user, customer, admin)
router.route("/")
    .post(isAuthenticated, errorHandle(addToCart))  // Removed role restriction - any authenticated user can add to cart
    .get(isAuthenticated, errorHandle(getCartItem))

router.route("/").patch(isAuthenticated, errorHandle(updateCartItem))
router.route("/:productId").delete(isAuthenticated, errorHandle(deleteCartItem))


export default  router