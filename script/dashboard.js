$(document).ready(function() {

    let map;
    let markers = []; // Array to store markers
    let citiesArray = [];

    initMap();

    // Create a new Google Map and associate it with the HTML element with the ID 'map'
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            // Set the initial center of the map to the coordinates
            center: { lat: 51.50739669799805, lng: -0.12753255665302277 },
            zoom: 6,
        });
    }

    // Select the "map" button
    let showCompaniesOnMap = $('#map-btn');

    // Attach an event listener to the "Search" button
    showCompaniesOnMap.on('click', function (e) {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Scroll to the map section
        $('html, body').animate({
            scrollTop: $('#map-section').offset().top
        }, 1000);

        clearMarkers(); // Clear existing markers before displaying all

        // Retrieve the location value from local storage
        let cityInput = localStorage.getItem('userInputArray');

        if (cityInput) {
            const citiesArray = JSON.parse(cityInput);

            citiesArray.forEach((userInputArray) => {
                console.log(userInputArray.location);
                addMarkerForCity(userInputArray.location);
            });

            // Store the updated city list in local storage
            storeCityList();
        }
    });

    // Function to store the city list in local storage
    function storeCityList() {
        // Assuming you want to store the updated city list after adding markers
        // If not, you can omit this function
        localStorage.setItem('city-names', JSON.stringify(citiesArray));
    }

    function addMarkerForCity(city) {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: city }, function (results, status) {
            if (status === 'OK') {
                // Create a new marker for this city
                new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: city,
                });
                map.setCenter(results[0].geometry.location);
                map.setZoom(8);
            } else {
                alert('Geocode was not successful for ' + city + ': ' + status);
            }
        });
    }

    // Function to remove all markers from the map
    function clearMarkers() {
        // Remove all markers from the map
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
    }
 
    // Function to create a card based on user input
    function createCard(userInput) {
        // Get the card section
        const cardSection = document.getElementById('cardsCreation');

        // Create card container for each card
        const cardContainer = document.createElement('div');
        cardContainer.className = 'cardContainer col-lg-4 col-md-6 col-sm-9 p-3';

        // Create card elements
        const card = document.createElement('div');
        card.className = 'card align-items-center custom-card-border shadow';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const titleContainer = document.createElement('div');
        titleContainer.className = 'text-center mt-3';

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
        deleteCardButton.className = 'btn btn-secondary m-2 shadow deleteBtn';
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

    function deleteCard() {
        // Attach an event listener to a common parent element of the delete buttons
        $('#cardsCreation').on('click', '.deleteBtn', function () {
            // Identify the card to be deleted
            const cardContainer = $(this).closest('.cardContainer');
            // Remove the card from the DOM
            cardContainer.remove();

            // Retrieve the current data from local storage
            storedData = localStorage.getItem('userInputArray');
            if (storedData) {
                // Parse the stored data into an array
                userInputArray = JSON.parse(storedData);
                // Identify the index of the card's data in the array
                const indexToRemove = cardContainer.parent().children('.cardContainer').index(cardContainer);
                console.log(indexToRemove);
                // Remove the corresponding data from the array
                userInputArray.splice(indexToRemove, 1);
                // Update local storage with the modified array
                localStorage.setItem('userInputArray', JSON.stringify(userInputArray));
            }
        });
    }
    deleteCard();

    // Retrieve data from local storage and create cards
    let storedData = localStorage.getItem('userInputArray');
    let userInputArray;
    if (storedData) {
        userInputArray = JSON.parse(storedData);

        // Iterate through userInputArray in reverse order and create cards
        for (let i = userInputArray.length - 1; i >= 0; i--) {
            createCard(userInputArray[i]);
        }
    }

    // Event listener for job type filter button
    // $("#jobTypeFilterBtn").on("click", function() {
    //     filterCards("jobType", $(this).val().trim());
    // });

     // Event listener for job type filter button
     $("#jobTypeFilterBtn").on("change", function() {
        // Get the selected job type
        const selectedJobType = $(this).val();

        // Filter cards based on the selected job type
        filterCards("jobType", selectedJobType);
    });

    // Event listener for job stage filter button
    // $("#jobStageFilterBtn").on("click", function() {
    //     filterCards("jobStage", $(this).val().trim());
    // });

    // Filter cards based on the specified data attribute and value
    function filterCards(attribute, selectedValue) {
        console.log("Filtering cards:", attribute, selectedValue);
        $(".cardContainer").each(function() {
            const cardValue = $(this).data(attribute);
            console.log("Card value:", cardValue);

            if (cardValue !== undefined) {
                console.log("Card value is defined");
    
                if (selectedValue === "default" || cardValue === selectedValue) {
                    console.log("Showing card");
                    $(this).show();
                } else {
                    console.log("Hiding card");
                    $(this).hide();
                }
            } else {
                console.log("Card value is undefined");
                // Handle the case when cardValue is undefined (optional)
            }
        });
    }

 
});
    
    
    