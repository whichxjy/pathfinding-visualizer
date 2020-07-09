const rowNum = 40;
const colNum = 60;

let gameMap;
let pathFinder;

let wallColor;
let groundColor;
let openColor;
let closeColor;
let startColor;
let targetColor;
let pathColor;

let stepStatus;

let start;
let target;

let pauseStep = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  gameMap = new GameMap(rowNum, colNum, 0, 0, windowWidth, windowHeight);

  wallColor = color(0, 0, 51);
  groundColor = color(230, 230, 230);
  openColor = color(153, 204, 255);
  closeColor = color(204, 153, 153);
  startColor = color(255, 153, 51);
  targetColor = color(255, 153, 51);
  pathColor = color(255, 204, 51);

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
      } else {
        gameMap.maze[row][col].show(groundColor);
      }
    }
  }

  for (let i = 0; i < pathFinder.openSet.length; i++) {
    pathFinder.openSet[i].show(openColor);
  }

  for (let i = 0; i < pathFinder.closeSet.length; i++) {
    pathFinder.closeSet[i].show(closeColor);
  }

  const path = getPath(pathFinder.lastVisitedCell);
  for (let i = 0; i < path.length; i++) {
    path[i].show(pathColor);
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

  background(255);
  drapMap();
}

function getPath(lastCell) {
  const path = [lastCell];
  let curr = lastCell;

  while (curr.prev !== null) {
    path.push(curr.prev);
    curr = curr.prev;
  }

  return path;
}
