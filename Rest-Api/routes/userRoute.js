import express from 'express'
const router = express.Router();
import auth from '../middlewares/auth.js';
import { 
    register,
    login,
    user,
 } from '../controllers/index.js';


router.post('/register', register)
router.post('/login', login)
router.get('/me',auth ,user)

export default router;