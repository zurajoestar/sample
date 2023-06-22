navigator.geolocation.getCurrentPosition(
   function(position) {
      var origin = position.coords.latitude + "," + position.coords.longitude;
      var destination = "141 Crowfoot Way NW"; // desired destination address

      // Reverse geocoding to get the current address:
      // https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat: position.coords.latitude, lng: position.coords.longitude } }, function(results, status) {
         if (status === "OK") {
            if (results[0]) {
               var currentAddress = results[0].formatted_address;
               document.getElementById("currentAddress").textContent = "Current Address: " + currentAddress;
            } else {
               console.log("No results found");
            }
         } else {
            console.log("Geocoder failed due to: " + status);
         }
      });

      calculateDistance(origin, destination);
   },
   function errorCallback(error) {
      console.log(error);
   }
);



    function calculateDistance(origin, destination) {


      // ********************************* call distance matrix api ****************************************************
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

            // ****************************** call distance api *************************************************
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);

            var request = {
              origin: origin,
              destination: destination,
              travelMode: "DRIVING",
              provideRouteAlternatives: true // Request alternate routes
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
    calculateDistance();