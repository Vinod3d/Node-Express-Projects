const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  
    fullname: String,
    email : String,
    password: String,
    isadmin : Boolean,
    products: {
        type : Array,
        default: [],
    },
    picture: String,
    getSelection: String,

});

module.exports = mongoose.model('owner', ownerSchema);
