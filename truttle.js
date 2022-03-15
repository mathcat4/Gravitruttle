function Truttle() {
  this.imageWidth = width / 12;
  this.imageHeight = (this.imageWidth * 3) / 4;

  this.y = height / 2;
  this.x = width / 5 - this.imageWidth / 2;

  this.jump = 4;
  this.speed = 0;
  this.gravity = 0.07;

  this.count = 0;
  this.points = 0;
  this.lives = 3;
  this.cDirection = 1;
  this.dead = 0;

  this.maxheight = height - this.imageHeight;
  this.arrowWidth = this.imageWidth / 5;

  this.hit = false;

  this.show = function () {
    image(truttleImg, this.x, this.y, this.imageWidth, this.imageHeight);
    if (this.gravity > 0) {
      fill(this.count + 127, 23, 128);
    } else {
      fill(this.count + 23, 128, 69);
    }

    drawArrow(
      this.x + this.imageWidth * 0.48 - this.arrowWidth,
      this.y - this.arrowWidth / 2,
      this.arrowWidth,
      this.arrowWidth,
      this.gravity < 0
    );
  };

  this.sink = function () {
    this.speed += this.jump;
  };

  this.fly = function () {
    this.speed -= this.jump;
  };

  this.update = function () {
    this.speed += this.gravity;
    this.y += this.speed;

    if (this.y < 0) {
      this.y = 0;
      clack.play();

      if (this.gravity > 0) {
        this.speed = 3;
      } else {
        this.speed = 0;
      }

      this.gravity *= -1;
    } else if (this.y > this.maxheight) {
      this.y = this.maxheight;
      clack.play();

      if (this.gravity < 0) {
        this.speed = -3;
      } else {
        this.speed = 0;
      }

      this.gravity *= -1;
    }

    if (this.cDirection == 1) {
      if (this.count > 96) {
        this.count = 96;
        this.cDirection = -1;
      } else {
        this.count++;
      }
    } else {
      if (this.count < 0) {
        this.count = 0;
        this.cDirection = 1;
      } else {
        this.count--;
      }
    }
  };

  this.rotate = function () {
    if (this.y <= height - this.imageHeight) {
      this.y += 2;
    } else {
      this.dead = true;
    }
    image(truttleImg, this.x, this.y, this.imageWidth, this.imageHeight);

    if (this.gravity > 0) {
      fill(this.count + 127, 23, 128);
    } else {
      fill(this.count + 23, 128, 69);
    }

    drawArrow(
      this.x + this.imageWidth * 0.48 - this.arrowWidth,
      this.y - this.arrowWidth / 2,
      this.arrowWidth,
      this.arrowWidth,
      this.gravity < 0
    );
  };
}

function drawArrow(x, y, width, height, up) {
  if (up) {
    rect(x, y, width, height);
    triangle(x - width / 2, y, x + 1.5 * width, y, x + width / 2, y - width);
  } else {
    rect(x, y, width, height);
    triangle(
      x - width / 2,
      y + height,
      x + 1.5 * width,
      y + height,
      x + width / 2,
      y + height + width
    );
  }
}
