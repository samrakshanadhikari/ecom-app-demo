import { Router } from "express";
import { createProduct, deleteProduct, fetchSingleProduct, getAllProducts, getProductsByCategory, updateProduct } from "../controllers/productController.js";
import { upload } from "../middleware/multerMiddleware.js"
import errorHandle from "../services/errorHandler.js";
import { isAuthenticated, restrictTo, Role } from "../middleware/authMiddleware.js";

const router=Router();

router.route("/create").post(isAuthenticated, restrictTo(Role.Admin), upload.single('image'), errorHandle(createProduct))

router.route("/getAll").get(getAllProducts)
router.route("/singleProduct/:id").get(errorHandle(fetchSingleProduct))
router.route("/category/:category").get(errorHandle(getProductsByCategory))
router.route("/update/:id").patch(isAuthenticated, restrictTo(Role.Admin),upload.single('image'), errorHandle(updateProduct))
router.route("/delete/:id").delete(isAuthenticated, restrictTo(Role.Admin), errorHandle(deleteProduct))

export default router;



