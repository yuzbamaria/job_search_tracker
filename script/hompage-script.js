// Ninjas

const apiKey = "GN3fBk50uO/Bo4r+mFcxFA==q2Wkb58IWKjctbbi";

const button = $(".btn");
const container = $(".container-quote");


// Function to fetch and display a quote
function fetchAndDisplayQuote() {
  fetch("https://api.api-ninjas.com/v1/quotes?category=inspirational", {
    headers: {
      "X-Api-Key": apiKey,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      // Assuming the API response has a 'results' property
      // console.log(data[0].quote);
      // console.log(data);

      // Creating the element
      var headerEL = $("<div>")
      var h2El = $("<h2>");
      var pEl = $("<p>");
      var citeEl = $("<cite>")
      const divEl = $("<div>");
      

      // adding the attributes or class
      headerEL.addClass("card-header");
      h2El.addClass("blockquote","mb-3");
      pEl.addClass("blockquote-footer", "mb-3")
      container.addClass("shadow")

      // Adding text
      headerEL.text(data[0].category);
      h2El.text(data[0].quote);
      citeEl.text(data[0].author);


      // Append to the respective element
      pEl.append(citeEl)
      container.append(divEl);
      // container.append(headerEL);
      divEl.append(h2El);
      divEl.append(pEl);
    })
    .catch((error) => console.error("Error fetching or parsing data:", error));
}

// Setting an interval for auto-reload (e.g., every 1 min =  60 * 1000)
var time = 60 * 1000;
var reloadInterval = setInterval(autoReload, time);

// Auto-reload function
function autoReload() {
  // It will empty the container prior to adding the new quote
  container.empty();
  // Fetch and display a new quote
  fetchAndDisplayQuote();
}
$(document).ready(function () {
  autoReload();
});
// Function to handle form submission
function submitForm() {
  var isEmpty = false;

  // Capturing the latest value of the input after clicking the submit button
  const positionValue = $("#position").val();
  const companyValue = $("#company-name").val();
  const locationValue = $("#job-location").val();
  const postingValue = $("#job-posting").val();

  // Checking if any of the form fields are empty
  $(".form-control").each(function () {
    if ($(this).val().trim() === "") {
      isEmpty = true;
      return false; // This will exit the loop if any input field is empty
    }
  });

  if (isEmpty) {
    $("#myModal").modal("show");
    closeBtn();
  } else {
    // If none of the input fields are left empty, a success message will populate
    console.log("Form submitted successfully");
    // Set the local storage when the form is submitted successfully
    localStorage.setItem("position", positionValue);
    localStorage.setItem("company", companyValue);
    localStorage.setItem("location", locationValue);
    localStorage.setItem("posting", postingValue);

    // Show the success alert modal
    $("#mySuccessModal").modal("show");
    closeBtn();

    console.log(localStorage.getItem("position"));
  }
}

// Event handler for key press
$(".form-control").on("keyup", function (event) {
  if (event.key === "Enter") {
    submitForm();
  }
});

// Event handler for submit button
$("#submit-button").on("click", function () {
  submitForm();
});

// Event listener for the clear button
$("#clear-button").on("click", function () {
  // Clear all the input fields
  $(".form-control").val("");
});

// Function for closeBtn
function closeBtn() {
  // Event handler for modal close button click
  $(".btn-secondary").on("click", function () {
    $("#myModal").modal("hide");
    $("#mySuccessModal").modal("hide");
  });
}
