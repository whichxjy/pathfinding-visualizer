function GameMap(rowNum, colNum, x, y, width, height) {
  this.rowNum = rowNum;
  this.colNum = colNum;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.cellWidth = this.width / colNum;
  this.cellHeight = this.height / rowNum;

  // 2D maze
  this.maze = new Array(rowNum);

  for (let i = 0; i < rowNum; i++) {
    this.maze[i] = new Array(colNum);
  }

  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const wallRatio = 0.3;
      const isWall = random(1.0) < wallRatio;
      this.maze[row][col] = new Cell(
        row, col, this.x + row * this.cellWidth, this.y + col * this.cellHeight,
        this.cellWidth, this.cellHeight, isWall, this.maze
      );
    }
  }
}