
// for passing selected option to another page
function displaySelectedOption() {
  location.href = "db.html"; // go to another page
  // var selectedOption = document.getElementById("options").value;
  selectedOption = "Crowfoot North - 2202 Crowfoot Parade Parking, 2202 Crowfoot Parade, Calgary, AB T2N 1N4"
  sessionStorage.setItem("lastname", selectedOption);
}

// maps credit: https://happycoding.io/tutorials/google-cloud/maps/maps-markers
function createMap(){
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.127391312554295, lng: -114.20728872290304},
    zoom: 16
  });

  const trexMarker = new google.maps.Marker({
    position: {lat: 51.127391312554295, lng: -114.20728872290304},
    map: map,
    title: 'Crowfoot'
  });

    trexMarker.addListener("click", () => {
        displaySelectedOption();
      });
}