$(document).ready(function() {

    let map;
    let markers = []; // Array to store markers
    let citiesArray = [];

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

            markers.push(marker);
          }
    
    // Select the "Search" button
    let searchBtn = $('#map-btn');
    let addAllMarkers;
    // Attach an event listener to the "Search" button
    searchBtn.on('click', function (e) {
        // Prevent the default form submission behavior
        e.preventDefault();
        // Retrieve the location value from local storage
        // let cityInput = $('#cityInput').val(); 
        let cityInput = localStorage.getItem('userInputArray');

        if (cityInput) {
            // Add the city to the array
            citiesArray = JSON.parse(cityInput);
            // citiesArray.push(cityInput);
            // Access the location property for each object in the array
            citiesArray.forEach((userInputArray) => {
                // Assume you want to log the location for each object
                console.log(userInputArray.location);
                addAllMarkers = userInputArray.location;
            });
            // Add a marker for the entered city
            // addMarkerForCity(cityInput);
            addMarkerForCity(addAllMarkers);
            // Store the updated city list in local storage
            storeCityList();

        }
    });

    // Function to store the city list in local storage
    function storeCityList() {
        localStorage.setItem('city-names', JSON.stringify(citiesArray));
    }

    function addMarkerForCity(city) {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': city }, function (results, status) {
            if (status === 'OK') {
                // Clone the template marker to create a new marker for this city
                let newMarker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: city
                });
                markers.push(newMarker); // Add the new marker to the array
                map.setCenter(results[0].geometry.location);
                map.setZoom(8);
            } else {
                alert('Geocode was not successful for ' + city + ': ' + status);
            }
        });
    }

    // Function to remove all markers from the map
    // function clearMarkers() {
    //     markers.forEach(function (marker) {
    //         marker.setMap(null);
    //     });
    //     markers = []; // Clear the markers array
    // }

    // $('#btn-displayAllMarkers').on('click', function () {
    //     clearMarkers(); // Clear existing markers before displaying all
    //     for (let j = 0; j < citiesArray.length; j++) {
    //         addMarkerForCity(citiesArray[j]);
    //     }
    // });
    
    // Function to create a card based on user input
    function createCard(userInput) {
        // Get the card section
        const cardSection = document.getElementById('testCardsCreation');

        // Create card container for each card
        const cardContainer = document.createElement('div');
        cardContainer.className = 'cardContainer col-lg-4 col-md-6 col-sm-9 p-3';

        // Create card elements
        const card = document.createElement('div');
        card.className = 'card align-items-center custom-card-border shadow';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const titleContainer = document.createElement('div');
        titleContainer.className =  'text-center mt-3';

        // Create and append card content
        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = userInput.position;

        const cardCompany = document.createElement('h6');
        cardCompany.className = 'card-text mb-2';
        cardCompany.textContent = userInput.company;

        const paragraphContainer = document.createElement('div');
        paragraphContainer.className = 'text-left mb-4';

        const cardLocation = document.createElement('p');
        cardLocation.className = 'card-text';
        cardLocation.innerHTML = `<i class="fa-solid fa-location-arrow"></i> ${userInput.location}`;

        const cardType = document.createElement('p');
        cardType.className = 'card-text';
        cardType.innerHTML = `<i class="fa-solid fa-house-laptop"></i> ${userInput.jobType}`;

        const cardStage = document.createElement('p');
        cardStage.className = 'card-text';
        cardStage.innerHTML = `<i class="fa-solid fa-clipboard-question"></i> ${userInput.jobStage}`;

        // Add data attributes for job type and job stage
        cardContainer.dataset.jobType = userInput.jobType;
        cardContainer.dataset.jobStage = userInput.jobStage;


        const seeJobButton = document.createElement('a');
        seeJobButton.href = userInput.posting;
        seeJobButton.className = 'btn btn-warning shadow';
        seeJobButton.textContent = 'See job posting';
        seeJobButton.target = "_blank";

        const deleteCardButton = document.createElement('button');
        deleteCardButton.className = 'btn btn-secondary m-2 shadow';
        deleteCardButton.id = 'deleteBtn';
        deleteCardButton.type = 'button';
        deleteCardButton.textContent = 'Delete card';

        // Append title elements to titleContainer
        titleContainer.appendChild(cardTitle);
        titleContainer.appendChild(cardCompany);

        // Append paragraphs to paragraphContainer
        paragraphContainer.appendChild(cardLocation);
        paragraphContainer.appendChild(cardType);
        paragraphContainer.appendChild(cardStage);
        // Append elements to the card body
        cardBody.appendChild(titleContainer);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardCompany);
        cardBody.appendChild(paragraphContainer);
        cardBody.appendChild(cardLocation);
        cardBody.appendChild(cardType);
        cardBody.appendChild(cardStage);
        cardBody.appendChild(seeJobButton);
        cardBody.appendChild(deleteCardButton);

        // Append card body to the card
        card.appendChild(cardBody);

        // Append card to cardContainer
        cardContainer.appendChild(card);
        // Append the card to the card container
        cardSection.appendChild(cardContainer);
    }

    // Retrieve data from local storage and create cards
    const storedData = localStorage.getItem('userInputArray');
    if (storedData) {
        const userInputArray = JSON.parse(storedData);

        // Iterate through userInputArray in reverse order and create cards
        for (let i = userInputArray.length - 1; i >= 0; i--) {
            createCard(userInputArray[i]);
        }
    }

    // Event listener for job type filter button
    $("#jobTypeFilterBtn").on("click", function() {
        filterCards("jobType", $(this).val().trim());
    });

    // Event listener for job stage filter button
    $("#jobStageFilterBtn").on("click", function() {
        filterCards("jobStage", $(this).val().trim());
    });

    // Filter cards based on the specified data attribute and value
    function filterCards(attribute, selectedValue) {
        $(".cardContainer").each(function() {
            const cardValue = $(this).data(attribute);
            if (selectedValue === "All" || cardValue === selectedValue) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    
   
    // function deleteCard() {
    //     // let deleteBtn = $('#deleteBtn');
    //     $(document).on('click', '#deleteBtn', function (e) {
    //         e.preventDefault();
    //         // Find the closest card container from the clicked delete button
    //         const cardContainer = $(this).closest('.cardContainer');
    //         // Remove the card container from the DOM
    //         cardContainer.remove();
    //     });
    // }
    // deleteCard()


    
    /* // When the page loads, display all cards that user created (get from localStorage)
    // Check if something exists in localStorage
    // Create a function to display job cards
    function displayJobCards() {
        // Retrieve jobCards array from localStorage and parse it
        let jobCardsFromLocalStorage = JSON.parse(localStorage.getItem('#job-cards'));
        // Log the parsed jobCards array to the console
        console.log(jobCardsFromLocalStorage);
    } */
    
});
    
    
    