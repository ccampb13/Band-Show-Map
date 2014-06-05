/*jshint camelcase:false*/
'use strict';

var traceur = require('traceur');
var Show = traceur.require(__dirname + '/../models/show.js');
var _ = require('lodash');
var shows = global.nss.db.collection('shows');

exports.past = (req, res)=>{
  Show.findPast(shows=>{
    res.render('shows/past', {shows:shows, title: 'Past Shows'});
  });
};

exports.future = (req, res)=>{
  Show.findFuture(shows=>{
    res.render('shows/future', {shows:shows, title: 'Future Shows'}, (err, html)=>{
      res.send({html:html, shows:shows});
    });
  });
};

exports.images = (req, res)=>{
  Show.findById(req.params.id, show=>{
  	console.log(show);
    res.render('shows/images', {show:show, title:'Show Images'});
  });
};



//to populate your DB with the shows, just enter http://localhost:3000/shows/populateDB/
exports.populateDB = (req, res)=>{
	var request = require('request');
	request('http://api.bandsintown.com/artists/mbid_b1003bf1-25b8-41f4-a783-36060f987913/events?format=json&app_id=NSS&date=all', function (error, response, body) {
  	if(!error && response.statusCode === 200) {
  		body = JSON.parse(body);
  		_.forEach(body, show=>{
  			Show.create({date:show.datetime,latitude:show.venue.latitude,longitude:show.venue.longitude,venue:show.venue.name}, ()=>{
  				res.render('shows/past', {title: 'Node.js: Home'});
  			});
  		});
  	}
	});
};

//to get pictures enter http://localhost:3000/shows/loadPictures and wait for a really long time. FUCK!
exports.getPictures = (req, res)=>{
	var request = require('request');
	request('https://api.instagram.com/v1/tags/snow/media/recent?access_token=10528748.f59def8.8807aab6f2314e86a2a3f38aef27f4a8', function (error, response, body) {
		console.log(error);
  	if(!error && response.statusCode === 200) {
  		body = JSON.parse(body);
  		var photoArr = body.data;
  		shows.find().toArray((err, showObjs)=>{

  			 _.forEach(photoArr, photo=>{
  		 		var tomorrow = new Date(photo.created_time*1000);
  				tomorrow.setDate(tomorrow.getDate()+1);
  				var yesterday = new Date(photo.created_time*1000);
  				yesterday.setDate(yesterday.getDate()-1);

  				var sameDayShow = _.filter(showObjs, show=>{
  					var showDate = new Date(show.date);
  					return (showDate > yesterday && showDate < tomorrow);
  				});

  				if(sameDayShow[0]){
  					console.log('sameDayShow');
  					console.log(sameDayShow[0]);
  					sameDayShow[0].pictures.push(photo.images.standard_resolution.url);
  					shows.save(sameDayShow[0], ()=>{});
  				}
  			 });
  		});
  	}
	});
};
