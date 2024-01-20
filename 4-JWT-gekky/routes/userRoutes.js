const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const checkUserAuth = require('../middlewares/auth-middleware')

// Route Level Middleware -  To Protect Route
router.use('/changepassword', checkUserAuth)

//Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)



// Protected Routes
router.post('/changepassword', UserController.changeUserPassword)  //checks if token is valid before allowing


module.exports = router