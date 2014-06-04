/* global google:true */
/* jshint unused:false, camelcase:false */
/* global AmCharts:true, moment:true */


(function(){
  'use strict';

  $(document).ready(init);

  var charts = {};

  function init(){
    // initDate();
    initMap(36, -85, 7);
    demoMarker();
    // $('#add').click(show);
    // $('#add').click(get);
  }

  // function initDate(){
  //   var fmt = moment().format('LL');
  //   $('#date').append(fmt);
  // }

//=============================================Map functions
  var map;

  function initMap(lat, lng, zoom){
    // let styles = [{'stylers':[{'visibility':'off'}]},{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#2f343b--'}]},{'featureType':'landscape','stylers':[{'visibility':'on'},{'color':'#514ED9'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'visibility':'on'},{'color':'#2f343b'},{'weight':1}]}];
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: null};//SATELITE or HYBRID are options instead of ROADMAP.
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function addMarker(lat, lng, name, icon){
    let latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, icon: icon});
  }

  function show(){
    let location = $('#location').val().trim();
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({address: location}, (results, status)=>{
      let name = results[0].formatted_address;
      let lat = results[0].geometry.location.lat();
      let lng = results[0].geometry.location.lng();
      addMarker(lat, lng, name, './media/map-marker.svg');
      let latLng = new google.maps.LatLng(lat, lng);
      map.setCenter(latLng); //------------centers the map on the object you want
      map.setZoom(6);
    });
  }

  function demoMarker(){
    addMarker(36.137076, -86.778557, 'The Basement');
  }



})();
