const mongoose = require("mongoose")

const data = new mongoose.Schema({
    sender : String,
    title  : String,
    txt    :{
        type : String,
    },
    likes : {
        type : Number,
        default : 0
    },
    date : String
})

const txt =  mongoose.model('data', data);


module.exports = txt;