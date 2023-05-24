var slideIndex = 0;
carousel();

// carousel / slideshow
function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 2000); // Change image every 2 seconds
}

// for passing selected option to another page
function displaySelectedOption() {
  location.href = "db.html"; // go to another page
  var selectedOption = document.getElementById("options").value;
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