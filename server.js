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
  console.log(req.session.userId);
  const templateVars = { id: req.session.userId }
  console.log(templateVars);
  res.render("landing", templateVars);
});

app.get("/listings", (req, res) => {
  console.log(req.session.userId);
  const templateVars = { id: req.session.userId }
  console.log(templateVars);
  res.render("listings", templateVars)
})

app.get("/account", (req, res) => {
  console.log(req.session.userId);
  const templateVars = { id: req.session.userId }
  console.log(templateVars);
  res.render("account", templateVars)
})

app.get("/new-listing", (req, res) => {
  console.log(req.session.userId);
  const templateVars = { id: req.session.userId }
  console.log(templateVars);
  res.render("new_listing", templateVars)
})

app.get("/listings/:listingID", (req, res) => {
  console.log(req.session.userId);
  const templateVars = { id: req.session.userId }
  console.log(templateVars);
  res.render("listing", templateVars)
})

app.get("/login", (req, res) => {
  console.log(req.session.userId);
  const templateVars = { id: req.session.userId }
  console.log(templateVars);
  res.render("login", templateVars)
})

app.get("/register", (req, res) => {
  console.log(req.session.userId);
  const templateVars = { id: req.session.userId }
  console.log(templateVars);
  res.render("register", templateVars)
})

app.post("/register", (req, res) => {
  console.log("userinfo: ", req.body);
  addUser(req.body)
  .then(() => {
    /* res.send(200) */
    res.redirect("/")
  })
  .catch(err => console.log("error /register: " + err))
})
app.post("/login", (req, res) => {
  console.log(req.body);
  login(req.body.email, req.body.password)
  .then(user => {
    if (!user) {
      res.send({error: "Error"});
      return;
    }
    req.session.userId = user.id;
    console.log("post-login")
    res.redirect("/");
  })
  .catch(e => res.send(e));
})

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/")
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
