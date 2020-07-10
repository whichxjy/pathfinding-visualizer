function BFSPathFinder(gameMap, start, target) {
  this.gameMap = gameMap;

  this.start = start;
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

    const curr = this.openSet.shift();

    this.lastVisitedCell = curr;

    // check if the target is found
    if (curr == this.target) {
      console.log("Found");
      return STEP_FOUND;
    }

    this.closeSet.push(curr);

    curr.getNeighbors().forEach((neighbor) => {
      if (this.openSet.includes(neighbor) || this.closeSet.includes(neighbor)) {
        return;
      }

      this.openSet.push(neighbor);
      neighbor.prev = curr;
    });

    return STEP_CONTINUE;
  };
}