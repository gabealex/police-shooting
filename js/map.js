// Function to draw your map
var drawMap = function(loc, zoom) {

  // Create map and set view
  var map = L.map('#map').setView(loc, zoom);

  // Create a tile layer variable using the appropriate url
  var layer = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.
  	png?access_token=pk.
  	eyJ1IjoiZ2FiYWxleCIsImEiOiJjaWZ2cWNobWcyNGtsdWpseHZzMjFuYmhtIn0.
  	lL5qO6jM_BjGwMwXhqS-pA', {attribution: 'Map data &copy; <a href="http://openstreetmap.org">
  	OpenStreetMap</a> contributors, 
  	<a href="http://creativecommons.org/licenses/by-sa/2.0/">
  	CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
    })
    // Add the layer to your map
  layer.addTo(map);
  // Execute your function to get data
  getData();
}



// Function for getting data
var getData = function() {

  // Execute an AJAX request to get the data in data/response.js
	var data;
	$.ajax({
	    url:'data/response.json',
	    type: "get",
	    success:function(dat) {
	    	data = dat;
	    	customBuild(data);
	    } 
     dataType:"json"
}) 

  // When your request is successful, call your customBuild function

}

// Loop through your data and add the appropriate layers and points
var customBuild = function(dat) {
	var i;
    for(i = 0; i < dat.length; i++) {
    	var time = dat[i]['Timestamp'];
    	var date = dat[i]['Date Searched'];
    	var state = dat[i]['State'];
    	var county = dat[i]['County'];
    	var city = dat[i]['City'];
    	var agency = dat[i]['Agency Name'];
    	var victim = dat[i]['Victime Name'];
    	var age = dat[i]["Victim's Age"];
    	var gender = dat[i]["Victim's Gender"];
    	var hit = dat[i]["Hit of Killed?"];
    	var armed = dat[i]['Armed or Unarmed?'];
    	var weapon = dat[i]['Weapon'];
    	var summary = dat[i]['Summary'];
    	var source = dat[i]['Source Link'];
    	var lat = dat[i]['lat'];
    	var lng = dat[i]['lng'];

        console.log(lat);
        console.log(lng);

        L.circleMarker([lat, long]).addTo(map).bindPopup();
    }
	// Be sure to add each layer to the map

	// Once layers are on the map, add a leaflet controller that shows/hides layers
  
}