class Background {
  constructor(game, backgroundImage) {
    // The amount of shifting
    this.SOURCE_SHIFT = 7;

    // coordinates of background image
    this.sourceY = 0;
    this.sourceX = 0;

    // Size of background image to crop and use
    this.sourceSize = 192

    // Minimum X coordinate for the camera
    this.MIN_X = 0;

    // Minimum Y coordinate for the camera
    this.MIN_Y = 0;

    // Maximum X coordinate for the camera
    this.MAX_X = backgroundImage.width - this.sourceSize;

    // Maximum Y coordinate for the camera
    this.MAX_Y = backgroundImage.height - this.sourceSize;

    this.spriteSheet = backgroundImage;
    this.game = game;
    this.ctx = this.game.ctx;
    this.collides = false;
  }

  draw() {
    this.ctx.drawImage(this.spriteSheet, this.sourceX, this.sourceY,
      this.sourceSize, this.sourceSize, 0, 0,
      this.ctx.canvas.width, this.ctx.canvas.height);
  }

  update() {

  }

  allowUpdate() {

  }

  checkBounds() {
    if (this.sourceY < this.MIN_Y) {
      this.sourceY = this.MIN_Y;
    } else if (this.sourceY > this.MAX_Y) {
      this.sourceY = this.MAX_Y;
    }

    if (this.sourceX < this.MIN_X) {
      this.sourceX = this.MIN_X;
    } else if (this.sourceX > this.MAX_X) {
      this.sourceX = this.MAX_X;
    }
  }
}