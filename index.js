const express = require('express')
const server = express()

server.get('/',(req, res)=>{
    res.sendFile('./public/index.html', {root: __dirname })
})

server.use(express.static('public'))

server.listen(3000, ()=>{
    console.log("Server is running");
    })