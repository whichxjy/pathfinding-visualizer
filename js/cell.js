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
  this.f = 0;
  this.g = 0;
  this.h = 0;

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
  this.show = () => {
    if (this.isWall) {
      const c = color(0, 0, 0);
      fill(c);
      noStroke();
      rect(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, this.height / 2);
    } else {
      const c = color(0, 0, 140);
      fill(c);
      noStroke();
      rect(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, this.height / 2);
    }
  };
}