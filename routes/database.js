const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
console.log(`db params: ${JSON.stringify(dbParams)}`)
db.connect();
const addUser = (user) => {
  console.log(`use in add iser: ${JSON.stringify(user)}`)
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
module.exports = addUser;
const loginUser = (user) => {
  return db.query(`
  
  `);
}

