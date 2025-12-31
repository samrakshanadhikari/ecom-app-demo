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
        const allowedFileType=['image/jpg', 'image/png', 'image/jpeg'];
        if(!allowedFileType.includes(file.mimetype)){
            cb(new Error("The file is not supported. Only JPG, PNG, and JPEG are allowed."));
            return;
        }
        // Ensure directory exists before saving
        try {
            if (!fs.existsSync(storageDir)) {
                fs.mkdirSync(storageDir, { recursive: true });
                console.log("✅ Created storage directory on upload:", storageDir);
            }
            cb(null, storageDir);
        } catch (error) {
            console.error("❌ Error with storage directory:", error);
            cb(error);
        }
    },
    filename : function(req, file, cb){
        const uniqueName = Date.now() + "-" + file.originalname;
        console.log("📁 Saving file:", uniqueName);
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
        const allowedFileType=['image/jpg', 'image/png', 'image/jpeg'];
        if(allowedFileType.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error("The file is not supported. Only JPG, PNG, and JPEG are allowed."));
        }
    }
});

export {multer, upload, storage}
