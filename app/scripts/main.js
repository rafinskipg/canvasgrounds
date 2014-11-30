/*
  Start endpoint
 */

var core = require('./core');
var assetsLoader = require('./assetsLoader');

$(document).ready(function(){
  assetsLoader.init();
  assetsLoader.addImage('images/birdsprite.png', 'playerSprite');
  assetsLoader.onLoadComplete(function(){
    core.start();
  });
  assetsLoader.load();

});
  