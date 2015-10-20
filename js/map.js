// Function to draw your map
var drawMap = function(loc, zoom) {

  // Create map and set view
  var map = L.map('map').setView(loc, zoom);

  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
    // Add the layer to your map
  layer.addTo(map);
  // Execute your function to get data
  getData(map);
}

// Function for getting data
var getData = function(map) {

  // Execute an AJAX request to get the data in data/response.js
	var data;
	$.ajax({
	    url:"data/response.json",
	    type: "get",
	    success:function(data) {
    		customBuild(data, map);
	    } ,
     dataType:"json"
	})
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {
	var allCrime = [];
	var white = [];
	var nonwhite = [];
	var unknown = [];
	var death = [];
	var survived = [];
	var countWhiteMan = 0;
	var countWhiteWoman = 0;
	var countNonWhiteMan = 0;
	var countNonWhiteWoman = 0;

	data.map(function(d) {
		var color;
		var name = d["Victim Name"];
		var age = d["Victim's Age"];
		var gender = d["Victim's Gender"];
		var armed = d["Armed or Unarmed?"];
		var fatality = d["Hit or Killed?"];
		var race = d["Race"];
		var summary = d["Summary"];
		var link = d["Source Link"];

		if (armed == "Armed") {
			color = 'red';
		} else {
			color = 'blue';
		}

		var descr;
		if (name == undefined) {
			descr = "Name: Unknown, ";
		} else {
			descr = "Name: " + name + ", ";
		}
		if (age == undefined) {
			descr = descr + "Age: Unknown. <br />";
		} else {
			descr = descr + "Age: " + age + ". <br />";
		}
		if (summary == undefined) {
			descr = descr + "Summary: Unknown.";
		} else {
			descr = descr + "Summary: " + summary;
		}
		if (link == undefined) {
			descr = descr + "Source: Unknown."
		} else {
			descr = descr + " <a href = " + link + ">Link</a>"
		}

		if ((gender == "Male" || gender == "male") && (race == "White" || race =="white")) {
			countWhiteMan++;
		}
		if ((gender == "Female" || gender =="female") && (race == "White" || race =="white")) {
			countWhiteWoman++;
		}
		if ((gender == "Male" || gender == "male") && (race != "White" || race !="white")) {
			countNonWhiteMan++;
		}
		if ((gender == "Female" || gender == "female") && (race != "White" || race !="white")) {
			countNonWhiteWoman++;
		}

		var mark = new L.circleMarker([d.lat, d.lng], {
			radius: (age % 10),
			color: color
		});

		mark.bindPopup(descr);

		if (race == "White" || race == "white") {
			white.push(mark);
		} else if (race == undefined) {
			unknown.push(mark);
		} else {
			nonwhite.push(mark);
		}
		if (fatality == "Killed" || fatality == "killed") {
			death.push(mark);
		} else {
			survived.push(mark);
		}
		allCrime.push(mark);
	});

	var allCrimeMap = L.layerGroup(allCrime);
	var whiteMap = L.layerGroup(white);
	var otherMap = L.layerGroup(nonwhite);
	var fatalMap = L.layerGroup(death);
	var nonFatalMap = L.layerGroup(survived);

	var RaceMap = {
		"White": whiteMap,
		"Non-White": otherMap,
		"Race Unknown": unknown
	}

	var deathMap = {
		"Fatal Crime": fatalMap,
		"Non-Fatal Crime": nonFatalMap
	}

	L.control.layers(RaceMap, deathMap).addTo(map);
	allCrimeMap.addTo(map);

	document.getElementById("whiteMan").innerHTML = countWhiteMan;
	document.getElementById("nonWhiteMan").innerHTML = countNonWhiteMan;
	document.getElementById("whiteWoman").innerHTML = countWhiteWoman;
	document.getElementById("nonWhiteWoman").innerHTML = countNonWhiteWoman;
	// Be sure to add each layer to the map
	// Once layers are on the map, add a leaflet controller that shows/hides layers 
}