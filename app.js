const express = require("express");
const { param } = require("express/lib/request");

const app = express();

const port = 5000;
// 80 is by default port so if we use only localhost then page will open


//Express configurations
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

// Starting server
app.listen(port,()=>{
    console.log(`This is first express app! on port ${port}`)
})


// 17-02-2022

// Serving static file 

// app.use('url',express.static('folderName',[options]))
app.use('/static',express.static('static'));


/**
 * nodejs -> view
 * django/flask -> template
 */

// Setting template engine
app.set('view engine','pug');

const path = require('path');

// setting path to our views/template files
app.set('views',path.join(__dirname,'views'));

// pug demo template endpoint
app.get('/demoTemplate',(req,res)=>{
    // template0 is the name of the template created and (2nd param) in the object we pass the parameters that we declared in our pug file and the string values with keys will be rendered on the page=
    res.status(200).render('template0',{title:"This is title",message:"This is a message that is injected via the express app and added to the template",para:"This is para 'see the title bar'"})
})


// 19-02-2022
// Using a raw HTML in Pug template engine

/*
    Create a file index.pug in view / template directory
    //- set Language mode to HTML because we want to use HTMl in index.pug file
*/

let num = 0;

app.get('/index',(req,res)=>{
    // sending variable contents to our html page
    const params = {'title':'This is the title loaded dynamically',
                    'content':"This is content loaded dynamically",
                    'heading1':`This is heading loaded dynamically ${++num}`
    }
    // we also have to pass params with our render function
    
    // render function helps in rendering our plain HTML page
    res.status(200).render('index.pug',params);
})


const fs = require('fs');

// html url forms are encoded
// so we have to use some middleware to parse the encoded data
// using built-in middle-ware in express which help in parsing the encoded urls
app.use(express.urlencoded())

// getting data from html file by using post method
app.post('/index',(req,res)=>{
    // req.body is object which has data of the user who has made the post request from the form
    console.log(req.body);

    // to write this data on the file 
    let name  = req.body.name;
    let city = req.body.city;
    let address = req.body.address;
    let male = req.body.male;
    let female = req.body.female;
    let otherGen = req.body.other;

    let data = `Name is ${name},city is ${city}, address is ${address}`;

    fs.writeFileSync('outputfile.txt',data)

    res.status(200).send('<h1>Your form has been submitted successfully</h1>');
})