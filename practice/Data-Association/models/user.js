const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://vinodchandra979:110799@cluster0.vdmkudi.mongodb.net/testingdatabase?retryWrites=true&w=majority`)

    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const userSchema = mongoose.Schema({
    username : String,
    email: String,
    age : Number,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

module.exports = mongoose.model("user", userSchema);