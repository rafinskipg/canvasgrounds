var Victor = require('victor');
var entity = require('./entity');

function textEntity(opts){
  opts.x = opts.x || 100;
  opts.y = opts.y || window.innerHeight;
  opts.speedY = opts.speedY || -200;

  entity.prototype.constructor.call(this, opts);
  this.color = opts.color || 'white';
  this.font = opts.font || '40px Indie Flower';
  this.text = opts.text || 'test text';
}

textEntity.prototype = new entity({x: 0, y : 0});
textEntity.prototype.constructor = textEntity;
textEntity.prototype.parent = entity.prototype;

textEntity.prototype.render = function(ctx){
  ctx.fillStyle = this.color;
  ctx.font = this.font;
  if(typeof(this.text) == 'object'){
    for(var i = 0; i < this.text.length; i++){
      this.printText(ctx,this.text[i], this.pos.y + (70 * i));
    }
  }else{
    this.printText(ctx,this.text, this.pos.y);
  }
}

textEntity.prototype.printText = function(ctx, text, posY){
  var textWidth = ctx.measureText(text).width;
  ctx.fillText(text , (window.innerWidth/2) - (textWidth / 2), posY);
}

textEntity.prototype.getTextHeight = function(){
  if(typeof(this.text) == 'object'){
    var amount = 50 * this.text.length;
    return amount;
  }else{
    return 40;
  }
}

module.exports = textEntity;