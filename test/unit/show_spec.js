/* global describe, it,  beforeEach, before */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'band-test';

var assert = require('chai').assert;
var expect = require('chai').expect;
var Mongo = require('mongodb');
var app = require('../../app/app');
var request = require('supertest');
var traceur = require('traceur');

var Show;
var testShow;

describe('Show', function(){
	before(function(done){
		request(app)
		.get('/')
		.end(function(){
			Show = traceur.require(__dirname + '/../../app/models/show.js');
			done();
		});
	});//end before

	beforeEach(function(done){
		global.nss.db.collection('shows').drop(function(){
			Show.create({date: '2007-09-12T20:00:00', latitude: '51.5033630', longitude:'-0.1276250', venue: 'Alexs basement'}, function(){
				Show.create({date: '2014-09-12T20:00:00', latitude: '51.5033630', longitude:'-0.1276250', venue: 'Alexs basement'}, function(show){
					testShow = show;
					done();
				});
				
			});
		});
	});//end beforeEach

	describe('.create', function(){
		it('should successfully create a new show object', function(done){
			Show.create({date: '10/06/2014', latitude: '51.5033630', longitude:'-0.1276250', venue: 'Terrences house of Lurve'}, function(show){
				expect(show).to.be.ok;
				assert.isString(show.latitude, show.longitude, show.venue);
				expect(show._id).to.be.an.instanceof(Mongo.ObjectID);
				expect(show).to.be.an.instanceof(Show);
				done();
			});
		});
	});

	describe('#addPhotos', function(){
		it('should save a photo based on date', function(done){
			testShow.addPhotos({date: '1401672656', photo: 'http://31.media.tumblr.com/9c5b9599417006191c3d4dd55eefb53f/tumblr_mjlze8ATmR1s8qzcdo1_500.jpg'}, function(date){
				expect(date).to.be.ok;
				done();
			});
		});
	});

	describe('.findPast', function(){
		it('should find shows from yesterday and past', function(done){
			Show.findPast(function(today){
				expect(today).to.be.ok;
			});
			done();
		});
	});

	describe('.findFuture', function(){
		it('should find shows from today on', function(done){
			Show.findFuture(function(today){
				expect(today).to.be.ok;
			});
			done();
		});
	});

});// end describe "Show"