const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://vinodchandra979:110799@cluster0.vdmkudi.mongodb.net/testapp?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    image: String
});

module.exports = mongoose.model('user', userSchema);
