
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/connectDB')
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')


const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL




app.use(cors())
app.use(express.json())
app.use('/api/user', userRoutes)

const start = async () =>{
    try {
        await connectDB(DATABASE_URL)
        app.listen(port, ()=>{
            console.log(`Server is running on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()