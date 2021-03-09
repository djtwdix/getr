const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();
const addUser = (user) => {
  return db.query(`
  INSERT INTO users (email, hashed_password, first_name, last_name, city, province, country, profile_pic)
  VALUE ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `, [user.email, user.password, user.first_name, user.last_name, user.city, user.province, user.country, user.profile_pic])
  .then(res => {
    return res.rows[0];
  })
  .catch(err => err);
}
module.exports = addUser;

addUser({
  
})
