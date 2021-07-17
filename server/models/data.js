const mongoose = require("mongoose")

const data = new mongoose.Schema({
    sender : {
        type : String,
        default : "Unknown"
    },
    title  : {
        type : String,
        default : "No Title"
    },
    txt    :{
        type : String,
        default : "no txt."
    },
    likes : {
        type : Number,
        default : 0
    },
    date : String
})

const txt =  mongoose.model('data', data);


module.exports = txt;