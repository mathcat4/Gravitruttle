let mainScreen;
let startScreen = true;
let endScreen;
let cont;
let clack;
let boxImg;
let bg;
let mineFont;
let truttleH;
let truttleW;
let lose;
let start;

function preload() {
  truttleImg = loadImage("assets/truttle.png", () => {
    truttleH = truttleImg.height;
    truttleW = truttleImg.width;
  });

  bg = loadImage("assets/background.png");
  boxImg = loadImage("assets/box.png");
  clack = loadSound("assets/clack.wav");
  mineFont = loadFont("assets/minefont.ttf");
  lose = loadSound("assets/lose.wav");
  start = loadSound("assets/start.wav");
}

function windowResized() {
  setup()
}

function setup() {
  createCanvas(...getSize(windowWidth, windowHeight));
  setupGame();
  textSize(width / 7);
  startX = width / 2 - textWidth("START") / 2;
  startY = height * 0.7;
  widthr = textWidth("START");
  heightr = height / 5;
}

function draw() {
  if (startScreen) {
    background(0);

    textFont(mineFont);
    textSize(width / 7);
    fill(0, 226, 20);

    text("Gravitruttle", width / 2 - textWidth("Gravitruttle") / 2, height / 5);
    image(truttleImg, width / 2 - truttleW / 2, height / 2 - truttleH / 2);

    fill(212, 244, 20);
    rect(startX, startY, widthr, heightr);

    fill(0, 113, 243);
    text("START", startX, startY + height / 6);
  } else if (mainScreen) {
    cont = main();
    if (!cont) {
      endScreen = true;
      mainScreen = false;
      lose.play();
    }
  } else if (endScreen) {
    mainScreen = false;
    background(0);
    textFont(mineFont);
    textSize(width / 5);
    fill(255, 0, 20);
    text("You Lost", width / 2 - textWidth("You Lost") / 2, width / 5);
    textSize(width / 12);
    text("Points:" + truttle.points, 20, height / 2 + width / 5);
    text(
      "Lives:" + truttle.lives,
      width - textWidth("Lives:   "),
      height / 2 + width / 5
    );
  }
}

function mousePressed() {
  if (startScreen) {
    if (mouseX > startX && mouseX < startX + widthr) {
      if (mouseY > startY && mouseY < startY + heightr) {
        startScreen = false;
        mainScreen = true;
        clack.play();
      }
    }
  } else if (!mainScreen) {
    startScreen = true;
    setupGame();
  }
}
