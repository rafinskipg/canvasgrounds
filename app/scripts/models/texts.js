var entities = require('./entities');

var texts = [];
var suscribers = [];

var intro =  new entities.textEntity({
  text: ['Colors',
  'by rafinskipg']
});

var predefinedTexts = [
  {
    text: ['Red',
    'as your eyes after programming all day',
    'as deep',
    'deeep',
    'deeep',
    'goatse'],
    trigger: 'red'
  },{
    text: ['Green',
    '',
    'as bulbasur'],
    trigger: 'green'
  },
  {
    text: ['Brown',
    'because potatoes'],
    trigger: 'brown'
  },
  {
    text: ['Blue',
    'azuulll porque tu amor es azull',
    'como el marr azullllll'],
    trigger: 'blue'
  },
  {
    text: ['Yellow','porque yellow mis cohonéééé'],
    trigger: 'yellow'
  },
  {
    text: ['White', 'as walter', 'like santas beard'],
    trigger: 'white'
  },
  {
    text: [
    'All','because potatoes again'],
    trigger: 'default'
  },
  {
    text: ['fire', ':)'],
    trigger: 'fire'
  }
]

function trigger(index){
  suscribers.forEach(function(sus){
    sus(index);
  });
}

function suscribe(fn){
  suscribers.push(fn);
}

function newText(){
  var text = predefinedTexts.shift();
  console.log(text)
  return new entities.textEntity({ text: text.text});
}

function prepareNewText(){
  var text = predefinedTexts[0];
  trigger(text.trigger);
}

texts.push(intro);

module.exports.texts = texts;
module.exports.newText = newText;
module.exports.prepareNewText = prepareNewText;
module.exports.suscribe = suscribe;