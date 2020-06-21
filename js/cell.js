const INF = 99999999;

function Cell(row, col, x, y, width, height, isWall, maze) {
  this.row = row;
  this.col = col;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.isWall = isWall;
  this.maze = maze;

  // f = g + h
  this.f = INF;
  this.g = INF;
  this.h = INF;

  // previous cell in the path
  this.prev = null;

  // check if the given row and col is valid
  this.isValid = (row, col) => {
    return row >= 0 && row < this.maze.length
      && col >= 0 && col < this.maze[0].length;
  };

  // get neighbors of this cell
  this.getNeighbors = () => {
    const neighbors = [];

    [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]].forEach(([nRow, nCol]) => {
      if (this.isValid(nRow, nCol) && !this.maze[nRow][nCol].isWall) {
        neighbors.push(this.maze[nRow][nCol]);
      }
    });

    return neighbors;
  };

  // display current cell
  this.show = (c) => {
    fill(c);
    noStroke();
    rect(this.x, this.y, 0.8 * this.width, 0.8 * this.height);
  };
}