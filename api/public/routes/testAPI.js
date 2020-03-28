const express = require('express');
const router = express.Router();
const Board = require(`../model/Battleship`);

router.get('/', function(req, res, next) {
  res.send('API working properly');
});

module.exports = router;