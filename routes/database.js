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

const searchListings = (searchQuery, min, max) => {
  searchQuery = '%' + searchQuery + '%';
  min = Number(min);
  max = Number(max);
  const value = [searchQuery]
  let queryString = `
  SELECT * FROM listings
  WHERE descrip LIKE $1
  `;
  if (min) {
    value.push(min)
    queryString += `AND cost >= $${value.length}`;
  }
  if (max) {
    value.push(max)
    queryString += `AND cost <= $${value.length}`;
  }
  console.log(queryString, value)
  return db.query(queryString, value)
      .then(res => {
        if (res.rows[0]) {
          return res.rows;
        } else {
          return null;
        }
      })
      .catch(err => console.log("search error: " + err))
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

const favourite = (req) => {
  console.log("delete: ", typeof req.isFave);
  if (req.isFave === 'true') {
    console.log("delete: ", req);
    return db.query(`
  DELETE FROM likes
  WHERE user_id = $1
  AND listing_id = $2;
  `, [req.userId, req.listingId])
      .catch(err => {
        console.log(err);
      });
  } else {
    console.log("add: ", req)
  return db.query(`
  INSERT INTO likes(user_id, listing_id)
  VALUES ($1, $2);
  `, [req.userId, req.listingId])
    .catch(err => {
      console.log(err);
    });
  }
}

const getLikesByUser = (userId) => {
    return db.query(`
  SELECT * FROM likes
  WHERE user_id = $1;
  `, [userId])
  .then(res => {
    if (res.rows[0]) {
      return res.rows;
    } else {
      return null;
    }
  })
      .catch(err => {
        console.log(err);
      });
  }

  const getFaveListings = (userId) => {
    return db.query(`
  SELECT listings.*
  FROM listings
  JOIN likes ON listing_id = listings.id
  JOIN users ON users.id = likes.user_id
  WHERE user_id = $1;
  `, [userId])
  .then(res => {
    if (res.rows[0]) {
      return res.rows;
    } else {
      return null;
    }
  })
      .catch(err => {
        console.log(err);
      });
}

const getMyListings = (userId) => {
  return db.query(`
SELECT * FROM listings
WHERE seller_id = $1;
`, [userId])
.then(res => {
  if (res.rows[0]) {
    return res.rows;
  } else {
    return null;
  }
})
    .catch(err => {
      console.log(err);
    });
}

const deleteListing = (listingId) => {
  return db.query(`
  DELETE FROM listings
  WHERE id = $1;
  `, [listingId])
    .catch(err => {
      console.log(err);
    });
}

const markSold = (listingId, isSold) => {
  if (isSold === 'true') {
    return db.query(`UPDATE listings
  SET is_active = TRUE
  WHERE id = $1;
  `, [listingId])
    .catch(err => {
      console.log(err);
    });
  } else {
  return db.query(`
  UPDATE listings
  SET is_active = FALSE
  WHERE id = $1;
  `, [listingId])
    .catch(err => {
      console.log(err);
    });
  }
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

module.exports = { login, markSold, deleteListing,favourite, getMyListings, getFaveListings, getLikesByUser, getListingById, getUserByID, todayDate ,addUser, addListing, getUserWithEmail, getHotListings, getListingsByTime, searchListings, charLimit};

