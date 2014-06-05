var shows = global.nss.db.collection('shows');
var _ = require('lodash');
var Mongo = require('mongodb');
//var moment = require('moment');

class Show{
	static create(obj, func){
		var show = new Show();
		show.date = obj.date;
		show.latitude = obj.latitude;
		show.longitude = obj.longitude;
		show.pictures = [];
		show.venue = obj.venue;

		shows.save(show, ()=>{
			func(show);
		});
	}//end static create

	static findPast(func){
		var today = new Date();
		today.setDate(today.getDate()-1);//changing today to yesterday
		shows.find().toArray((err, shows)=>{
			var pastShows = _.filter(shows, show=>{
				var showDate = new Date(show.date);
				return showDate < today;
				});//end pastShows
				func(pastShows);
			});//end find
		}

	static findFuture(func){
		var today = new Date();
		shows.find().toArray((err, shows)=>{
			var futureShows = _.filter(shows, show=>{
				var showDate = new Date(show.date);
				return showDate >= today;
			});//end pastShows
				func(futureShows);
		});//end find
	}// end static findFuture

	static findByDate(date, func){
		shows.findOne({date:date}, (err, result)=>{
			result = _.create(Show.prototype, result);
			func(result);
		});
	}

	static findById(id, func){
		id = Mongo.ObjectID(id);
		shows.findOne({_id: id}, (err, show)=>{
			func(show);
		});
	}

	save(func){
    shows.save(this, (err, count)=>{
      func();
    });
  }// end save


	// ***** this stuff to be used by chron ************

	addPhoto(pic){
		this.pictures.push(pic);
	}// end addPhotos



}// end class Show
module.exports = Show;
