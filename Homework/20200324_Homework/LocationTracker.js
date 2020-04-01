window.onload = init;

// current location
var latitude, longitude;

// Google map
var map = null;

// Path
var path = [];

var lastMarker = null;

// monitor the number of iterations
let updateNumber = 0;

// register the event handler for the button

function init() {

    var startButton = document.getElementById("startButton");
    startButton.onclick = handleStart;

}

function handleStart() {
    // check to ensure the button is disabled
    let startButton = document.getElementById("startButton")
    if(!startButton.disabled) {
        // Wait until the Start button is clicked to grab the first location
        getLocation()
        startButton.disabled = true;
    }
    setInterval(updateMyLocation, 5000)
}

function updateMyLocation() {
    // Increament the counter and update the element
    updateNumber += 1
    document.getElementById("updateNumber").innerHTML = `Update#: ${updateNumber}`
    // Draw a new path using the already existing function
    showSamplePath()
}

function getLocation() {
    
    // asynchronous call with callback success, 
    // error functions and options specified
    
    var options = {
        enableHighAccuracy : true,
        timeout : 50000,
        maximumAge : 0
    };
    
    navigator.geolocation.getCurrentPosition(
        displayLocation, handleError, options);
}

function displayLocation(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    document.getElementById("startLatitude").innerHTML = 
            "Start Latitude: " + latitude;
    document.getElementById("startLongitude").innerHTML = 
            "Start Longitude: " + longitude;
    document.getElementById("currLatitude").innerHTML = 
            "Current Latitude: " + latitude;
    document.getElementById("currLongitude").innerHTML = 
            "Current Longitude: " + longitude;
            
    // Show the google map with the position  
    showOnMap(position.coords);
}

function handleError(error) {
    switch(error.code) {
        case 1:
            updateStatus("The user denied permission");
            break;
        case 2:
            updateStatus("Position is unavailable");
            break;
        case 3:
            updateStatus("Timed out");
            break;
    }
}

function updateStatus(message) {
    document.getElementById("status").innerHTML = 
        "<strong>Error</strong>: " + message;
}

// initialize the map and show the position
function showOnMap(pos) {
    
    var googlePosition = 
        new google.maps.LatLng(pos.latitude, pos.longitude);
    
    var mapOptions = {
        zoom: 15,
        center: googlePosition,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var mapElement = document.getElementById("map");
    map = new google.maps.Map(mapElement, mapOptions);
    
    // add the marker to the map
    var title = "Location Details";
    var content = "Lat: " + pos.latitude + 
                    ", Long: " + pos.longitude;
                    
    addMarker(map, googlePosition, title, content);
}

// add position marker to the map
function addMarker(map, latlongPosition, title, content) {
   
    var options = {
        position: latlongPosition,
        map: map,
        title: title,
        clickable: true
    };
    var marker = new google.maps.Marker(options);

    var popupWindowOptions = {
        content: content,
        position: latlongPosition
    };

    var popupWindow = new google.maps.InfoWindow(popupWindowOptions);

    google.maps.event.addListener(marker, 'click', function() {
        popupWindow.open(map);
    });
    
    return marker;
}

function showSamplePath()
{
    path = [];
  
  // first point  
    var latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);
  
    latitude += Math.random() / 100;
    longitude -= Math.random() / 100;
    
  // next point
    latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);

    document.getElementById("currLatitude").innerHTML = 
            "Current Latitude: " + latitude;
    document.getElementById("currLongitude").innerHTML = 
            "Current Longitude: " + longitude;
  
  
    var line = new google.maps.Polyline({
        path : path,
        strokeColor : '#0000ff',
        strokeOpacity : 1.0,
        strokeWeight : 3
    });
    line.setMap(map);

    map.panTo(latlong);

    if (lastMarker)
        lastMarker.setMap(null);
    // add the new marker
    lastMarker = addMarker(map, latlong, "Your new location", "You moved to: " + latitude + ", " + longitude);
}





















