const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
console.log(`db params: ${JSON.stringify(dbParams)}`)
db.connect();
const addUser = (user) => {
  return db.query(`
  INSERT INTO users (email, hashed_password, first_name, last_name, city, province, country, profile_pic)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `, [user.email, user.password, user.first_name, user.last_name, user.city, user.province, user.country, user.profile_pic])
    .then(res => {
      console.log("addUser: " + res.rows);
      return res.rows[0];
    })
    .catch(err => console.log("addUser erro: " + err));
}
const getUserWithEmail = (email) => {
  return db.query(`
  SELECT * FROM users
  WHERE users.email = $1;
  `, [email])
    .then(res => {
      if (res.rows[0]) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      return err;
    });
}
const login = (email, password) => {
  return getUserWithEmail(email)
  .then(user => {
    if (password === user.hashed_password) {
      return user;
    } else {
      return null;
    }
  })
}
const getHotListings = () => {
  return db.query(`
  SELECT * FROM listings
  ORDER BY total_views DESC
  `)
  .then(res => {
    return res.rows;
  })
}
const getListingsByTime = () => {
  return db.query(`
  SELECT * FROM listings
  ORDER BY listing_date DESC
  `)
  .then(res => {
    return res.rows;
  })
}
const searchListings = (searchQuery) => {
  searchQuery = '%' + searchQuery +'%';
  return db.query(`
  SELECT * FROM listings
  WHERE descrip LIKE $1;
  `, [searchQuery])
  .then(res => {
    if (res.rows[0]) {
      return res.rows;
    } else {
      return null;
    }
  })
  .catch(err => console.log("search erroe: " + err))
}

const charLimit = (listingArray) => {
  for (let item of listingArray) {
    if (item.descrip.length > 50) {
      item.descrip = item.descrip.slice(0,50) + "...";
    }
  }
  return listingArray;
}

const addListing = (listing, seller_id) => {
	return db.query(`
      INSERT INTO listings(seller_id, cost, descrip, brand, model, listing_pic, province, country)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
 `, [seller_id, listing.cost, listing.description, listing.brand, listing.model, listing.listing_pic, listing.province,listing.country])
  .then(res => {
      console.log("addListing: " + res.rows);
      return res.rows[0];
    })
    .catch(err => console.log("addListing error: " + err));
}
const getListingById = (id) => {
  return db.query(`
  SELECT * FROM listings
  WHERE id = $1;
  `, [id])
  .then(res => {
    if (res.rows[0]) {
      return res.rows[0];
    } else {
      return null;
    }
  })
  .catch(err => console.log("getListingByID error: " + err))
}

const getUserByID = (userID) => {
  return db.query(`
  SELECT * FROM users
  WHERE users.id = $1;
  `, [userID])
    .then(res => {
      if (res.rows[0]) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

/**Coverts date to SQL format
 *
 * @returns SQL formated date
 */
 const todayDate = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;
  return today
}

module.exports = { login, getListingById, getUserByID, todayDate ,addUser, addListing, getUserWithEmail, getHotListings, getListingsByTime, searchListings, charLimit};

