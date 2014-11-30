var Victor = require('victor');
var entity = require('./entity');
var utils = require('../utils');

function particleEntity(opts){
  entity.prototype.constructor.call(this, opts);
  this.color = opts.color || {r:0, g: 0, b: 0};
  this.mass = opts.mass || 1;
  this.angle = opts.angle || 0;
  this.radius = opts.radius || 5;
  this.life = opts.life || 200;
  this.remaining_life = this.life;
  this.opacity = 1;
  this.operator = utils.flipCoin() ? 1 : -1;
}

particleEntity.prototype = new entity({x: 0, y : 0});
particleEntity.prototype.constructor = particleEntity;
particleEntity.prototype.parent = entity.prototype;

particleEntity.prototype.render = function(ctx){

  ctx.beginPath();
  this.opacity = Math.round(this.remaining_life/this.life*100)/100
  //a gradient instead of white fill
  var gradient = ctx.createRadialGradient(this.pos.x, this.pos.y, 0, this.pos.x, this.pos.y, this.radius);
  gradient.addColorStop(0, "rgba("+this.color.r+", "+this.color.g+", "+this.color.b+", "+this.opacity+")");
  gradient.addColorStop(0.5, "rgba("+this.color.r+", "+this.color.g+", "+this.color.b+", "+this.opacity+")");
  gradient.addColorStop(1, "rgba("+this.color.r+", "+this.color.g+", "+this.color.b+", 0)");
  ctx.fillStyle = gradient;
  ctx.arc(this.pos.x, this.pos.y, this.radius, Math.PI*2, false);
  ctx.fill();

  if(!this.dying){
    if(this.remaining_life < 0 ){
      this.operator = 1;
    }else if(this.remaining_life > this.life){
      this.operator = -1;
    }

    this.operator < 0 ? this.remaining_life-- : this.remaining_life++;
  }else{
    this.remaining_life--;
  }
}

module.exports = particleEntity;