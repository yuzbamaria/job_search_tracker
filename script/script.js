
$(document).ready(function () {
    let startBtn = $('#btn-start');
console.log(startBtn);
    // Add event listener to the button Start Journey to link index file to home page
    startBtn.on('click', function (e) {
        e.preventDefault();
        // Redirect the user to the 'homepage.html' page
        window.location.pathname = '../homepage.html' 
    });
});