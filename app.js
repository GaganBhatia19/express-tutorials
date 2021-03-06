const express = require("express");

const app = express();

const port = 5000;
// 80 is by default port so if we use only localhost then page will open

app.get('/',(req,res)=>{
    res.send("<h1>This is Home of Express app created by me</h1>")
})
// home can be called with / or /home
app.get('/home',(req,res)=>{
    console.log(req.url);
    res.status(200);
    res.send("<h1>This is Home of Express app created by me</h1>")
})
// to open about page localhost:5000/about
app.get('/about',(req,res)=>{
    res.send("<h1>This is about page of express app</h1>");
})
app.get('/contact',(req,res)=>{
    res.send("<h1>This is contact page of express app</h1>");
})
app.get('/service',(req,res)=>{
    res.send("<h1>This is service page of express app</h1>");
})
app.post('/about',(req,res)=>{
    // using post method
    res.send("<h1>This is post about</h1>")
})
app.get('/this',(req,res)=>{
    res.status(400)
    res.send("<h1>Page not found 404</h1>")
})

app.listen(port,()=>{
    console.log(`This is first express app! on port ${port}`)
})