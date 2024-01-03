// Adds event listener to homepage Button to redirect to homepage
let homePageButton = $("#btn-start");

// console.log(homePageButton);
// console.log('click to go to homepage');

homePageButton.on("click", function (e) {
  e.preventDefault();
  // Redirects the user to the 'homepage.html' page
  location.href = "./homepage.html"
});

// Add event listener to dashboard button to redirect to dashboard
let dashboardButton = $("#btn-dashboard");

console.log(dashboardButton);
console.log('click to go to dashboard');

dashboardButton.on("click", function (e) {
  e.preventDefault();
  // Redirect the user to the 'dashboard.html' page
  location.href = "./dashboard.html"
});