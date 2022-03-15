function Block() {
  this.gap = height / 4 + truttle.imageHeight;
  this.upper = random(0, height - 150);
  this.lower = height - (this.upper + this.gap);

  this.x = width;
  this.width = width / 20;

  this.hitWidth = this.width / 2.5;
  this.got = false;

  this.show = function () {
    for (
      let box = this.upper - this.width;
      box >= -this.width;
      box -= this.width
    ) {
      image(boxImg, this.x, box, this.width, this.width);
    }

    for (let box = 0; box <= this.lower; box += this.width) {
      image(boxImg, this.x, height - this.lower + box, this.width, this.width);
    }
  };

  this.update = function () {
    this.x -= width / 170;
  };

  this.isBelow = function (truttle) {
    if (truttle.y < this.upper && truttle.y > this.upper - this.hitWidth) {
      if (
        truttle.x + truttle.imageWidth > this.x &&
        truttle.x < this.x + this.width
      ) {
        this.upper -= this.width;
        clack.play();
        this.got = true;
        truttle.points++;
        return true;
      }
    }

    if (
      truttle.y + truttle.imageHeight < height - this.lower + this.hitWidth &&
      truttle.y + truttle.imageHeight > height - this.lower
    ) {
      if (
        truttle.x + truttle.imageWidth > this.x &&
        truttle.x < this.x + this.width
      ) {
        this.lower -= this.width;
        clack.play();
        this.got = true;
        truttle.points++;
        return true;
      }
    }

    return false;
  };

  this.collide = function (truttle) {
    if (truttle.y < this.upper) {
      if (
        truttle.x + truttle.imageWidth > this.x &&
        truttle.x < this.x + this.width
      ) {
        truttle.hit = !this.isBelow(truttle);
        if (truttle.hit) {
          clack.play();
        }
        return "upper";
      }
    }

    if (truttle.y + truttle.imageHeight > height - this.lower) {
      if (
        truttle.x + truttle.imageWidth > this.x &&
        truttle.x < this.x + this.width
      ) {
        truttle.hit = !this.isBelow(truttle);
        if (truttle.hit) {
          clack.play();
        }
        return "lower";
      }
    }
    truttle.hit = false;
    return false;
  };
}
