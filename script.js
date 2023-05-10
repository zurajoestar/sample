var slideIndex = 0;
carousel();

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

function displaySelectedOption() {
  // Get the selected option from the dropdown
  var selectedOption = document.getElementById("options").value;
  // Set the selected option text in the main content
  var selectedOptionText = document.getElementById("selectedOptionText");
  selectedOptionText.innerHTML = selectedOption + " is selected";
}

