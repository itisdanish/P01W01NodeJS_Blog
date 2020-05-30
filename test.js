const mongoose = require('mongoose')
const Post = require('./models/post')

mongoose.connect('mongodb://localhost/profiloDBTEST',{ useNewUrlParser: true, useUnifiedTopology: true  })
mongoose.connection.once('open',()=>console.log('Database Connected')).on('error',(err)=>{console.log('Couldnt connect',err)})

Post.create({

    name : "Danish Iqbal",
    about : "Art is my Love",
    email : "yesiamdanish@gmail.com",
    expert : "Web Designer",
    add : "Patna, Bihar 01",
    contact : "9642564489",
    moto : "Never Say Never"

},(err,Post)=>{     console.log(err,Post)   })