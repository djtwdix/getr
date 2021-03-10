const { addUser, getUserWithEmail, login } = require("./routes/database");

// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
/* const sass       = require("node-sass-middleware"); */
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
/* app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
})); */
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
/* app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db)); */
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/listings", (req, res) => {
  res.render("listings")
})

app.get("/account", (req, res) => {
  res.render("account")
})

app.get("/new-listing", (req, res) => {
  res.render("new_listing")
})

app.get("/listings/:listingID", (req, res) => {
  res.render("listing")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.get("/register", (req, res) => {

  res.render("register")
})

app.post("/register", (req, res) => {
  console.log("userinfo: ", req.body);
  addUser(req.body)
  .then(() => {
    res.send(200)
  })
  .catch(err => console.log("error /register: " + err))
})
app.post("/login", (req, res) => {
  console.log("userinfo: ", req.body);
  login(req.body.email, req.body.password)
  .then(user => {
    if (!user) {
      res.send({error: "Error"});
      return;
    }
    req.session.userId = user.id;
    res.redirect("landing");
  })
  .catch(e => res.send(e));
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
