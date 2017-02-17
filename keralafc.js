// This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
	  
var directionsDisplay,
    directionsService,
    map;
var trafficLayer;
var infowindow;
// Varibles to used in getLocation():
var currentLatitude;
var currentLongitude;
var newcords = [];

var createMarker;
var userMarker1;

var markers =[];

var clearBar =[];

var myLatlng;

var flightPlanCoordinates = [];
var point;

var distance;


	  
$(document).ready(function(){
 $("#flip").click(function(){
        $("#wrapper").slideToggle("slow");
		$("#floating-panel, #floating-panel2, #floating-panel3").show(); 		
    });		
	
});

$(document).ready(function(){
 $("#wrapper").click(function(){
        $("#wrapper1").slideToggle("slow");
		 		
    });		
	
});
$(document).on('click','.close_box',function(){
    $(this).parent().remove();
});
  
//$('#floating-panel').draggable();


//var contentString = '<iframe title="YouTube video player" class="youtube-player" type="text/html" width="280" height="175" src="src="https://www.youtube.com/embed/XGSy3_Czz8k?autoplay=1" frameborder="0"></iframe>';	
	  
var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Video in Info Window</h1>' +
            '<div id="bodyContent">' +
            '<video width="320" height="240" controls>' +
            '<source src="http://corrupt-system.de/assets/media/sintel/sintel-trailer.m4v" type="video/mp4" />' +
            '<source src="http://corrupt-system.de/assets/media/sintel/sintel-trailer.webm" type="video/webm" />' + 
            '</video>' +
            '</div>' +
            '</div>';
			
var contentString1 = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Video in Info Window</h1>' +
            '<div id="bodyContent">' +
            '<p>Thi abfdf dsf</p>' +
            '</div>' +
            '</div>';
			
var contentString2 = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Video in Info Window</h1>' +
            '<div id="bodyContent">' +
            '<p>best this one</p>' +
            '</div>' +
            '</div>';
	
	// Standard google maps function
    function initialize() {
        var myLatlng = new google.maps.LatLng(-36.9111, 174.8820);
        var myOptions = {
            zoom: 14,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById("map"), myOptions);		
		
        TestMarker();

		
    }
	


    // Function for adding a marker to the page.
    function addMarker(location) {
        marker = new google.maps.Marker({
            position: location,
            map: map
        });	

		var infowindow = new google.maps.InfoWindow({	
	    content: contentString		

  }); 
  
  	marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
		
		
  
    }
	
	
	
	function myInfoWindow() {
	
	var myVid1 = document.getElementById("col1");
	var myStr1 = document.getElementById("col2");
	var myVid2 = document.getElementById("col3");
	var myStr2 = document.getElementById("col4");
	
	myVid1.onclick = function() {
     

  
	}

	myStr1.onclick = function() {     
	
	
  
	}
	
	myVid2.onclick = function() {
   
	 
	 
	}
	
	myStr2.onclick = function() {
     
	}
	
	
  }
	
	

    // Testing the addMarker function
    function TestMarker() {
	
	var ownerA = document.getElementById("col1").textContent;
	var ownerB = document.getElementById("col2").textContent;
	var ownerC = document.getElementById("col3").textContent;
	var ownerD = document.getElementById("col4").textContent;
	
	if(ownerA ==='Vinod'){
           CentralPark1 = new google.maps.LatLng(-36.911145, 174.882012);
           addMarker(CentralPark1);		   
		   }
		   
	 if(ownerB ==='Arun'){
           CentralPark2 = new google.maps.LatLng(-36.911787, 174.776076);
           addMarker(CentralPark2);		   
		   }
		   
	if(ownerC ==='Rajesh'){
           CentralPark3 = new google.maps.LatLng(-37.039679, 174.924102);
           addMarker(CentralPark3);		   
		   }
	if(ownerD ==='Simman'){
           CentralPark4 = new google.maps.LatLng(-36.916575, 174.715166);
           addMarker(CentralPark4);		   
		   }

   
    }
	
 
 
      function initAutocomplete() {
	  
	    var myLatlng = new google.maps.LatLng(-36.9111, 174.8820);
		  var myOptions = {
            zoom: 13,			
            center: myLatlng,
			icon: 'images/marker-icon.PNG',			
            mapTypeId: google.maps.MapTypeId.ROADMAP			
        }
		
        map = new google.maps.Map(document.getElementById("map"), myOptions); 
		
		// Search places was written here, now added as separate function searchByplaces().

		 directionsDisplay = new google.maps.DirectionsRenderer({ draggable: true });
		 directionsService = new google.maps.DirectionsService();
		 map;
		
		 map = new google.maps.Map(document.getElementById("map"), myOptions);
         directionsDisplay.setMap(map);
		 directionsDisplay.setPanel(document.getElementById("directions"));
		
		$("#routeMode").on("change", function() { calcRoute(); });
        $("#routeGo").on("click", function() { calcRoute(); });
        $("#routeClear").on("click", function() { directionsDisplay.setDirections({ routes: [] }); }); 			
		
		searchByplaces();
		
	
 }
 
 function calcRoute() {
    var request = {
        origin: $("#routeFrom").val(),
        destination: $("#routeTo").val(),
        travelMode: google.maps.TravelMode[$("#routeMode").val()]
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
			google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
           directions = directionsDisplay.getDirections();		   
		   // Display the duration:
             document.getElementById('floating-panel4').innerHTML += 
                response.routes[0].legs[0].duration.value + " seconds";
				
		  // Display the distance:
             document.getElementById('floating-panel5').innerHTML += 
                response.routes[0].legs[0].distance.value + " meters";

      })	
        }else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
	
	
function searchByplaces(){
	
	 // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
			  icon: 'images/starone.PNG',             
              title: place.name,
			  animation: google.maps.Animation.DROP,
			  draggable: true,
              position: place.geometry.location			  
            }));		
					

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
		  
        });	

			
	
}


function showTraffic() {
	
if (document.getElementById('showtraffic').checked === true) {

		trafficLayer = new google.maps.TrafficLayer();		
        trafficLayer.setMap(map);
		
} else {
	
	(document.getElementById('showtraffic').checked === false)
	trafficLayer.setMap(null);
	
}
		
		
}
  


$(document).ready(function(){	
    $("#flipscore").click(function(){
        $("#floating-panel7, #floating-panel8").slideToggle("slow");
    });
});



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(getCoordinates);
    } else { 
        alert("Sorry ! Geolocation is not supported by this browser");
    }
}

function getCoordinates(position) {
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude; 
    //alert(currentLongitude+" and "+currentLatitude);
	return {lat: currentLongitude, lon: currentLatitude};
}

getLocation();



function findMe() {	
	newcords = getLocation();
	
		userMarker1 = new google.maps.Marker({	
		position: {lat: currentLatitude, lng: currentLongitude},
		zoom: 13,
		icon:'images/pointer1.PNG',		
		title: "Vinod",
		draggable:true,
		map: map		
	});
	markers.push(userMarker1);		
	
	
	window.setInterval("changeMarkerPosition(userMarker1)", 6000);
	//changeMarkerPosition(userMarker1);	
	
	var request = {
    location: {lat: currentLatitude, lng: currentLongitude},
	radius: '5500',	
    types: ['restaurant']
  };
	infowindow = new google.maps.InfoWindow();
	places = new google.maps.places.PlacesService(map);
	places.nearbySearch(request, callback);

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
		  icon:'images/baricon1a.PNG',
		  animation: google.maps.Animation.DROP,
          position: place.geometry.location
        });
		clearBar.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
	
var contentStringVM = '<b>Vinod Mathew</b>'+'<br><img class="img-circle" src="images/VinM.PNG" "alt="Vinod">';
	var infowindow = new google.maps.InfoWindow({
    content: contentStringVM
  });
  
  userMarker1.addListener('click', function() {
	  content:'Vinod'
    infowindow.open(map, userMarker1);
  });

}


function changeMarkerPosition(userMarker1) {

var myLatlng = new google.maps.LatLng(currentLatitude, currentLongitude);
	map.panTo(new google.maps.LatLng(currentLatitude, currentLongitude ));
	userMarker1.setPosition(myLatlng);
	markers.push(userMarker1);
    flightPlanCoordinates[0] = new google.maps.LatLng({lat: currentLatitude, lng: currentLongitude});	
	
	for (var i = 1; i <= markers.length; i++) {
	
	 flightPlanCoordinates[i]= new google.maps.LatLng({lat: currentLatitude, lng: currentLongitude});	
	 
	  distance = google.maps.geometry.spherical.computeDistanceBetween (new google.maps.LatLng({lat: currentLatitude, lng: currentLongitude}), flightPlanCoordinates[i]);

         if (distance <= 0.2) { 
		
		return;

}
    var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#52b2f2',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });	
		
		flightPath.setMap(map);
	}		
    
}


function clearMarker(){
	
var clearBtn = document.getElementById("btnClr");
 for(var i=0; i< clearBar.length; i++) {
        clearBar[i].setMap(null);
    }	
	
}


function check(form) { /*function to check userid & password*/
                /*the following code checkes whether the entered userid and password are matching*/
                if(form.userid.value == "keralafc" && form.pswrd.value == "summer1234") {
                    window.open('KeralaFC.xlsx')/*opens the target page while Id & password matches*/
                }
                else {
                    alert("Error Password or Username")/*displays error message*/
                }
            }
			
			




