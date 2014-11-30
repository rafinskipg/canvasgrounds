'use strict';

var assetsLoader = require('./assetsLoader');
var utils = require('./utils');


var then, now, 
  canvas, ctx,
  canvas2, ctx2,
  time, limit = 50, 
  paused = false;


function start(playersInfo){
  launchCanvas();
}

function launchCanvas(){
  $('canvas').removeClass('hidden');

  then = Date.now();
  
  canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth //Or wathever
  canvas.height = window.innerHeight; //Or wathever
  ctx = canvas.getContext('2d');
  
  canvas2 = document.getElementById('canvas2');
  canvas2.width = window.innerWidth //Or wathever
  canvas2.height = window.innerHeight; //Or wathever
  ctx2 = canvas2.getContext('2d');
  
  loop();
}

var loop = function loop(){
  now = Date.now();
  var dt = now - then;
  then = now;

  if(!paused){
    clear();
    update(dt/1000);
    render();
  }

  requestAnimationFrame(loop);
}

function update(dt){
  
}

function clear(){
  //Resize clears the canvas and is good when the window is gonna be resized
  //But it's memory expensive
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  ctx2.canvas.width = window.innerWidth;
  ctx2.canvas.height = window.innerHeight;
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  
  var gradient = ctx.createLinearGradient(canvas.width, canvas.height,0, 0);
  gradient.addColorStop(0, "rgb(84, 141, 189)");
  gradient.addColorStop(1, "rgb(99, 64, 113)");
  ctx.fillStyle = gradient;    
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function render(){
  
}

module.exports = {
  start: start
}