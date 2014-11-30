var Victor = require('victor');

function entity(opts){
  this.pos = new Victor(opts.x,opts.y);
  this.speed = new Victor(opts.speedX || 0, opts.speedY || 0);
  this.acceleration = new Victor(opts.accX || 0, opts.accY || 0);
}

entity.prototype.update = function(dt){
  this.speed.add(this.acceleration);
  var speedDt = new Victor(this.speed.x, this.speed.y).multiply(new Victor(dt, dt));
  this.pos = this.pos.add(speedDt);
}

entity.prototype.render = function(ctx){
  //Implement
}

module.exports = entity;