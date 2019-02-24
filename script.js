var x = document.getElementById("x");
$(function(){
  $("button").click();
});
$("button").click(function() {
  if(navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
    } else {
        x.innerHTML = "yeah geolocation isn't working";
    }
});
var data1;
Papa.parse("aircraftDatabase.csv", {
  delimeter: ", ",
  header:true,
  complete:function(results) {
    data1 = results;
  }
})

var lat2 = 0;
var lon2 = 0;
var changed = document.getElementById("airplanes");
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    lat2 = position.coords.latitude;
    lon2 = position.coords.longitude;
  }

function initMap() {
  var myLatLng = {lat: 42.3605297, lng: -71.0871475};
  console.log(myLatLng);
  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 4,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'You Are Here'
  });
}
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}

var airplanes = [];
var request = new XMLHttpRequest();
request.open('GET', 'https://opensky-network.org/api/states/all', true);
request.onload = function() {
var data = JSON.parse(this.response);
//var data = this.response;
for(var i = 0; i < Object.keys(data.states).length; i++ ){

  /*
  var carriers = [[]];
  if (carriers.indexOf(String(data.states[i][1])) == -1) {
    carriers.push([data.states[i][1], 0]);
    console.log(data.states[i][1]);

  } else {
    var location = carriers.indexOf(String(data.states[i][1]));
    carriers[location][1]++;
  }
  */


var lon1 = parseFloat(data.states[i][5]);
var lat1 = parseFloat(data.states[i][6]);

var pos = {lat:String(lat1), lon:String(lon1)};

Number.prototype.toRad = function() {
 return this * Math.PI / 180;
}
var R = 6371; // km
//has a problem with the .toRad() method below.
var x1 = lat2-lat1;
var dLat = x1.toRad();
var x2 = lon2-lon1;
var dLon = x2.toRad();
var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c;
if (d < 20) {
  airplanes.push(data.states[i][1].trim());
  console.log(data.states[i][1].trim);
  console.log(airplanes);
  console.log(data1);

//  addMarker(pos);

}

}}

request.send();
