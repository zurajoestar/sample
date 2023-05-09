function displaySelectedOption() {
  // Get the selected option from the dropdown
  var selectedOption = document.getElementById("options").value;
  // Set the selected option text in the main content
  var selectedOptionText = document.getElementById("selectedOptionText");
  selectedOptionText.innerHTML = selectedOption + " is selected";
}
