const leftBarWidth = 10;
const topBarHeight = 50;

const elementHeight = topBarHeight * 0.6;

let pauseButton;
let restartButton;
let finderSelector;

let finderCode;

const rowNum = 50;
const colNum = 80;

let pauseStep = false;

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

function setup() {
  createCanvas(windowWidth, windowHeight);

  finderCode = FINDER_ASTAR;

  textAlign(CENTER);

  pauseButton = createButton("暂停");
  pauseButton.position(10, 10);
  pauseButton.size(AUTO, elementHeight);
  pauseButton.mousePressed(() => {
    if (pauseStep) {
      pauseStep = false;
      pauseButton.html("暂停");
    } else {
      pauseStep = true;
      pauseButton.html("继续");
    }
  });

  restartButton = createButton("重新开始");
  restartButton.position(80, 10);
  restartButton.size(AUTO, elementHeight);
  restartButton.mousePressed(() => {
    init();
  });

  finderSelector = createSelect();
  finderSelector.position(180, 10);
  finderSelector.size(50, elementHeight);
  finderSelector.option("A*");
  finderSelector.option("BFS");
  finderSelector.option("DFS");
  finderSelector.changed(() => {
    let item = finderSelector.value();

    if (item === "A*") {
      finderCode = FINDER_ASTAR;
      init();
    } else if (item === "BFS") {
      finderCode = FINDER_BFS;
      init();
    } else if (item === "DFS") {
      finderCode = FINDER_DFS;
      init();
    }
  });

  wallColor = color(0, 0, 51);
  groundColor = color(230, 230, 230);
  openColor = color(153, 204, 255);
  closeColor = color(204, 153, 153);
  startColor = color(255, 153, 51);
  targetColor = color(255, 153, 51);
  pathColor = color(255, 204, 51);

  init(FINDER_ASTAR);
}

function init() {
  stepStatus = STEP_CONTINUE;
  pauseStep = false;

  const mapWidth = windowWidth - leftBarWidth;
  const mapHeight = windowHeight - topBarHeight;
  gameMap = new GameMap(rowNum, colNum, leftBarWidth, topBarHeight, mapWidth, mapHeight);

  start = gameMap.maze[0][0];
  target = gameMap.maze[rowNum - 1][colNum - 1];

  if (finderCode === FINDER_ASTAR) {
    pathFinder = new AStarPathFinder(gameMap, start, target);
  } else if (finderCode === FINDER_BFS) {
    pathFinder = new BFSPathFinder(gameMap, start, target);
  } else if (finderCode === FINDER_DFS) {
    pathFinder = new DFSPathFinder(gameMap, start, target);
  }
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
