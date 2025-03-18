import express from 'express'
import authMiddleware from '../middleware/auth.js';
import isAdminUser from '../middleware/admin-middleware.js';
const router = express.Router()

router.get('/welcome', authMiddleware, isAdminUser, (req, res)=>{
    res.json({
        message: 'Welcome to admin page',
    })
});

export default router