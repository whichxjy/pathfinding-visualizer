const rowNum = 40;
const colNum = 40;

let gameMap;
let pathFinder;

let wallColor;
let openColor;
let closeColor;
let startColor;
let targetColor;

let stepStatus;

let start;
let target;

let pauseStep = false;

function setup() {
  createCanvas(windowHeight, windowHeight);

  gameMap = new GameMap(rowNum, colNum, 10, 10, 0.8 * windowHeight, 0.8 * windowHeight);

  wallColor = color(0, 0, 51);
  openColor = color(153, 204, 255);
  closeColor = color(200, 0, 0);
  startColor = color(255, 153, 51);
  targetColor = color(255, 153, 51);

  stepStatus = STEP_CONTINUE;

  start = gameMap.maze[0][0];
  target = gameMap.maze[rowNum - 1][colNum - 1];
  pathFinder = new PathFinder(gameMap, start, target);
}

function drapMap() {
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      if (gameMap.maze[row][col].isWall) {
        gameMap.maze[row][col].show(wallColor);
      }
    }
  }

  for (let i = 0; i < pathFinder.openSet.length; i++) {
    pathFinder.openSet[i].show(openColor);
  }

  for (let i = 0; i < pathFinder.closeSet.length; i++) {
    pathFinder.closeSet[i].show(closeColor);
  }

  start.show(startColor);
  target.show(targetColor);
}

function draw() {
  if (stepStatus !== STEP_CONTINUE) {
    return;
  }
  if (mouseIsPressed) {
    pauseStep = !pauseStep;
  }

  if (!pauseStep) {
    stepStatus = pathFinder.step();
  }

  background(238);
  drapMap();
}
