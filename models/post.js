const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
    name : String,
    about : String,
    email : String,
    expert : String,
    add : String,
    contact : String,
    moto : String,
    createdAt :{
        type:Date,
        default: new Date()
    },
    avatar_file : String

})

const Post = mongoose.model('Profile',PostSchema)

module.exports = Post