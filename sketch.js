var ship, arrows = [], enemies = [], score = 0;

function setup() {
  createCanvas(400, 600);
  ship = new Ship();
  for(var i = 0; i < random(15, 20); i++) {
    var enemy = new Enemy();
    enemies.push(enemy);
  }
}

function keyReleased() {
  ship.leftS = 0;
  ship.rightS = 0;
}

function keyPressed() {
  if(key === ' ') {
    ship.shoot();
  }
  if(keyCode === LEFT_ARROW) {
    ship.leftS = 5;
  } else if(keyCode === RIGHT_ARROW) {
    ship.rightS = 5;
  }
}

function draw() {
  background(0);
  
  ship.show();
  ship.left();
  ship.right();
  
  if(ship.pos.x > width) {
    ship.pos.x = 0;
  } else if (ship.pos.x < 0) {
    ship.pos.x = width;
  }
  
  if(arrows.length > 0) {
    for(var x in arrows) {
      arrows[x].show();
      if(arrows[x].pos.y < 0) {
        arrows.splice(x, 1);
      }
    }
  }
  
  for(var x in enemies) {
    enemies[x].show();
  }
  
  fill(255);
  textSize(10);
  text('Score '+ score, 20, height-20);
}

function Ship() {
  this.height = 30;
  this.width = 10;
  this.pos = createVector(width/2, height-this.height-5);
  this.leftS = 0;
  this.rightS = 0;

  this.left = function() {
    ship.pos.x -= this.leftS;
  }
  
  this.right = function() {
    ship.pos.x += this.rightS;
  }
  
  this.shoot = function() {
    var arrow = new Arrow(this.pos.x, this.pos.y, this.height);
    arrows.push(arrow);
    console.log(arrows);
  }
  
  this.show = function() {
    noStroke();
    
    // Wings
    fill(100);
    rect(this.pos.x - this.width, this.pos.y + this.height/4, 20, 10);
    
    // Body
    fill(255);
    rect(this.pos.x - this.width/2, this.pos.y, this.width, this.height-10);
    
    // Shooter
    fill(100);
    triangle(this.pos.x - this.width/2, this.pos.y - this.height + 30, this.pos.x, this.pos.y - this.height + 20, this.pos.x + this.width/2, this.pos.y - this.height + 30);

  }
}

function Arrow(x, y, h) {
  this.pos = createVector(x, y - h + 20);
  this.r = 2;
  
  this.show = function() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    this.pos.y-=20;
  }
  
  this.hits = function(obj) {
    var d = dist(this.pos.x, this.pos.y, obj.pos.x, obj.pos.y);
    if(d < this.r + obj.r) {
      return true;
    } else {
      return false;
    }
  }
  
}

function Enemy() {
  this.pos = createVector(random(width), random(-500, -10000));
  this.r = random(5, 15);
  
  this.show = function() {
    fill(255, 0, 0);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    this.pos.y++;
    if(this.pos.y > height) {
      playerLost();
    }
    for(var x in arrows) {
      if(arrows[x].hits(this)){
        score++;
        this.pos.y = random(0, -500);
        arrows.splice(x, 1);
      }
    }
  }
}

function playerLost(){
  alert("You Lost");
  window.location = 'index.html';
}