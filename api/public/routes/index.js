const express = require('express');
const router = express.Router();

const Board = require(`src/model/Battleship/:Board`);
const Battleship = require(`src/model/Battleship`)
const Ship = Board.Ship;

/* GET home page in initial request to root URL. */
router.get('/', function(req, res, next) {
  res.send('<App />', { title: 'BATTLESHIP' });
});

router.post('/:guess', (req, res) => {
  let input = req.params.body;
  let x = parseInt(input.charAt(0));
  let y = parseInt(input.charAt(1));
  let results = Board.getUpdateDisplay();
  res.sendFile(results.gameArray);
  let turn = Board.dispBoard();
  res.render(``, {Board : `turn` });
  // res.next();
});

module.exports = router;
