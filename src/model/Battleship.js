// This file provides the internal logic of the game and exports necessary functionality to app.js/route.js so
// reqs can be routed properly;

import React from 'react';
import ReactDOM from 'react-dom';

// Create empty array to represent board status;
const gameArray = [];

// These codes (or "symbols") represent state of cell in gameArray;
const empty = 0;
const hit = 1;
const miss = -1;

// Our counters/accumulators:
// Initialize global counters;
var countTries = 0;
var countMisses = 0;
var countHits = 0;
var shipsSunk = 0;


// A function to initialize each of the Model's elements to 0,
// representing an empty and unguessed element state;
initializeGameArray = () => {
  console.log("initializeGameArray");
  for(let i = 0; i < 100; i++) {
    console.log(gameArray[i]);
    this.gameArray[i] = 0;
  }
};


// The following instantiates the Ship objects representing each vessel;
// The isOdd() function is being repurposed inside determineVertical()
// to determine whether the vessel is to be placed vertically or
// horizontally;
// isOdd(): vertical;
// !isOdd(): horizontal;


// HELPER METHODS;

// Generate a random number arbitrarily between 1 and 20;
function genRandNum() {
  return Math.ceil(Math.random() * 20);
}

// Use to determine whether a Ship is vertical or horizontally placed;
function isOdd(num) {
  return num % 2 !== 0;
}

// generates a random number between 1 and 20;
// if number isOdd(), isVertical == true;
function determineVertical() {
  return isOdd(genRandNum());
}

// A function to convert gameArray index to corresponding
// (col, row) value;
// Use for placing Ships;
// Return an Object containing col, row, and index;
// Test: passed, returns expected values;
// Ironic: I may ultimately not need this at all.
const convertIndexToCoords = (index) => {
  // Initialize (col, row) to dummy values;
  let col = -1;
  let row = -1;
  
  // Check whether a one-digit number or two;
  if(index < 10) {
    col = index;
    row = 0;
    // else: if index > 9;
  } else {
    // Convert index to a string;
    // Had to change 'let' to 'var' to allow access outside of else{};
    let tempDex = index.toString();
    // Break said string into 2 components and convert to
    // base-10 Numbers;
    // Grab second digit: this will be col (y-value);
    col = parseInt(tempDex.substring(1), 10);
    // Grab first digit: this will be row (x-value);
    row = parseInt(tempDex.substring(0, 1), 10);
  }
  // Returns Object contain our col (x-value) and row (y-value)
  // corresponding to the index that was input;
  return {
    col: col,
    row: row,
    index: index
  };
};

// Function to convert (col, row) to index for searching for Ships
// and checking user input;
// Tested and working;
function convertCoordsToIndex(col, row) {
  let strDex = "" + row + col + "";
  // 'Index' added for code clarity;
  let index = parseInt(strDex, 10);
  return index;
};

/*
 The display of the Model, the visual display tracking hits, misses
 and ship position;
*/
dispGameArray = () => {
  
  let html = "";
  
  // Creates the visual array tracking ship positions and where hits/misses
  // have occurred;
  console.log((100 - countTries) + " unchecked spaces remaining in gameArray.");
  
  // This controls the display of the gameArray;
  for (let row= 0; row < 10; row++) {
    for(let col = 0; col < 10; col++) {
      // Internally convert coords to index here:
      let index = convertCoordsToIndex(col, row);
      // If: empty or unguessed;
      if (gameArray[index] === 0) {
        html += 'X ';
        // Check if contains Ship when fired upon;
      } else if (gameArray[index] === -1){
        html += miss + ' ';
      } else if (gameArray[index] ===  2) {
        html += aircraftCarrier.symbol + ' ';
      } else if (gameArray[index] ===  3) {
        html += battleship.symbol + ' ';
      } else if (gameArray[index] ===  4) {
        html += cruiser.symbol + ' ';
      } else if (gameArray[index] ===  5) {
        html += submarine.symbol + ' ';
      } else if (gameArray[index] ===  6) {
        html += destroyer.symbol + ' ';
      } else if (gameArray[index] ===  1) {
        html += hit + ' ';
      }
      if(col === 9) {
        html += "<br>";
      }
    }
    // document.getElementById("part3").innerHTML = html;
    console.log(html);
  }
};

/*
 Create an Object constructor for the general Ship-type Object;
 Ships contain info about their size (# of spaces they occupy),
 name, a symbol to show where a hit has occurred, and when they
 will sink (when hitPoints == 0);
 Storing the data in an object instance will allow for the eventual
 modification of the game to support a specified number of instances
 of each vessel, a fun and challenging feature I want to add;
*/
class Ship {
  constructor(size, name, symbol) {
    
    // Size is number of spaces Ship occupies;
    this.size = size;
    
    // Name is a string of the type of vessel;
    this.name = name;
    
    // Symbol is an abbreviation for the vessel's name;
    // To be used for showing where hits have taken place.
    this.symbol = symbol;
    
    // hitPoints initially equal to the number of spaces the Ship
    // occupies.
    this.hitPoints = this.size;
    
    // I changed this from "const isSunk blah blah blah" to "this.isSunk";
    // Let's see if this helps the Ship placement algorithm work properly;
  
    // If isOdd() returns true, isVertical == true;
    let isVertical = determineVertical();
    
    // A recursive function to determine if
    // Ship can be placed at the corresponding element in gameArray;
    // Pass in the Ship it is checking for to place;
    // This function also places the ships within the gameArray;
  }
  
  isSunk() {
      // hitPoints tracks which individual vessels have been sunk;
      if (this.hitPoints === 0) {
        shipsSunk++;
        alert(`The ${this.name} has been sunk!`);
      }
    }

  placement() {
      
      // If Ship is vertical:
      if (isVertical) {
        // Generate random X-coordinate;
        let col = Math.floor(Math.random() * 9);
        // Generate random Y-coordinate (row) between 0 and (10 - size);
        let row = Math.floor(Math.random() * (10 - this.size));
        // originRow is a value to store the starting value of row
        // that we have generated here;
        let originRow = row;
        // Determine gameArray starting placement
        // index corresponding to (col, row);
        let j = convertCoordsToIndex(col, row);
        
        // Inspect possible spots to see if canPlace;
        let canPlace = true;
        // i tracks how many spaces must be filled;
        for (let i = this.size; i > 0; i--) {
          
          // If the space is unoccupied:
          if (gameArray[j] === 0 && canPlace) {
            // Continue inspecting potential spots, increment row;
            j = convertCoordsToIndex(col, row++);
            // Else: stop looking here, try again;
            // Recursive case:
          } else {
            canPlace = false;
            placeShip();
          }
        }
        // If it's been scouted and approved, place the vessel,
        // beginning with the original generated row value;
        if (canPlace) {
          for (let i = this.size; i > 0; i--) {
            j = convertCoordsToIndex(col, originRow);
            gameArray[j] = this.symbol;
            originRow++;
          }
        }
        // If Ship is horizontal:
      } else {
        // Generate random X-coordinate between 0 and (10 - size);
        let col = Math.floor(Math.random() * (10 - this.size));
        // Generate random Y-coordinate between 0 and 9;
        let row = Math.floor(Math.random() * 9);
        // originRow is a value to store the starting value of row
        // that we have generated here;
        let originCol = col;
        // Determine gameArray starting placement
        // index corresponding to (col, row);
        let j = convertCoordsToIndex(col, row);
        let canPlace = true;
        console.log(canPlace);
        // Increment the col to place Ship sideways;
        for (let i = this.size; i > 0; i--) {
          // If that space is available:
          if (gameArray[j] === 0 && canPlace) {
            // Continue inspecting potential spots, increment row;
            j = convertCoordsToIndex(col++, row);
            // Recursive case:
          } else {
            canPlace = false;
            console.log(canPlace)
            placeShip();
          }
        }
        // If it's been scouted and approved, place the vessel,
        // beginning with the original generated row value;
        if (canPlace) {
          for (let i = this.size; i > 0; i--) {
            j = convertCoordsToIndex(originCol, row);
            gameArray[j] = this.symbol;
            originCol++;
          }
        }
      }
      console.log("Placed Ship: " + this.name);
    }
};

/*
 Update the View;
 Checks gameArray[index] for hit or miss, then updates the html string
 as appropriate;
 Return a string of html, sent to be inserted into Part 1 of our bs.html file in ./views;
*/
dispBoard = () => {
  let table = "<tbody>";
  
  for (let r = 0; r < 10; r++) {
    table += "<tr>";
    for(let c = 0; c < 10; c++) {
      let index = convertCoordsToIndex(c, r);
      // let column = row.insertCell(-1);
      let column;
      if (gameArray[index] === miss) {
        column = "<div class='grid-item'><img src='/api/public/images/miss.png' alt='1' height='25' width='25'></div>";
      } else if (gameArray[index] === hit) {
        column = "<div class='grid-item'><img src='/api/public/images/hit.png' alt='1' height='25' width='25'></div>";
      } else {
        column = "<div class='grid-item'><img src='/api/public/images/water.png' alt='1' height='25' width='25'></div>";
      }
      table += column;
      if (c === 9) {
        table += "</tr>";
      }
    }
    table += "</tbody>";
    return table;
  }
};

// Get and validate user input;
// Update the view;
getUpdateDisplay = () => {
  
  // Get user input;
  // let guessX = getGuessX();
  // let guessY = getGuessY();
  
  updateGameArray(guessX, guessY);
  dispGameArray();
  dispBoard();
};

// Export our 'stats' variable, which will
// exports.stats = stats;

// Update data;
// Will change data (symbol in gameArray), which will update the
// appearance of the board;
updateGameArray = (guessX, guessY) => {
  let index = convertCoordsToIndex(guessX, guessY);
  console.log("coordinates guessed:  (" + guessX + ", " + guessY + ")");
  console.log("index: " + index);
  // If: empty count as a miss;
  if (gameArray[index] === empty) {
    // Place 'miss' Ship object here to reflect a miss;
    gameArray[index] = miss;
    countMisses++;
    // Else if: a miss, mark as a miss again;
  } else if(gameArray[index] === miss) {
    gameArray[index] = miss;
    // Else if: a hit, mark as a hit again;
  } else if (gameArray[index] === hit) {
    gameArray[index] = hit;
    // Else: a Ship:
  } else {
    if(gameArray[index] === 2) {
      aircraftCarrier.hitPoints--;
    } else if(gameArray[index] === 3) {
      battleship.hitPoints--;
    } else if(gameArray[index] === 4) {
      cruiser.hitPoints--;
    } else if(gameArray[index] === 5){
      submarine.hitPoints--;
    } else if(gameArray[index] === 6) {
      destroyer.hitPoints--;
    }
    // ...mark as hit;
    gameArray[index] = hit;
    // Increment total hits made;
    countHits++;
  }
  // Update the model and view, update global counters;
  countTries++;
  
  // Return an object containing our globals;
  return {
    countTries : this.countTries,
    countHits : this.countHits,
    countMisses : this.countMisses,
    gameArray : this.gameArray
  };
};

// Export our necessary functions so can be seen by middleware
module.exports = {
  initializeGameArray : initializeGameArray,
  Ship : Ship,
  Board : gameArray,
  updateGameArray : updateGameArray,
  dispGameArray : dispGameArray,
  dispBoard : dispBoard,
  convertIndexToCoords : convertIndexToCoords
};

