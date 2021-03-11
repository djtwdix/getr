const { addUser, markSold, deleteListing, getLikesByUser, getMyListings, getFaveListings, todayDate, favourite, getUserByID, getListingById, getUserWithEmail, addListing, login, searchListings, getHotListings, getListingsByTime, charLimit } = require("./routes/database");

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
  const templateVars = { id: req.session.userId }
  res.render("landing", templateVars);
});

app.get("/listings", (req, res) => {
  const templateVars = { id: req.session.userId }
  res.render("listings", templateVars)
})

app.get("/hot", (req, res) => {
  getHotListings()
  .then(listing => {
    getLikesByUser(req.session.userId)
    .then(likes => {
      console.log(likes);
      console.log(listing);
      if (listing) {
        listing = charLimit(listing)
      }
      const faves = []
      if (likes) {
        for (let likeInfo of likes) {
          faves.push(likeInfo.listing_id);
        }
      }
      console.log(faves);
      const templateVars = { id: req.session.userId, listingInfo: listing, favourites: faves, title: "Recent listings..."}
      res.render("listings", templateVars)
    })
  })
})

app.get("/recent", (req, res) => {
  getListingsByTime()
  .then(listing => {
    getLikesByUser(req.session.userId)
    .then(likes => {
      console.log(likes);
      console.log(listing);
      if (listing) {
        listing = charLimit(listing)
      }
      const faves = []
      if (likes) {
        for (let likeInfo of likes) {
          faves.push(likeInfo.listing_id);
        }
      }
      console.log(faves);
      const templateVars = { id: req.session.userId, listingInfo: listing, favourites: faves, title: "Recent listings..."}
      res.render("listings", templateVars)
    })
  })
  })

app.get("/account/:userId", (req, res) => {
  console.log("params: ", typeof req.params.userId)
  console.log("userId", typeof req.session.userId);
  if (Number(req.params.userId) === req.session.userId) {
    getUserByID(req.session.userId)
    .then(user => {
      const templateVars = { id: req.session.userId, userInfo: user }
      res.render("account", templateVars)
    })
  } else {
    res.redirect("/")
  }
})


app.get("/account/:userId/faves", (req, res) => {
  getUserByID(req.session.userId)
  .then(user => {
    getFaveListings(req.session.userId)
    .then(faves => {
      if (faves) {
        faves = charLimit(faves)
      }
      console.log("faves:", faves)
      getLikesByUser(req.session.userId)
    .then(likes => {
      const userFaves = []
      if (likes) {
        for (let likeInfo of likes) {
          userFaves.push(likeInfo.listing_id);
        }
      }
      console.log("favesArray ", userFaves);
      const templateVars = { id: req.session.userId, userInfo: user, listingInfo: faves, favourites: userFaves, title: "Recent listings..."}
      res.render("my_faves", templateVars)
    })
    })
  })
})

app.get("/account/:userId/listings", (req, res) => {
  getUserByID(req.session.userId)
  .then(user => {
    getMyListings(req.session.userId)
    .then(listings => {
      if (listings) {
        listings = charLimit(listings)
      }
      console.log("user listings: ", listings);
      const templateVars = { id: req.session.userId, userInfo: user, listingInfo: listings}
      res.render("my_listings", templateVars)
    })
  })
})

app.get("/listings/new", (req, res) => {
  const templateVars = { id: req.session.userId }
  res.render("new_listing", templateVars)
})

app.get("/listings/:listingID", (req, res) => {
  const listingId = Number(req.params.listingID);
  getListingById(listingId)
  .then(listing => {
    if (listing) {
      console.log(listing);
      const templateVars = { id: req.session.userId , listingInfo: listing}
      res.render("listing", templateVars)
    }
  })
})

app.get("/login", (req, res) => {
  const templateVars = { id: req.session.userId }
  res.render("login", templateVars)
})

app.get("/register", (req, res) => {
  const templateVars = { id: req.session.userId }
  res.render("register", templateVars)
})

app.post("/register", (req, res) => {
  addUser(req.body)
  .then((user) => {
    console.log("userID: ", user.id)
    req.session.userId = user.id;
    const templateVars = { id: req.session.userId }
    res.redirect("/");
  })
  .catch(err => console.log("error /register: " + err))
})
app.post("/login", (req, res) => {
  login(req.body.email, req.body.password)
  .then(user => {
    if (!user) {
      res.send({error: "Error"});
      return;
    }
    req.session.userId = user.id;
    res.redirect("/");
  })
  .catch(e => res.send(e));
})

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/")
})

app.post("/search", (req, res) => {
  searchListings(req.body.input)
  .then(listing => {
    getLikesByUser(req.session.userId)
    .then(likes => {
      console.log(likes);
      console.log(listing);
      if (listing) {
        listing = charLimit(listing)
      }
      const faves = []
      if (likes) {
        for (let likeInfo of likes) {
          faves.push(likeInfo.listing_id);
        }
      }
      console.log(faves);
      const templateVars = { id: req.session.userId, listingInfo: listing, favourites: faves, title: "Recent listings..."}
      res.render("listings", templateVars)
    })
  })
})

app.post("/listings/new", (req, res) => {
  const today = todayDate();
  req.body.listing_date = today;
  console.log(today);
  console.log(req.body);
  addListing(req.body, req.session.userId)
  .then(listing => {

    const listingID = listing.id;

    res.redirect(`/listings/${listingID}`)
  })
})

app.post("/favourite", (req, res) => {
  console.log(req.body)
  favourite(req.body);
})

app.delete("/listings/:listingId/delete", (req, res) => {
  console.log(req.body);
  deleteListing(req.body.listingId);
})

app.put("/listings/:listingId/sold", (req, res) => {
  console.log(req.body)
  markSold(req.body.listingId, req.body.isSold);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
