import express from 'express'
import authMiddleware from '../middleware/auth.js';
import isAdminUser from '../middleware/admin-middleware.js';
import upload from '../middleware/uploadMiddleware.js';
import {deleteImageController, fetchImageController, uploadImage} from '../controllers/imageController.js';



const router = express.Router();

router.post('/upload', authMiddleware, isAdminUser, upload.single('image'), uploadImage)
router.get("/get",authMiddleware, fetchImageController);
router.delete("/:id", authMiddleware, isAdminUser, deleteImageController );

export default router;