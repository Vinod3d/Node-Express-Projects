const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const checkUserAuth = require('../middlewares/auth-middleware')

// Route Level Middleware -  To Protect Route
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)

//Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)



// Protected Routes
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggeduser', UserController.loggedUser)


module.exports = router