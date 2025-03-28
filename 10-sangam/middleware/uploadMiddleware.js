import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

// file filter function

const checkFileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Multer configuration with limits
const upload = multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

export default upload;
