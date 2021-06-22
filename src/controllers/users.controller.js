'use strict';

const Users = require("../models/users.model");

exports.findAll = (req, res) => {
    Users.findAll((err, user) => {
    if (err) {
        res.status(400);
        res.send(user);
        return;
    }
    res.send(user);
  });
};

exports.create = (req, res) => {
  const new_user = new Users({
      ...req.body,
      imageFile: req.files.length ? req.files[0] : 'none'
  });
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Users.create(new_user, (err, user) => {
      if (err) {
        res.status(400);
        res.send(err);
        return;
      }
      res.json({
        error: false,
        message: "User added successfully!",
        data: user,
      });
    });
  }
};

exports.findById = (req, res) => {
    Users.findById(req.params.id, (err, user) => {
    if (err) {
        res.status(400);
        res.send(err);
        return;
    }
    res.json(user);
  });
};

exports.update = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Users.update(req.params.id, new Users(req.body), (
      err,
      user
    ) => {
      if (err) {
        res.status(400);
        res.send(err);
        return;
      }
      res.json({ error: false, message: "User successfully updated" });
    });
  }
};

exports.delete = (req, res) => {
    Users.delete(req.params.id, (err, user) => {
    if (err) {
        res.status(400);
        res.send(err);
        return;
    }
    res.json({ error: false, message: "User successfully deleted" });
  });
};
