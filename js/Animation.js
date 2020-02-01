// TODO possibly rework animation to handle direction. Doesn't seem necessary though.
class Animation {
  /**
   * Constructor to create Animation object. Class is written with a horizontally aligned sprite sheet in mind - please ensure sprite sheet is formatted as such through Aseprite or Marmoset Hexels.
   * @param {string} spriteSheet   Filepath of sprite sheet.
   * @param {number} frameHeight X coordinate to begin pulling sprite
   * @param {number} frameWidth Y coordinate to begin pull
   * @param {number} sheetWidth  X coordinate to stop
   * @param {number} singleFrameTime  Y coordinate to stop
   * @param {number} frameCount of animation in ms
   * @param {boolean} loop          [description]
   * @param {number} scale          [description]
   */
  constructor(spriteSheet, frameWidth, frameHeight, sheetWidth, singleFrameTime, frameCount, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = singleFrameTime;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.singleFrameTime = singleFrameTime;
    this.frameCount = frameCount;
    this.elapsedTime = 0;
    this.scale = scale;
    this.totalAnimTime = singleFrameTime * frameCount;
  }

  drawFrame(tick, ctx, gamePositionX, gamePositionY, status, count) { //May have to extend this and have each entity inherit depending on spritesheet customization.

    this.elapsedTime += tick;
    if (this.isDone()) {
      this.elapsedTime -= this.totalAnimTime; // Fiddle with later to see what's best for overlap
    }
    switch (status) {
      case 'idle':
        ctx.drawImage(this.spriteSheet, 0, 0, this.frameWidth, this.frameHeight, gamePositionX, gamePositionY, this.frameWidth * this.scale, this.frameHeight * this.scale);
        break;
      case 'walking':
        var frame = this.currentFrame();
        var xIndex = frame % this.spriteSheet.width;
        ctx.drawImage(this.spriteSheet, xIndex * this.frameWidth,
          0 * this.frameHeight, this.frameWidth, this.frameHeight,
          gamePositionX, gamePositionY, this.frameWidth * this.scale,
          this.frameHeight * this.scale);
        break;
      case 'attacking':
        var frame = this.currentActionFrame(count);
        var xIndex = frame % this.spriteSheet.width;
        ctx.drawImage(this.spriteSheet, xIndex * this.frameWidth,
          1 * this.frameHeight, this.frameWidth, this.frameHeight,
          gamePositionX, gamePositionY, this.frameWidth * this.scale,
          this.frameHeight * this.scale);

        break;
      case 'defending':
        var frame = this.currentActionFrame(count);
        var xIndex = frame % this.spriteSheet.width;
        ctx.drawImage(this.spriteSheet, xIndex * this.frameWidth,
          2 * this.frameHeight, this.frameWidth, this.frameHeight,
          gamePositionX, gamePositionY, this.frameWidth * this.scale,
          this.frameHeight * this.scale);
        break;
      default:
        break;

    }
  }


  currentFrame() {
    return Math.floor(this.elapsedTime / this.frameDuration);
  }

  currentActionFrame(someElapsedTime) {
    return Math.floor(someElapsedTime / this.frameDuration);
  }
  isDone() {
    return this.elapsedTime >= this.totalAnimTime;
  }
}