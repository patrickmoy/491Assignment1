/**
 * Game Engine implementation erived from Seth Ladd's Game Engine work.
 */

/**
 * Setting first available method to requestAnimFrame based on browser.
 */
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function ( /* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

/**
 * GameEngine class tracks game time, handles updating/rendering and stores
 * inputs from player.
 */
class GameEngine {
  constructor(ctx) {
    this.entities = [];
    this.myCollisions = [];

    this.inputs = {
      "KeyW": false,
      "KeyA": false,
      "KeyS": false,
      "KeyD": false,
      "KeyJ": false,
      "KeyK": false,
      "Space": false
    };

    this.heroFace = 's';
    this.currentTileMap = 0;

    this.ctx = ctx;
    this.startInput();
  }

  /**
   * Initiates GameEngine, which instantiates GameTimer and CollisionDetection
   * module.
   */
  init() {
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new GameTimer();
    this.collision = new CollisionDetection();
    console.log('Game engine initialized');
  }

  /**
   * Adds entity to the game engine.
   */
  addEntity(entity) {
    this.entities.push(entity);
  }

  /**
   * Updates all entities. Sets CollisionDetection module's entities to only
   * those entities that are alive and can collide. (to be used later)
   */
  update() {
    this.entities.forEach(entity => entity.update());
    this.collision.entities = this.entities.filter(x => !x.isDead &&
      x.collides);
  }

  /**
   * Calls CollisionDetection module to check collisions for entities. Then
   * processes collision behavior by flagging updates that would collide.
   */
  collisionUpdate() {
    this.myCollisions =
      this.collision.checkCollisions(this.collision.entities);
    //console.log(collisions);
    this.collision.processCollisions(this.myCollisions);
    this.entities.forEach(entity => entity.allowUpdate());

  }

  /**
   * Game loop runs every tick, and updates, checks collisions, and renders.
   */
  loop() {
    this.clockTick = this.timer.tick();
    this.update();
    this.collisionUpdate();
    this.draw();
  }

  /**
   * Clears canvas and draws all entities.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    this.entities.forEach(entity => entity.draw());
    this.ctx.restore();
  }

  /**
   * Runs GameEngine after initialization. Establishes loop.
   */
  run() {
    var self = this;
    console.log("Game is starting...");


    function gameLoop() {
      self.loop();
      window.requestAnimFrame(gameLoop, self.ctx.canvas);
    }
    gameLoop();
  }

  /**
   * Enables input for GameEngine.
   */
  startInput() {
    var self = this;

    // If button is pressed and the button is a key we care about, set it
    // to true.
    this.ctx.canvas.addEventListener("keydown", (key) => {
      if (self.inputs.hasOwnProperty(key.code)) {
        self.inputs[key.code] = true;
      }
    });

    // If button is lifted from press and the button is a key we care about,
    // set it to false.
    this.ctx.canvas.addEventListener("keyup", (key) => {
      if (self.inputs.hasOwnProperty(key.code)) {
        self.inputs[key.code] = false;
      }
    });
  }

  /**
   * Method checks current input keys and returns whether inputs are pressed.
   * @return {Boolean} Returns true if no inputs, and false otherwise.
   */
  noInputs() {
    var self = this;
    return (Object.keys(self.inputs)
      .every(function (key) {
        return !self.inputs[key]
      }));
  }

  /**
   * Method checks current input keys and returns whether movement inputs are
   * active.
   * @return {Boolean} Returns true if movement keys are pressed (WASD), and
   * false otherwise.
   */
  hasMoveInputs() {
    var self = this;
    return (self.inputs['KeyW'] || self.inputs['KeyA'] || self.inputs['KeyS'] || self.inputs['KeyD']);
  }
}

/**
 * GameTimer class stores game time (in seconds), and processes game ticks.
 */
class GameTimer {
  constructor() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.lastTimeStamp = 0;
  }

  /**
   * Updates internal Game Time by one tick.
   * @return {Number} Returns the tick duration in seconds.
   */
  tick() {
    var currentTime = Date.now();
    // console.log(currentTime + "currently");
    var delta = (currentTime - this.lastTimeStamp) / 1000;
    // console.log(delta + " delta seconds?");
    this.lastTimeStamp = currentTime;
    var gameDelta = Math.min(delta, this.maxStep);
    // console.log(gameDelta + "the game delta");
    this.gameTime += gameDelta;
    // console.log(this.gameTime + "the game time");
    return gameDelta;
  }
}