var currentPosition; // global variable for current position

// ******************************** GET CURRENT ADDRESS ****************************************************************
navigator.geolocation.getCurrentPosition(
   function(position) {
      var origin = position.coords.latitude + "," + position.coords.longitude;
      var destination = "141 Crowfoot Way NW"; // desired destination address
      currentPosition = position; // Store the position in the global variable

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat: position.coords.latitude, lng: position.coords.longitude } }, function(results, status) {
         if (status === "OK") {
            if (results[0]) {
               var currentAddress = results[0].formatted_address;
               document.getElementById("currentAddress").textContent = "Current Address: " + currentAddress;
               calculateDistance(origin, destination); // Calculate distance to current Station
               calculateDistancesToOtherLocations(origin); // Calculate distances to other locations
            } else {
               console.log("No results found");
            }
         } else {
            console.log("Geocoder failed due to: " + status);
         }
      });
   },
   function errorCallback(error) {
      console.log(error);
   }
);



// ******************************** MATRIX API CALCULATE DISTANCE+DURATION *********************************************
function calculateDistance(origin, destination) {
   var service = new google.maps.DistanceMatrixService();
   service.getDistanceMatrix(
      {
         origins: [origin],
         destinations: [destination],
         travelMode: "DRIVING"
      },
      function(response, status) {
         if (status === "OK") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;

            document.getElementById("distance").innerHTML = "Distance: " + distance;
            document.getElementById("duration").innerHTML = "Duration: " + duration;

            var map = new google.maps.Map(document.getElementById("map"), {
               zoom: 10,
               center: { lat: 0, lng: 0 }
            });

            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);

            var request = {
               origin: origin,
               destination: destination,
               travelMode: "DRIVING",
               provideRouteAlternatives: true // Request alternate routes, DOESN'T WORK
            };

            directionsService.route(request, function(result, status) {
               if (status === "OK") {
                  directionsDisplay.setDirections(result);
               }
            });
         } else {
            console.log("Error: " + status);
         }
      }
   );
}



// ******************************** REDIRECT TO GOOGLEMAPS.COM WEBSITE *************************************************
function redirectToOfficialWebsite() {
   if (currentPosition) {
      var origin = currentPosition.coords.latitude + "," + currentPosition.coords.longitude;
      var destination = "141 Crowfoot Way NW";
      var url = "https://www.google.com/maps/dir/" + origin + "/" + destination;
      window.location.href = url;
   }
}


// ******************************** OTHER LOCATIONS ********************************************************************

function calculateDistancesToOtherLocations(origin) {
   var destinations = [
      "889 - 36 Street NE", //malborough
      "69 Street Station", //69
      "17100 - 6 Street SW", //somerset
      "3801 - 36 Street NE" //whitehorn
   ]; // List of destination addresses

   var service = new google.maps.DistanceMatrixService();
   service.getDistanceMatrix(
      {
         origins: [origin],
         destinations: destinations,
         travelMode: "DRIVING"
      },
      function(response, status) {
         if (status === "OK") {
            var distances = response.rows[0].elements;
            for (var i = 0; i < destinations.length; i++) {
               var distance = distances[i].distance.text;
               document.getElementById("distance-" + i).textContent = "Distance: " + distance;
            }
         } else {
            console.log("Error: " + status);
         }
      }
   );
}
