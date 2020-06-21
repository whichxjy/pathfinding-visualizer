const rowNum = 40;
const colNum = 40;

let gameMap;

function setup() {
  createCanvas(500, 500);
  gameMap = new GameMap(rowNum, colNum, 10, 10, width, height);
}

function drapMap() {
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      gameMap.maze[row][col].show();
    }
  }
}

function draw() {
  background(220);
  drapMap();
}
