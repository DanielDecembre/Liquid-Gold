// Require Dependencies
require('dotenv').config();

const express = require("express");

const drinks = require('./models/drinks');

const req = require("express/lib/request");

// initialize express application
const app = express();

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const methodOverride = require("method-override");

const res = require('express/lib/response');

// configure aaplication settings
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// mount middleware
// app.use((req, res, next) =>{
//     console.log('run for all routes')
//     next()
// });
// this adds data to req.body so we can access it in the create action
app.use(express.urlencoded({ extend: false }))

// mount routes

app.get('/', (req, res) =>{
    res.send('Welcome to Liquid Gold!');
});


// Index
app.get('/drinks', (req, res)=> {
    res.render('drinks_index.ejs', {allDrinks: drinks});
                                    // ^-- this is just a descriptive way of referencing our fruits array inside index.ejs
}); 


app.get('/drinks/show/:id', (req, res) =>{
    // const {name,description,easytomake} = drinks[req.params.id]
    // res.render('drinks_show.ejs', {name,description,easytomake});
    res.render("drinks_show.ejs",{drink : drinks[req.params.id]});
    // res.render('drinks_show.ejs', drink);
});
// N

app.get('/drinks/new', (req, res) => {
    res.render('new.ejs')
})

// Delete
app.delete('/drinks/delete/:id', (req, res) => {
    res.send("deleting...")
})

app.get('/drinks/delete/:id', (req, res) => {
    // res.send("deleting...")
    drinks.pop(drinks[req.params.id])
    res.redirect('/drinks')
})

// U

// Create

// app.post('/drinks', (req, res) => {
//     console.log(req.body)
//     res.send("hi, its juice")
// })

app.post('/drinks', (req,res) => {
    if (req.body.easyToMake === "on") {
        // if checked, req.body.easyToMake is set to 'on'
        req.body.easyToMake = true
    } else {
        // if not checked, req.body.easyToMake is undefined
        req.body.easyToMake = false  // do some data correction
    }
    drinks.push(req.body)
    console.log(drinks)
    res.redirect('/drinks')
})


// E

// Show
app.get('/drinks/indexOfDrinksArray',(req, res) => {
    // render is special method that
    // informs the template engine to render a template 
    // we just provide the name as a string
    res.render('drinks_show.ejs', {
        drink: drinks[req.params.indexOfDrinksArray]  // this references a single drink
        // an passes it to the template so we can access it here
    });
});



// tell the app to listen
app.listen(port, () =>{
    console.log(`Listening on port`, port)
});