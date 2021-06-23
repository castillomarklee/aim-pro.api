'use strict';

const Roles = require("../models/roles.model");

exports.findAll = (req, res) => {
  Employee.findAll((err, employee) => {
    if (err) res.send(err);
    console.log("res", employee);
    res.send(employee);
  });
};

exports.create = (req, res) => {
  const new_role = new Roles(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Roles.create(new_role, (err, role) => {
      if (err) {
        res.send(err);
        return;
      }
      res.json({
        error: false,
        message: "Role added successfully!",
        data: role,
      });
    });
  }
};

exports.findById = (req, res) => {
  Roles.findById(req.params.id, (err, role) => {
    if (err) res.send(err);
    res.json(role);
  });
};

exports.update = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Roles.update(req.params.id, new Roles(req.body), (
      err,
      role
    ) => {
      if (err) res.send(err);
      res.json({ error: false, message: "Role successfully updated" });
    });
  }
};

exports.delete = (req, res) => {
  Roles.delete(req.params.id, (err, role) => {
    if (err) res.send(err);
    res.json({ error: false, message: "Role successfully deleted" });
  });
};
