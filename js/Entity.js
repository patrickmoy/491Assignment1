class Entity {

  constructor(game, x, y, width, height) {
    this.game = game;
    this.box = {
      minX: x,
      minY: y,
      maxX: x + width,
      maxY: y + height
    };
    this.newBox = {
      minX: this.box.minX,
      minY: this.box.minY,
      maxX: this.box.maxX,
      maxY: this.box.maxY
    };
    this.width = width;
    this.height = height;
    this.updates = true;
    this.isDead = false;
    this.isDying = false;
    this.collides = true;
  }

  update() {

  }

  draw() {

  }

  getCollisionBox() {
    return this.box;
  }

  predictBox() {
    this.box.min = [this.newX, this.newY];
    this.box.max = [this.newX + this.width, this.newY + this.height];
  }

  resetNewBox() {
    this.newBox = {
      minX: this.box.minX,
      minY: this.box.minY,
      maxX: this.box.maxX,
      maxY: this.box.maxY
    };
  }

  allowUpdate() {
    if (this.updates) {
      this.box = {
        minX: this.newBox.minX,
        minY: this.newBox.minY,
        maxX: this.newBox.maxX,
        maxY: this.newBox.maxY
      };
    } else {
      this.newBox = {
        minX: this.box.minX,
        minY: this.box.minY,
        maxX: this.box.maxX,
        maxY: this.box.maxY
      };
    }
  }
}