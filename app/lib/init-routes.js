'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var shows = traceur.require(__dirname + '/../routes/shows.js');

  app.get('/', dbg, home.index);
  app.get('/show/past/:id', dbg, shows.past);
  console.log('Routes Loaded');
  fn();
}
