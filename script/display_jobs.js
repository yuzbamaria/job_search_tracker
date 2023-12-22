$(document).ready(function() {

    let map;
    let marker;
        
    initMap();
    
    // Create a new Google Map and associate it with the HTML element with the ID 'map'
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
        // Set the initial center of the map to the coordinates 
            center: {lat: 51.50739669799805, lng: -0.12753255665302277},
            zoom: 12
        });
        // Create a new marker on the map with the specified position and title
        marker = new google.maps.Marker({
            // Set the position of the marker to the same coordinates as the initial map center
            position: {lat: 51.50739669799805, lng: -0.12753255665302277},
            // Associate the marker with the map created above
            map: map,
            // Set a title for the marker, displayed when the user hovers over it
            title: 'My location'
            });
          }
        
        // When a user clicks the "Show on map" button 
        // after entering a city name in the #cityInput field, 
        // the addMarkerForCity function is called with the entered city name, 
        // and it attempts to geocode the city, update the marker on the map, 
        // and adjust the map's center and zoom level accordingly. 
        // If the user hasn't entered a city name, an alert is displayed prompting them to do so.
    
        // Select "Show on map" button
        // let searchBtn = $('#search-button');
        //  Create an event listener attached to the "Show on map" button 
        // This event listener listens for a click on the button and calls 
        // the addMarkerForCity function with the value of the 
        // #cityInput field as an argument
        // searchBtn.on('click', function(e){
        //     e.preventDefault();
            // Retrieve the value entered in the #cityInput field
            // let cityInput = $('#cityInput').val();
            // Check if user entered a city
            // if (cityInput) {
                // Call the addMarkerForCity function and pass the entered city name (cityInput) 
                // as an argument to the function
        //         addMarkerForCity(cityInput);
        //       } else {
        //         alert('Please enter a city before searching.');
        //       }
        // });
    
        // function addMarkerForCity(city) {
        //     // Create a new Geocoder object from the Google Maps API
        //     let geocoder = new google.maps.Geocoder();
        //     // Use the Geocoder to convert the city name into geographic coordinates
        //     geocoder.geocode({'address': city}, function(results, status) {
        //     // Check if the geocoding operation was successful
        //     if (status === 'OK') {
        //         // Update the position of the existing marker on the map to the geocoded location
        //         // marker = new google.maps.Marker({
        //         marker.setPosition(results[0].geometry.location);
        //         // Center the map on the new marker position
        //         map.setCenter(results[0].geometry.location);
        //         // Set the zoom level of the map to 14 (you may adjust this value)
        //         map.setZoom(12);
        //         // map: map,
        //         // position: results[0].geometry.location,
        //         // title: city
        //     } else {
        //         alert('Geocode was not successful for the following reason: ' + status);
        //     }
        //     });
        // }
    
    });
    
    
    