var entities = require('./entities');
var utils = require('../utils');
var particles = getColorParticles(null, 50);

function newParticle(color){
  return  new entities.particleEntity({
      x: utils.random(0, window.innerWidth),
      y: utils.random(0, window.innerHeight),
      radius: utils.random(5, 20),
      speedX: utils.random(-20, 20),
      speedY: utils.random(-20, 20),
      mass: utils.random(10, 30),
      life: utils.random(10, 500),
      color: color || utils.randomRGBColor()
    });
}

function getColorParticles(color, amount, baseRemainingLife){
  var p = [];
  amount = amount ? amount : 20;
  for(var i = 0; i < amount; i++){
    var particle = newParticle(color);
    if(baseRemainingLife != null){ particle.remaining_life = baseRemainingLife} ;
    p.push(particle);
  }
  return p;
}

function newFireParticle(){
  return  new entities.particleEntity({
      x: Math.ceil(window.innerWidth/2),
      y: Math.ceil(window.innerHeight/2),
      radius: utils.random(5, 20),
      speedX: utils.random(-20, 20),
      speedY: utils.random(-20, -40),
      mass: utils.random(10, 30),
      life: utils.random(10, 300),
      color: utils.randomRGBColor()
    });
}

function getFireParticles (){
  var p = [];
  for(var i = 0; i < 100; i++){
    p.push(newFireParticle())
  }
  return p;
}

module.exports.particles = particles;
module.exports.newParticle = newParticle;
module.exports.newFireParticle = newFireParticle;
module.exports.getColorParticles = getColorParticles;
module.exports.getFireParticles = getFireParticles;