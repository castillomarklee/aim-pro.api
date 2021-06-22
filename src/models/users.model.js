const dbConn = require("./../../config/db.config");

const Users = function (user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.phone = user.phone;
  this.username = user.username;
  this.password = user.password;
  this.roleId = user.roleId;
  this.imageFile = user.imageFile.filename;
  this.created_at = new Date();
  this.updated_at = new Date();
};

Users.create = (newEmp, result) => {
  dbConn.query("INSERT INTO users set ?", newEmp, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res.insertId);
  });
};

Users.findById = (id, result) => {
  dbConn.query("Select * from users where id = ? ", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Users.findAll = (result) => {
  dbConn.query("Select * from users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users : ", res);
    result(null, res);
  });
};

Users.update = (id, employee, result) => {
  dbConn.query(
    "UPDATE users SET first_name=?,last_name=?,email=?,phone=?,roleId=?, WHERE id = ?",
    [
      employee.first_name,
      employee.last_name,
      employee.email,
      employee.phone,
      employee.roleId,
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

Users.delete = (id, result) => {
  dbConn.query("DELETE FROM users WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Users;
