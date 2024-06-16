const express = require('express')
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", function(req, res){
    res.send("hey it's owners");
});


if(process.env.Node_ENV === "development"){
    router.post("/create",  async function(req, res){
        let {fullname, email, password} = req.body;

        let owner = await ownerModel.find();
        if(owner.length > 0){
            return res.status(500).send("You don't have permission to create a new owner.");
        }
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdOwner);
    });
}

module.exports = router;