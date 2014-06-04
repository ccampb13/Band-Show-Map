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

  }

//=============================================Map functions
  var map;

  function initMap(lat, lng, zoom){
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: null};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function addMarker(lat, lng, name, icon){
    let latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, icon: icon});
  }

  function demoMarker(){
    addMarker(36.137076, -86.778557, 'The Basement');
  }



})();
