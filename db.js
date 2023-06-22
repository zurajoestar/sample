navigator.geolocation.getCurrentPosition(
   function (position) {
      initMap(position.coords.latitude, position.coords.longitude)
   },
   function errorCallback(error) {
      console.log(error)
   }
);
function initMap(lat, lng) {

   var myLatLng = {
      lat,
      lng
   };

   var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatLng
   });

   var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
   });
}