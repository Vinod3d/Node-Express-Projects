const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/create', async (req, res) => {
    let user = await userModel.create({
        username: "Vinod",
        age: 25,
        email: "vinodchandra979@gmail.com"
    })
    res.send(user);
});

app.get('/post/create', async (req, res) => {
    let post = await postModel.create({
        postdata: "hello saare log kaise ho",
        user: "665a06e98f2555ac9abf3863"
    })

    let user = await userModel.findOne({_id: "665a06e98f2555ac9abf3863"});
    user.posts.push(post._id);

    await user.save();
    res.send(post, user);
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
