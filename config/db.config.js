const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

dbConn.connect(function(err) {
  if (err) {
      throw err;
  }
  console.log("Database Connected!");
});

module.exports = dbConn;