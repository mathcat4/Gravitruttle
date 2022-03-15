var truttle;
var blocks;
let count;

function getSize(width, height) {
  if ((width * 9) / 16 < height) {
    return [width, (width * 9) / 16];
  } else {
    return [(height * 16) / 9, height];
  }
}

function setupGame() {
  truttle = new Truttle();
  blocks = [];
  blocks.push(new Block());
  count = 0;
  start.play();
}

function keyPressed() {
  if (keyCode == DOWN_ARROW || key == "s") {
    truttle.sink();
  } else if (keyCode == UP_ARROW || key == " " || key == "w") {
    truttle.fly();
  }
}

function main() {
  background(bg);
  textFont(mineFont);
  textSize(width / 20);
  fill(250, 458, 75);
  text("Points:" + truttle.points, 10, width / 20);
  text("Lives:" + truttle.lives, textWidth("Points: ") + 100, width / 20);

  if (!truttle.hit) {
    truttle.show();
    truttle.update();
  }
  if (truttle.lives <= 0) {
    return false;
  }

  if (truttle.hit) {
    truttle.rotate();
    if (truttle.dead) {
      return false;
    }
  }

  for (let ind = 0; ind < blocks.length; ind++) {
    block = blocks[ind];

    block.show();
    if (!truttle.hit) {
      block.update();
      block.collide(truttle);

      if (block.x + block.width < -50) {
        if (!block.got) {
          truttle.lives--;
        }
        blocks.splice(ind, 1);
        blocks.push(new Block());
      }
    }
  }

  return true;
}
