var entity = require('./entity');
var sprite = require('../sprite');
var Victor = require('victor');

function Player(opts){
  entity.prototype.constructor.call(this, opts);
  this.mass = opts.mass || 1;
  this.angle = opts.angle || 0;
  this.radius = opts.radius || 5;
  this.life = opts.life || 200;
  this.remaining_life = this.life;
  this.maxSpeed = opts.maxSpeed || 200;
  this.sprite = new sprite(window.playerImage);
  this.sprite.addAnimation('flap', [0,1,2,1,0,1,2,3,4,5], [10,10], 1000);
  this.sprite.playAnimation('flap');
}

Player.prototype.render = function(ctx){
  this.sprite.render(ctx, this.pos.x, this.pos.y, 30, 30, this.angle);
}

Player.prototype.update = function(dt){
  this.sprite.update(dt);
  if((this.speed.x < this.maxSpeed && this.acceleration.x > 0)  || this.acceleration.x < 0){
    this.speed.add(this.acceleration);
  }

  if(this.destinyAngle != null && this.destinyAngle != this.angle){
    if(this.angle < this.destinyAngle){
      this.angle = (this.angle + dt * 100) > this.destinyAngle ? this.destinyAngle : (this.angle + dt* 100 );
    }else{
      this.angle = (this.angle - dt * 100) < this.destinyAngle ? this.destinyAngle : (this.angle - dt* 100);
    }
  }

  var speedDt = new Victor(this.speed.x, this.speed.y).multiply(new Victor(dt, dt)).rotateDeg(this.angle);
  
  this.pos = this.pos.add(speedDt);

  //Check borders
  if(this.pos.x > window.innerWidth){
    this.pos.x = 0;
  }else if(this.pos.x < 0){
    this.pos.x = window.innerWidth;
  }
  if(this.pos.y > window.innerHeight){
    this.pos.y = 0;
  }else if(this.pos.y < 0){
    this.pos.y = window.innerHeight;
  }
}

module.exports = Player;