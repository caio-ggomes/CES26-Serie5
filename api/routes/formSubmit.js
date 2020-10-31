var express = require("express");
var router = express.Router();
const fs = require('fs');
const { stringify } = require("querystring");
const { finished } = require("stream");

'use strict'

let users = [];

router.post("/", function(req, res) {
    const newUser = {
      name: req.body['name'],
      age: req.body['age'],
    };

    fs.writeFileSync('../data.json', JSON.stringify(newUser), finished);

    function finished(error) {
        console.log("Succes!");
    }

    users.push(newUser);
    console.log(users);
    res.writeHead(200);
  });

module.exports = router;