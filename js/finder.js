const STEP_CONTINUE = 1;
const STEP_FOUND = 2;
const SETP_NOT_FOUND = 3;

function PathFinder(gameMap, start, target) {
  this.gameMap = gameMap;

  this.start = start;
  this.start.g = 0;
  this.start.isWall = false;

  this.target = target;
  this.target.isWall = false;

  this.lastVisitedCell = start;

  this.openSet = [start];
  this.closeSet = [];

  // continue => STEP_CONTINUE
  // found => STEP_FOUND
  // not found => SETP_NOT_FOUND
  this.step = () => {
    if (this.openSet.length === 0) {
      console.log("Not Found");
      return SETP_NOT_FOUND;
    }

    // find the next cell
    let winner = 0;
    for (let i = 1; i < this.openSet.length; i++) {
      if (this.openSet[i].f < this.openSet[winner].f
        || (this.openSet[i].f === this.openSet[winner].f && this.openSet[i].g > this.openSet[winner].g)) {
        winner = i;
      }
    }
    const curr = this.openSet[winner];

    this.lastVisitedCell = curr;

    // check if the target is found
    if (curr == this.target) {
      console.log("Found");
      return STEP_FOUND;
    }

    // move the curr cell from the open set to the close set
    this.removeElement(this.openSet, curr);
    this.closeSet.push(curr);

    curr.getNeighbors().forEach((neighbor) => {
      if (this.closeSet.includes(neighbor)) {
        return;
      }

      const currNeighborG = curr.g + 1;

      if (!this.openSet.includes(neighbor)) {
        this.openSet.push(neighbor);
      } else if (currNeighborG >= neighbor.g) {
        return;
      }

      neighbor.g = currNeighborG;
      neighbor.h = this.calculateH(neighbor);
      neighbor.f = neighbor.g + neighbor.h;
      neighbor.prev = curr;
    });

    return STEP_CONTINUE;
  };

  // remove an element from the array
  this.removeElement = (arr, item) => {
    const item_index = arr.indexOf(item);
    arr.splice(item_index, 1);
  };

  // calculate h value of the cell
  this.calculateH = (cell) => {
    return abs(cell.row - target.row) + abs(cell.col - target.col);
  };
}