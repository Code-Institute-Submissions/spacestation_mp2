// ---------------------------------------- FUNCTION TO TOGGLE DARK AND LIGHT MODE - WWW.BOOTSTRAPTOGGLE.COM

$(function() {
    $('#mode-toggle').change(function() {
        let dark = $(this).prop('checked');
        if (dark == true) {
            $("#header").removeClass("headerfoot-light").addClass("headerfoot-dark");
            $("#logo").removeClass("headerfoot-light").addClass("headerfoot-dark");
            $("#toggle-p").removeClass("headerfoot-light").addClass("headerfoot-dark");
            $("#footer").removeClass("headerfoot-light").addClass("headerfoot-dark");
            $("#main").removeClass("main-light").addClass("main-dark");
            $("#main-container").removeClass("container-light").addClass("container-dark");
        } else {
            $("#header").removeClass("headerfoot-dark").addClass("headerfoot-light");
            $("#logo").removeClass("headerfoot-dark").addClass("headerfoot-light");
            $("#toggle-p").removeClass("headerfoot-dark").addClass("headerfoot-light");
            $("#footer").removeClass("headerfoot-dark").addClass("headerfoot-light");
            $("#main").removeClass("main-dark").addClass("main-light");
            $("#main-container").removeClass("container-dark").addClass("container-light");
        }

    })
  });


//   LEAFLET JS MAP SPACE CREATION
let myMap = L.map("worldMap", { minZoom: 1, maxZoom: 9}).setView([0,0],1);

   //   ADDING TILES TO THE MAP FROM MAPBOX.COM
 L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmFiaW9kZWFyYXVqbyIsImEiOiJja2I1aTkzcjcwcG50MnlwYml4Z2kyM3dpIn0.psit76bCm1AtS-ffHfX1Uw', {
    maxZoom: 18,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(myMap);

// CREATING A CUSTOM MARKER TO THE MAP
const issIcon = L.icon( {
    iconUrl: '/assets/img/iss200px.png',
    iconSize: [40,30],
    iconAnchor: [25,16],
})

let myMarker = L.marker([0,0], {icon: issIcon}).addTo(myMap);


// URL FOR API ISS LOCATION
let urlISS = "https://api.wheretheiss.at/v1/satellites/25544";

//   FETCHING THE DATA FROM JSON API - EXAMPLE CODE FROM dcode YOUTUBE CHANNEL - https://www.youtube.com/watch?v=5VCY9yCZnlc
function getIss() {
    fetch(urlISS).then(function(response) {
        
        return response.json();

    }).then(function(issData) {
        let latData = issData.latitude;
        let longData = issData.longitude;

        // DISPLAY LATITUDE AND LONGITUDE ON THE PAGE 
        $("#latValue").html(latData.toFixed(3));
        $("#longValue").html(longData.toFixed(3));

        // INCLUDE THE MARKER ON THE MAP
        myMarker.setLatLng([latData, longData]);

        // ZOOM IN TO THE LOCATION OF THE SPACE STATION 
        myMap.setView([latData, longData], 3);
       
    }).catch(function(error) {
        
        console.log("Something went wrong with retrieving data, please try again later");
        console.log(error);

    })
};

setInterval( function() {
    getIss()}, 2000);

