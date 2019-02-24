setTimeout(function() {
  location.reload();
}, 600000);

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
  delimeter: "",
  header:true,
  complete:function(results) {
    data1 = results;
  }
})

var lat2 = 0;
var lon2 = 0;
var changed = document.getElementById("testio");
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    lat2 = position.coords.latitude;
    lon2 = position.coords.longitude;
  }


var airplanes = [];
var request = new XMLHttpRequest();
request.open('GET', 'https://opensky-network.org/api/states/all', true);
var coords = [[]];
var alla = [];
var allo = [];
var cords = [];
request.onload = function() {
var data = JSON.parse(this.response);
//var data = this.response;
var count = 0;


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
  alla.push(data.states[i][6]);
  allo.push(data.states[i][5]);
  console.log(coords);
  var add = airplanes[count];
  count+=1;
  $("p").append(function(){
     return "<b>The airplane " + String(add) + " is close to you.</b><br> In fact, it is about " + String(Math.round(d)) + " kilometers from you, if you want real numbers it's " + String(d) + " kilometers.<br>";

});

//  addMarker(pos);

}

}}
function initMap() {
  var idunno = [
    {
      position: new google.maps.LatLng(alla[0], allo[0]),
    },
    {
      position: new google.maps.LatLng(alla[1], allo[1]),
    },
    {
      position: new google.maps.LatLng(alla[2], allo[2]),
    }

  ]
  var test = 42.3605297
  var myLatLng = {lat: test, lng: -71.0871475};
  console.log(myLatLng);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });
  idunno.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      map: map
    });
  });
  /*
  for (var i = 0; i < coords.length; i++) {
    var ll2 = {lat: parseFloat(alla[i]), lng: parseFloat(allo[i])}
    //var latLng = new google.maps.LatLng(coords[i]);
    console.log(ll2);
    var marker = new google.maps.Marker({
      position: ll2,
      map:map
    })
  }
*/
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'You Are Here'

  });
  var aeee = new google.maps.LatLng(42.3752, -71.1033);

    var marker = new google.maps.Marker({
      position:aeee,
      map:map
  });


}


request.send();
