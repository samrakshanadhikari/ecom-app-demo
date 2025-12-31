import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure storage directory exists (use absolute path)
const storageDir = path.join(__dirname, '../storage');

// Create storage directory if it doesn't exist
try {
    if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir, { recursive: true });
        console.log("✅ Created storage directory:", storageDir);
    }
} catch (error) {
    console.error("❌ Error creating storage directory:", error);
}

const storage= multer.diskStorage({
    destination : function(req, file, cb){
        console.log("📥 File upload destination check - MIME type:", file.mimetype, "Original name:", file.originalname);
        
        // Ensure directory exists before saving
        try {
            if (!fs.existsSync(storageDir)) {
                fs.mkdirSync(storageDir, { recursive: true });
                console.log("✅ Created storage directory on upload:", storageDir);
            }
            console.log("✅ Storage directory ready:", storageDir);
            cb(null, storageDir);
        } catch (error) {
            console.error("❌ Error with storage directory:", error);
            cb(error);
        }
    },
    filename : function(req, file, cb){
        const uniqueName = Date.now() + "-" + file.originalname;
        console.log("📁 Generating filename:", uniqueName);
        cb(null, uniqueName);
    }
})

// Error handling for multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        console.log("🔍 Multer fileFilter START");
        console.log("  - Original name:", file.originalname);
        console.log("  - MIME type:", file.mimetype);
        console.log("  - Field name:", file.fieldname);
        
        // Accept: image/jpeg, image/png, image/jpg (some systems use this)
        // Also check file extension as fallback
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        const fileExtension = file.originalname.toLowerCase().split('.').pop();
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
        
        const mimeTypeValid = allowedMimeTypes.includes(file.mimetype);
        const extensionValid = allowedExtensions.includes(fileExtension);
        
        console.log("  - MIME type valid?", mimeTypeValid);
        console.log("  - Extension valid?", extensionValid);
        
        if (mimeTypeValid || extensionValid) {
            console.log("✅ File filter PASSED");
            cb(null, true);
        } else {
            console.error("❌ File filter REJECTED");
            console.error("  - Got MIME:", file.mimetype);
            console.error("  - Got extension:", fileExtension);
            cb(new Error(`File type not supported. Received: ${file.mimetype}. Only JPG, PNG, and WEBP images are allowed.`));
        }
    }
});

export {multer, upload, storage}
