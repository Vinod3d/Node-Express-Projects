import express from 'express'
import authMiddleware from '../middleware/auth.js';
const router = express.Router()

router.get('/welcome', authMiddleware, (req, res)=>{
    res.json({
        message: 'Welcome to home page',
    })
});

export default router