/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/myaccount", (req, res) => {
    /*
    user favourites
    user information profile pic/first name
    user listings
    */
    });
  router.get("/login", (req, res) => {
    //render login
  });
  router.get("/register", (req, res) => {
    //render register
  });
  router.get("/listings", (req, res) => {
    //listings by time
  });
  router.get("/hotlistings", (req, res) => {
    //listings ordered by views
  });
  router.get("/listings/:listingID", (req, res) => {
    //listing information
  });
  router.get("/search", (req, res) => {
    //listings filtered by search query
  });
  router.post("/login", (req, res) => {
    //validate user
  });
  router.post("/register", (res, req) => {
    //validate registeration
    //add user to db
  });
  router.post("/logout", (req, res) => {
    //clear session
  });
  router.post("/listings/:listingID/sold", (req, res) => {
    //set is_sold to active
  });
  router.post("/listings/listingID", (req, res) => {
    //create new listing
  });
  
  return router;
};
