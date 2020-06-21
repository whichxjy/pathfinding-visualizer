function Cell(row, col, x, y, width, height, isWall) {
  this.row = row;
  this.col = col;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.isWall = isWall;

  this.show = () => {
    if (this.isWall) {
      const c = color(0, 0, 0);
      fill(c);
      noStroke();
      rect(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, this.height / 2);
    } else {
      const c = color(0, 200, 0);
      fill(c);
      noStroke();
      rect(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, this.height / 2);
    }
  };
}