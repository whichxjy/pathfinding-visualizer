const rowNum = 40;
const colNum = 30;

let gameMap;
let pathFinder;

function setup() {
  createCanvas(700, 550);
  gameMap = new GameMap(rowNum, colNum, 0, 0, 500, 500);

  const start = gameMap.maze[0][0];
  const target = gameMap.maze[rowNum - 5][colNum - 5];
  pathFinder = new PathFinder(gameMap, start, target);
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
