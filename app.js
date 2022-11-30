require('dotenv').config();
const express = require("express");
const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;

const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();
// const port = process.env.PORT || 3000

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.use(session({
   secret: "Our little secret.",
   resave: false,
   saveUninitialized: false
 }));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb+srv://rajat4661:Rajat1598@cluster0.ncboalk.mongodb.net/noteskartdata", {useNewUrlParser: true , useUnifiedTopology:true});

const userSchema = new mongoose.Schema ({
   email: String,
   password: String,
   googleId: String,
   secret: String
 });

 userSchema.plugin(passportLocalMongoose);
 userSchema.plugin(findOrCreate);
 
 const User = new mongoose.model("User", userSchema);

 passport.use(User.createStrategy());
 
 passport.serializeUser(function(user, done) {
   done(null, user.id);
 });
 
 passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
     done(err, user);
   });
 });


 passport.use(new GoogleStrategy({
   clientID: process.env.CLIENT_ID,
   clientSecret: process.env.CLIENT_SECRET,
   callbackURL: "http://localhost:3000/auth/google/main",
   userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
 },
 function(accessToken, refreshToken, profile, cb) {
   console.log(profile);

   User.findOrCreate({ googleId: profile.id }, function (err, user) {
     return cb(err, user);
   });
 }
));






app.get("/", function(req, res){
    res.render("registration")
})

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/main",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/main");
  });


  app.get("/login", function(req, res){
    res.render("registration");
  });


  app.get("/register", function(req, res){
    res.render("registration");
  });

  app.get("/main", function(req, res){
    User.find({"secret": {$ne: null}}, function(err, foundUsers){
      if (err){
        console.log(err);
      } else {
        if (foundUsers) {
          res.render("main", {usersWithSecrets: foundUsers});
        }
      }
    });
    // res.render("secrets")
  });

  app.get("/submit", function(req, res){
    if (req.isAuthenticated()){
      res.render("submit");
    } else {
      res.redirect("/login");
    }
  });


 app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

  app.post("/submit", function(req, res){
    const submittedSecret = req.body.secret;
  
  //Once the user is authenticated and their session gets saved, their user details are saved to req.user.
    // console.log(req.user.id);
  
    User.findById(req.user.id, function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.secret = submittedSecret;
          foundUser.save(function(){
            res.redirect("/main");
          });
        }
      }
    });
  });
  
 
  app.post("/register", function(req, res){

    User.register({username: req.body.username}, req.body.password, function(err, user){
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/main");
        });
      }
    });
  
  });
  
  app.post("/login", function(req, res){
  
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
  
    req.login(user, function(err){
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/main");
        });
      }
    });
  
  });
  
  

app.get('/digital', function(req, res, next) {
   res.render("courses/digital");
});

app.get('/photography', function(req, res, next) {
   res.render("courses/photography");
});

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

//-------------------- first year -------------------
app.get('/cse-lac', function(req, res, next) {
   res.render("stream/cse-lac");
});

app.get('/cse-ep', function(req, res, next) {
  res.render("stream/cse-ep");
});

app.get('/cse-beee', function(req, res, next) {
  res.render("stream/cse-beee");
});

app.get('/cse-chm', function(req, res, next) {
  res.render("stream/cse-chm");
});

app.get('/cse-eg', function(req, res, next) {
  res.render("stream/cse-eg");
});

app.get('/cse-en', function(req, res, next) {
  res.render("stream/cse-en");
});

app.get('/cse-pps', function(req, res, next) {
  res.render("stream/cse-pps");
});

//--------------second year-----------------------

app.get('/cse-dm', function(req, res, next) {
  res.render("stream/cse-dm");
});

app.get('/cse-ipc', function(req, res, next) {
  res.render("stream/cse-ipc");
});

app.get('/cse-adsa', function(req, res, next) {
  res.render("stream/cse-adsa");
});

app.get('/cse-ds', function(req, res, next) {
  res.render("stream/cse-ds");
});

app.get('/cse-comi', function(req, res, next) {
  res.render("stream/cse-comi");
});

app.get('/cse-eco', function(req, res, next) {
  res.render("stream/cse-eco");
});

app.get('/cse-ictt', function(req, res, next) {
  res.render("stream/cse-ictt");
});

app.get('/cse-sepm', function(req, res, next) {
  res.render("stream/cse-sepm");
});

app.get('/cse-dccn', function(req, res, next) {
  res.render("stream/cse-dccn");
});

app.get('/cse-toc', function(req, res, next) {
  res.render("stream/cse-toc");
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