'use strict';
const dbConn = require("./../../config/db.config");

//Roles object create
const Role = function (role) {
  this.role_name = role.role_name;
  this.created_at = new Date();
  this.updated_at = new Date();
};

Role.create = (newEmp, result) => {
  dbConn.query("INSERT INTO roles set ?", newEmp, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(res.insertId);
    result(null, res.insertId);
  });
};

Role.findById = (id, result) => {
  dbConn.query("Select * from roles where id = ? ", id, (
    err,
    res
  ) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Role.findAll = (result) => {
  dbConn.query("Select * from roles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("roles : ", res);
      result(null, res);
  });
};

Role.update = (id, role, result) => {
  dbConn.query(
    "UPDATE roles SET role_name=? WHERE id = ?",
    [
        role.first_name,
        role.last_name,
        role.email,
        role.phone,
        role.organization,
      role.designation,
      role.salary,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

Role.delete = (id, result) => {
  dbConn.query("DELETE FROM roles WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Role;
