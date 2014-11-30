var Victor = require('victor');
var utils = require('../utils');
var sprite = require('../sprite');
var entity = require('./entity');
var assetsLoader = require('../assetsLoader');

function birdEntity(opts){
  opts.x = opts.x || 100;
  opts.y = opts.y || window.innerHeight/2;
  opts.speedY = opts.speed || -200;
  opts.speedX = opts.speed || -200;

  entity.prototype.constructor.call(this, opts);
  this.color = opts.color || 'black';
  this.colorFancy = utils.randomRGBColor();
  this.angle = opts.angle || 0;
  this.destinyAngle = this.angle;
  this.size = opts.size || 10;
 
  this.sprite = new sprite(window.backgroundImg);
  this.sprite.addAnimation('flap', [0,1,2,1,0,1,2,3,4,5], [10,10], 5);
  this.sprite.playAnimation('flap');
}
birdEntity.prototype = new entity({x: 0, y : 0});

birdEntity.prototype.getRepulsionRadius = function(){
  return window.SETTINGS.birdRepulsionRadius.value;
}
birdEntity.prototype.getAligmentRadius = function(){
  return window.SETTINGS.birdAlignmentRadius.value;
}
birdEntity.prototype.getAttractionRadius = function(){
  return window.SETTINGS.birdAttractionRadius.value;
}
birdEntity.prototype.getSightRadius = function(){
  return window.SETTINGS.birdSightRadius.value;
}

birdEntity.prototype.getSpeed = function(){
  return window.SETTINGS.birdSpeed.value;
}

birdEntity.prototype.constructor = birdEntity;
birdEntity.prototype.parent = entity.prototype;

birdEntity.prototype.render = function(ctx){

  if( window.SETTINGS.debugging.value == 3 ){
    //Attraction  zone
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(42, 250, 33, 0.30)';
    ctx.arc(this.pos.x, this.pos.y, this.getAttractionRadius(), Math.PI*2, false);
    ctx.stroke();
  }

  if( window.SETTINGS.debugging.value == 2 || window.SETTINGS.debugging.value == 3 ){
    //Alignment  zone
    ctx.beginPath();
    ctx.fillStyle = 'rgba(33, 42, 250, 0.20)';
    ctx.arc(this.pos.x, this.pos.y, this.getAligmentRadius(), Math.PI*2, false);
    ctx.fill();
  }
  if(window.SETTINGS.debugging.value == 1 || window.SETTINGS.debugging.value == 2 || window.SETTINGS.debugging.value == 3 ){
    //Repulsion zone
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 33, 33, 0.30)';
    ctx.arc(this.pos.x, this.pos.y, this.getRepulsionRadius(), Math.PI*2, false);
    ctx.fill();
  }

  //Bird
  ctx.fillStyle = this.leader === true ? 'red' : this.color;

  if(window.SETTINGS.debugging.value == 4){
    ctx.beginPath();
    this.opacity = 0.8;
    //a gradient instead of white fill
    var gradient = ctx.createRadialGradient(this.pos.x, this.pos.y, 0, this.pos.x, this.pos.y, this.size);
    gradient.addColorStop(0, "rgba("+this.colorFancy.r+", "+this.colorFancy.g+", "+this.colorFancy.b+", "+this.opacity+")");
    gradient.addColorStop(0.5, "rgba("+this.colorFancy.r+", "+this.colorFancy.g+", "+this.colorFancy.b+", "+this.opacity+")");
    gradient.addColorStop(1, "rgba("+this.colorFancy.r+", "+this.colorFancy.g+", "+this.colorFancy.b+", 0)");
    ctx.fillStyle = gradient;
    ctx.arc(this.pos.x, this.pos.y, this.size, Math.PI*2, false);
    ctx.fill();   
  }

  this.sprite.render(ctx, this.pos.x, this.pos.y, 20, 20, this.angle);

}

birdEntity.prototype.update = function(dt){
  this.sprite.update(dt);
  
  //Only applies for leaders
  if(this.destinyAngle && this.destinyAngle != this.angle){
    if(this.angle < this.destinyAngle){
      this.angle = (this.angle + dt) > this.destinyAngle ? this.destinyAngle : (this.angle + dt);
    }else{
      this.angle = (this.angle - dt) < this.destinyAngle ? this.destinyAngle : (this.angle - dt);
    }
    //Uncomment for weird movement
    //this.angle = this.destinyAngle * dt;
    //this.speed.rotateDeg(this.angle);
  }
  
  var speedDt = new Victor(this.getSpeed(), this.getSpeed()).multiply(new Victor(dt, dt)).rotateDeg(this.angle);
  
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

module.exports = birdEntity;