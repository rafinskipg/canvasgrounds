var loader;
var images = {};

function onLoadComplete(fn){
  loader.addCompletionListener(fn);
}

function addImage(uri, alias){
  images[alias] = loader.addImage(uri);
}

function getImage(alias){
  return images[alias];
}

function initLoader(){
  loader = new PxLoader(); 
}

module.exports = {
  init: initLoader,
  addImage: addImage,
  getImage: getImage,
  onLoadComplete: onLoadComplete,
  load: function () {
    loader.start();
  }
}