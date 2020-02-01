let testManager = new ImageManager();

testManager.queueDownload("./res/img/sample_background.png");
testManager.queueDownload("./res/img/knight_spritesheet.png");
testManager.startDownload()
  .then(() => {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEng = new GameEngine(ctx);
    ctx.imageSmoothingEnabled = false;

    gameEng.init();
    gameEng.run();
    gameEng.addEntity(new Background(gameEng, testManager.getImage("./res/img/sample_background.png")));
    gameEng.addEntity(new BasicEnemy(gameEng, testManager.getImage("./res/img/knight_spritesheet.png")));


  });