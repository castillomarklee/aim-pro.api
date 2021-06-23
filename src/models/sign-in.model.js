"use strict";

const dbConn = require("./../../config/db.config");

const Creds = function (creds) {
  this.username = creds.username;
  this.password = creds.password;
};

Creds.signIn = (usercreds, result) => {
  dbConn.query("Select * from users where username = ? and password = ? ", [usercreds.username, usercreds.password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Creds;
