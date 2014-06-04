/* global google:true */
/* jshint unused:false, camelcase:false */
/* global AmCharts:true, moment:true */


(function(){
  'use strict';

  $(document).ready(init);

  var charts = {};

  function init(){
    initMap(36, -85, 6);
    demoMarker();
<<<<<<< HEAD
    getFutureShows();
    getPastShows();
    $('#pastShows').on('click', '.pastShow', showImages);
=======
>>>>>>> ad6e0db376d623c7b09a458336cfb8ea323d1f4e

  }

//=============================================Map functions
  var map;

  function initMap(lat, lng, zoom){
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: null};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function addMarker(lat, lng, name, icon){
    let latLng = new google.maps.LatLng(lat, lng);
<<<<<<< HEAD
    new google.maps.Marker({map: map, position: latLng, title: name, icon: '/img/map-marker.svg'});
=======
    new google.maps.Marker({map: map, position: latLng, title: name, icon: icon});
>>>>>>> ad6e0db376d623c7b09a458336cfb8ea323d1f4e
  }

  function demoMarker(){
    addMarker(36.137076, -86.778557, 'The Basement');
  }

//============================================Shows Past and Future

  function getFutureShows(){
      $.ajax({
        url: '/',
        type: 'GET',
        data: null,
        dataType: 'json',
        success: futureShows=>{
          console.log(futureShows);
          futureShows.futureShows.forEach(s=>{
            var lat = s.latitude;
            var lon = s.longitude;
            var name = s.venueName;
            addMarker(lat, lon, name.toString());
          });
        }
      });
    }

  function getPastShows(){
      $.ajax({
        url: '/',
        type: 'GET',
        data: null,
        dataType: 'json',
        success: pastShows=>{
          console.log(pastShows);
          pastShows.pastShows.forEach(s=>{
            var lat = s.latitude;
            var lon = s.longitude;
            var name = s.venueName;
            addMarker(lat, lon, name.toString());
          });
        }
      });
    }

//===============================================Past Show Images

  function showImages(){
    
  }



})();
