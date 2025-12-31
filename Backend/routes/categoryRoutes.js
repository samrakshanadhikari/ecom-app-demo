import { Router } from "express";
import errorHandle from "../services/errorHandler.js";
import { isAuthenticated, restrictTo, Role } from "../middleware/authMiddleware.js";
import { createCategory, deleteCategory, fetchSingleCategory, getAllCategory, updateCategory } from "../controllers/categoryController.js";
import { upload } from "../middleware/multerMiddleware.js"
const router=Router();


router.route("/").post(
    isAuthenticated, 
    restrictTo(Role.Admin),
    (req, res, next) => {
        upload.single('image')(req, res, (err) => {
            if (err) {
                console.error("❌ Multer error:", err.message);
                return res.status(400).json({ 
                    message: "File upload error", 
                    error: err.message 
                });
            }
            next();
        });
    },
    errorHandle(createCategory)
)
.get(getAllCategory)

router.route("/:id").get(errorHandle(fetchSingleCategory))
.patch(isAuthenticated, restrictTo(Role.Admin), errorHandle(updateCategory))
.delete(isAuthenticated, restrictTo(Role.Admin), errorHandle(deleteCategory))

export default router;