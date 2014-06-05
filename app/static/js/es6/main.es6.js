/* global google:true */
/* jshint unused:false, camelcase:false */
/* global AmCharts:true, moment:true */


(function(){
  'use strict';

  $(document).ready(init);

  var charts = {};

  function init(){
    initMap(36, -85, 4);
    demoMarker();
    getFutureShows();
    getPastShows();
    $('#pastShows').on('click', '.pastShow', showImages);

  }

//=============================================Map functions
  var map;

  function initMap(lat, lng, zoom){
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: null};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function addMarker(lat, lng, name, icon){
    let latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, icon: '/img/map-marker.svg'});
  }

  function demoMarker(){
    addMarker(36.137076, -86.778557, 'The Basement');
  }

//============================================Shows Past and Future

  function getFutureShows(){
      $.ajax({
        url: '/shows/future',
        type: 'GET',
        data: null,
        dataType: 'json',
        success: futureShows=>{
          console.log(futureShows);
          //i don't know if you can for each like this, but we will try it
          //its right here. you were right, it is because we need to run it on a different layer of the object
          futureShows.shows.forEach(s=>{
            var lat = s.latitude;
            var lon = s.longitude;
            var name = s.venue;
            addMarker(lat, lon, name);
          });
          $('#futureShows').append(futureShows.html);
        }
      });
    }

  function getPastShows(){
      $.ajax({
        url: '/shows/past',
        type: 'GET',
        data: null,
        dataType: 'html',
        success: pastShows=>{
          console.log('THESE ARE THE PAST SHOWS');
          console.log(pastShows);
          $('#pastShows').append(pastShows);
        }
      });
    }

//===============================================Past Show Images

  function showImages(){

  }



})();
