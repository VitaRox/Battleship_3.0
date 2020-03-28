const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const router = require(`../api/public/routes/index`);

// Represents an object containing global values for
// countTries, countHits, countMisses, shipsSunk;
const status = require(`/model/Battleship/updateGameArray`);


// These codes (or "symbols") represent state of cell in gameArray;
const empty = Board.empty;
const hit = Board.hit;
const miss = Board.miss;

// Our counters/accumulators:
// Initialize global counters;
var countTries = status.countTries;
var countMisses = status.countMisses;
var countHits = status.countHits;
var shipsSunk = status.shipsSunk;

// Instantiate Ship objects;
const aircraftCarrier = new Ship(5, "aircraftCarrier", 2);
const battleship = new Ship(4, "battleship", 3);
const cruiser = new Ship(3, "cruiser", 4);
const submarine = new Ship(3, "submarine", 5);
const destroyer = new Ship(2, "destroyer", 6);
// const dinghy = new Ship(1, "dinghy", 7);

// const engine = require('consolidate');
// const mustache = require('mustache-express');

// const html = require(`html`);
// const handlebars = require(`./handlebars`);
// const publicFolder = require(`../public`);

/*
 Tells our program to use 'ejs' template engine;
 Leaving this off right now for simplicity's sake;
 Add back in when separating html and js files;
 html goes into 'pages', js goes into 'public/javascript';
*/

// app.set('/views', '.ejs');
// app.engine(`html`, engine["mustache"]);
// app.set(`view engine`, `.html`);

// Gets code to make board initially and subsequently;
// When user hit main URL deliver 'battleship.html';
// Add the middleware router to the stack;
// app.use(express.static(__dirname,'public'));


// app.use(express.static('/public'));
// app.use(express.static(`/public/images`));
// app.use(express.static(`/views/battleship.html`));
app.use(`/`, router);
// Parse input strings;
// app.use(bodyParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded(
//   { extended: true }));

// Router middleware;
// Route user input ("GET" requests);
// app.use('/', router());
// router();

// Initial get request initializes game state;
app.get(`/`, (req, res) => {
  
  // Place our ships within the array;
  aircraftCarrier.placement();
  battleship.placement();
  cruiser.placement();
  submarine.placement();
  destroyer.placement();
  
  res.type('html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  // res.send(Board.initializeGameArray());
  // res.render(path.join(__dirname, '../views', 'battleship.html'));
  // res.sendFile(('views/battleship.html'+ { root: 'public' }));
  let newBoard = Board.dispBoard();
  console.log(Board.gameArray);
  res.send(newBoard);
  res.render("battleship.html", { "Board": newBoard });
});


// Establish web server listening on an available port;
app.listen(port);
console.log(`Running on port ${port}`);

// app.post('/', function (req, res) {
//   const guessIndex = req.body;
//   res.send(' Submitted Successfully!');
// });




