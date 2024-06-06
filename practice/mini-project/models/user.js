const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://vinodchandra979:110799@cluster0.vdmkudi.mongodb.net/testingdatabase?retryWrites=true&w=majority`)

.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const userSchema = new mongoose.Schema({
    username : String,
    name: String,
    age: Number,
    email: String,
    password: String,
    profilepic: {
        type: String,
        default: "default.png"
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref : "post"
    }]
})

module.exports = mongoose.model('user', userSchema);