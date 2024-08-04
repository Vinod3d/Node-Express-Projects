import express from 'express'
const router = express.Router();
import auth from '../middlewares/auth.js';
import { 
    register,
    login,
    user,
    refreshcontroller,
    logout
 } from '../controllers/index.js';


router.post('/register', register)
router.post('/login', login)
router.get('/me',auth ,user)
router.post('/refresh' ,refreshcontroller)
router.post('/logout', auth ,logout)

export default router;