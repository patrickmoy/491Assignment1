class BasicEnemy extends Entity {

  constructor(game, spritesheet) {
    super(game, 300, 570, 64, 84);
    this.animation = new Animation(spritesheet, 62, 70, 8, .150, 8, 1.75);
    this.ctx = game.ctx;
    this.speed = 150;
    this.status = 'idle';
    this.actionTimeCount = 0;
  }

  update() {
    this.skipUpdate = false;
    if (this.status == 'attacking') {
      this.attack();
    } else if (this.status == 'defending') {
      this.defend();
    } else if (this.game.inputs["KeyJ"] && (this.status != 'attacking')) {
      this.status = 'attacking';
    } else if (this.game.inputs["KeyK"] && (this.status != 'defending')) {
      this.status = 'defending';
    } else if (this.game.hasMoveInputs()) {
      this.walk();
    } else {
      this.status = 'idle';
      this.newX = this.x;
      this.newY = this.y;
    }
    this.predictBox();
  }

  draw() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.box.minX, this.box.minY, this.status, this.actionTimeCount);
  }

  attack() {
    this.actionTimeCount += this.game.clockTick;
    if (this.actionTimeCount >= 1.2) {
      this.status = 'idle';
      this.actionTimeCount = 0;
    }
  }

  defend() {
    this.actionTimeCount += this.game.clockTick;
    if (this.actionTimeCount >= 1.2) {
      this.status = 'idle';
      this.actionTimeCount = 0;
    }
  }

  walk() {
    this.status = 'walking';
    if (this.game.inputs["KeyW"]) {
      this.newBox.minY = this.box.minY - this.game.clockTick * this.speed;
    }
    if (this.game.inputs["KeyS"]) {
      this.newBox.minY = this.box.minY + this.game.clockTick * this.speed;
    }
    if (this.game.inputs["KeyA"]) {
      this.newBox.minX = this.box.minX - this.game.clockTick * this.speed;
    }
    if (this.game.inputs["KeyD"]) {
      this.newBox.minX = this.box.minX + this.game.clockTick * this.speed;
    }
  }


}