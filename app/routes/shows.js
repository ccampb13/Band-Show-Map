'use strict';

var traceur = require('traceur');
var Show = traceur.require(__dirname + '/../models/show.js');
var _ = require('lodash');

exports.past = (req, res)=>{
  Show.findPast(shows=>{
    res.render('shows/past', {shows:shows, title: 'Future Shows'});
  });
};

exports.future = (req, res)=>{
  Show.findFuture(shows=>{
    res.render('shows/future', {shows:shows, title: 'Future Shows'}, (err, html)=>{
      res.send({html:html, shows:shows});
    });
  });
};


//to populate your DB with the shows, just enter http://localhost:3000/shows/populateDB/
exports.populateDB = (req, res)=>{
	var request = require('request');
	request('http://api.bandsintown.com/artists/mbid_b1003bf1-25b8-41f4-a783-36060f987913/events?format=json&app_id=NSS&date=all', function (error, response, body) {
  	if(!error && response.statusCode === 200) {
  		body = JSON.parse(body);
  		console.log(body);
  		_.forEach(body, show=>{
  			Show.create({date:show.datetime,latitude:show.venue.latitude,longitude:show.venue.longitude,venue:show.venue.name}, ()=>{
  				res.render('shows/past', {title: 'Node.js: Home'});
  			});
  		});
  	}
	});
};

// exports.getPictures = (req, res)=>{
// 	var request = require('request');
// 	var request = require('request');
// 	request('https://api.instagram.com/v1/tags/snow/media/recent?access_token=10528748.f59def8.8807aab6f2314e86a2a3f38aef27f4a8', function (error, response, body) {
//   	if(!error && response.statusCode === 200) {
//   		console.log(body);
//   	}
// 	});
// };
