import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure storage directory exists
const storageDir = "./storage";
if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
    console.log("✅ Created storage directory");
}

const storage= multer.diskStorage({
    destination : function(req, file, cb){
        const allowedFileType=['image/jpg', 'image/png', 'image/jpeg'];
        if(!allowedFileType.includes(file.mimetype)){
            cb (new Error("The file is not supported"))
            return;
        }
        // Ensure directory exists before saving
        if (!fs.existsSync(storageDir)) {
            fs.mkdirSync(storageDir, { recursive: true });
        }
        cb(null, storageDir);
    },
    filename : function(req, file, cb){
        cb(null, Date.now()+ "-" + file.originalname)
    }
})

export {multer, storage}
