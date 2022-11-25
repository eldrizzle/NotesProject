const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
// const firebase = require("firebase");

const app = express();
// const port = process.env.PORT || 3000

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    res.render("main")
})

app.get('/web', function(req, res, next) {
    res.render("courses/web");
 });


 app.get('/app', function(req, res, next) {
    res.render("courses/app");
 });


 app.get('/graphic', function(req, res, next) {
    res.render("courses/graphic");
 });


 app.get('/ml', function(req, res, next) {
    res.render("courses/ml");
 });


 app.get('/cyber', function(req, res, next) {
    res.render("courses/cyber");
 });


 app.get('/cpp', function(req, res, next) {
    res.render("courses/cpp");
 });

 
 app.get('/cse', function(req, res, next) {
   res.render("stream/cse");
});

app.get('/it', function(req, res, next) {
   res.render("stream/it");
});
app.get('/aero', function(req, res, next) {
   res.render("stream/aero");
});
app.get('/chemical', function(req, res, next) {
   res.render("stream/chemical");
});

app.get('/mechanical', function(req, res, next) {
   res.render("stream/mechanical");
});


app.get('/cse-lac', function(req, res, next) {
   res.render("stream/cse-lac");
});





// pdf
app.get('/cse/unit-1/pdf1', function(req, res, next) {
   res.render("public/pdfs/cse/lac/unit-1/a.pdf");
});

// ------------------Years-------------------------------------
app.get("/first-year", function(req, res){
   res.render("stream/first-year")
})

app.get("/second-year", function(req, res){
   res.render("stream/second-year")
})

app.get("/third-year", function(req, res){
   res.render("stream/third-year")
})

app.get("/fourth-year", function(req, res){
   res.render("stream/fourth-year")
})

app.listen(3000 , function(){
    console.log("Server started at port no 3000");
})