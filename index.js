const fileUpload = require('express-fileupload')
const Post = require('./models/post')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { config, engine } = require('express-edge')
const path = require('path')
const express = require('express')
const app = new express()

mongoose.connect('mongodb://localhost/profiloDB',{ useNewUrlParser: true, useUnifiedTopology: true  })
mongoose.connection.once('open',()=>console.log('Database Connected')).on('error',(err)=>{console.log('Couldnt connect',err)})
app.use(express.static('assets'))
app.use(fileUpload())
app.use(engine)
app.set('views',`${__dirname}/views`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/profile',async (req,res)=>{
    const posts = await Post.find({})
    res.render('profile',{
        posts
    })
})
app.get('/create/new',(req,res)=>{
    res.render('create')
})
app.post('/create/store',(req,res)=>{
   const { avatar_file } = req.files
   avatar_file.mv(path.resolve(__dirname,'./assets/profilePic', avatar_file.name),(error)=>{
    Post.create({
        ...req.body,
        avatar_file : `/profilePic/${avatar_file.name}`
    },(err,post)=>{
    res.redirect('/profile')
    
        })

    })
})

app.get('/post/:id',async(req,res)=>{
    const post = await Post.findById(req.params.id)
    res.render('post',{
        post
    })
})

app.listen(3000,()=>{ console.log("Express Server Started..")})



// const http = require('http')
// const fs = require('fs')
// const port = 2020

// const homePage = fs.readFileSync('./page/index.html')
// const createPage = fs.readFileSync('./page/create.html')
// const profilePage = fs.readFileSync('./page/profile.html')
// const postPage = fs.readFileSync('./page/post.html')

// const server = http.createServer((req,res)=>{

//     if (req.url === '/create'){
//     return res.end(createPage)

//     } else if (req.url === '/post'){
//         return res.end(postPage)

//     } else if (req.url === '/'){
//         return res.end(homePage)

//     } else if (req.url === '/profile'){
//     return res.end(profilePage)
//     }
//     else{ 
//         res.writeHead(404)
//         res.end("Server not Found")
//     }
// })

// server.listen(port)