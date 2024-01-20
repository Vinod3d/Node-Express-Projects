const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')


var checkUserAuth = async (req, res, next) =>{
    let token
    const {authorization} = req.headers
    if(authorization && authorization.startswith('Bearer')){
        try {
            token = authorization.split(" ")[1]

            // Verify Token
            const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY)

            // Get user from Token
            req.user = await UserModel.findById(id).select(-password)
            next()
        } catch (error) {
            res.status(401).send({"status" : "failed", "message": "Unauthorized User"})
        }
    }

    if(!token){
        res.status(401).send({"status" : "failed", "message" : "Unauthorized User, No Token"})
    }
}

module.exports = checkUserAuth