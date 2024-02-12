const mongoose = require('mongoose')

const JobSchema = new  mongoose.Schema({
    company: {
        type: String,
        required : [true, 'Please Provide Company Name'],
        maxlength: 50
    },

    position: {
        type: String,
        required: [true, 'Please Provide Position'],
        maxlength: 100
    },

    status: {
        type: String,
        enum: ['interview', 'decliend', 'pending'],
        default: "pending"
    },

    createdBy:{
        type : mongoose.Types.ObjectId ,
        refs :'User',
        required: [true,'please provide user']
    }
}, {timestamps:true})

module.exports = mongoose.model("Job", JobSchema)