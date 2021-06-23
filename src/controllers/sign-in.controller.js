"use strict";

const Creds = require("../models/sign-in.model");

//Require service for generating authentication
const signInService = require("../services/sign-in.service");

exports.signIn = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  }
  const usercreds = {
    username: req.body.username,
    password: req.body.password,
  };
  Creds.signIn(usercreds, (err, userCredsRes) => {
    if (err) {
      return res.status(400).send(err);
    }
    if (userCredsRes && userCredsRes.length ) {
      const jwtToken = signInService.generateAccessToken(usercreds);
      const responseLoad = {
        jwtToken,
        firstname: userCredsRes[0].first_name,
        lastname: userCredsRes[0].last_name,
        email: userCredsRes[0].email
      };
      return res.json({
        status: 200,
        data: responseLoad,
      });
    }
    return res.status(401).send({ error: false, message: "Invalid Credentials" });
  });
};
