const rs = require('readline-sync');

 const height = ['1', '2', '3'];
const width = ['A', 'B', 'C'];
const ships = [];
let choose = [];
let repeat = false;

function getRandom() {
  let toStrike = 0;
  while(toStrike < 2) {
    let h = Math.floor(Math.random() * height.length);
    let w = Math.floor(Math.random() * width.length);
    let unit = width[w] + height[h];
    if (!ships.includes(unit)) {
      ships.push(unit);
      toStrike++;
    }
  }
  return ships;
  };
  
  function targetShip(block) {
    while(ships.length > 0) {
    let location = rs.question(`Enter a location to strike ie 'A2'  `,{
    limit: block,
    limitMessage: 'This is not a valid Unit combo!',
  });
    if (ships.includes(location) && ships.length > 1) {
      console.log('Hit. You have sunk a battleship. 1 ship remaining.');
      choose.push(location);
      removeWhenFound(location);
    } else if (ships.includes(location)) {
      removeWhenFound(location);
      restart();
    } else if (!ships.includes(location) && !choose.includes(location)) {
      choose.push(location);
      console.log('You have missed!');
    } else {
      console.log('You have already picked this location. Miss!');      
    };
  }
};

function removeWhenFound(choice) {
  let i = ships.findIndex(index => index === choice);
  ships.splice(i,1);
};

function restart() {
  repeat = rs.keyInYN('You have destroyed all battleships. Would you like to play again?  ');
   if (repeat) {
    choose = [];
    getRandom();
   }
};

let startGame = rs.question(`Press any key to start the game!  `, {
  limit: /[\s\S]/g,
}); 

const validLocation = [];
for (let i = 0; i < height.length; i++) {
  for (let j = 0; j < width.length; j++) {
    let limit = width[j] + height[i];
    validLocation.push(limit.toUpperCase());
  }
};

getRandom();
targetShip(validLocation);


//! READ ME: 
//* lIMIT on targetShip doesn't apply on lowercase ValidLocation (need to look at it!) 
//* Also the game should start directly after any character and not after pressing ENTER