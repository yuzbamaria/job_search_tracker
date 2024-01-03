$(document).ready(function() {

    // DISPLAY MARKERS ON THE MAP
    let map;
    let markers = []; // Array to store markers
    let citiesArray = [];

    // Function to store the city list in local storage
    function storeCityList() {
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
                map.setZoom(6);
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

    $(function() {
        initMap();
    });


    // CREATES CARDS
    // Function to create a card based on user input
    function createCard(userInput, index) {
        // Get the card section
        const cardSection = document.getElementById('cardsCreation');

        // Create card container for each card
        const cardContainer = document.createElement('div');
        cardContainer.className = 'cardContainer col-lg-4 col-md-6 col-sm-9 p-3';
        cardContainer.dataset.cardIndex = index;

        // Create card elements
        const card = document.createElement('div');
        card.className = 'card align-items-center shadow';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center';

        const titleContainer = document.createElement('div');
        titleContainer.className = 'text-center mt-3';

        // Create and append card content
        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = userInput.position;
        // cardTitle.innerHTML = `<i class="fa-solid fa-clipboard-user"></i> ${userInput.position}`;

        const cardCompany = document.createElement('h6');
        cardCompany.className = 'card-text mb-2';
        cardCompany.textContent = userInput.company;

        const paragraphContainer = document.createElement('div');
        paragraphContainer.className = 'text-left mb-4';

        const cardLocation = document.createElement('p');
        cardLocation.className = 'card-text';
        cardLocation.innerHTML = ` <i class="fa-solid fa-location-arrow"></i> City: ${userInput.location}`;
        // `
        //     
        // 

        const cardType = document.createElement('p');
        cardType.className = 'card-text';
        cardType.innerHTML =  `<i class="fa-solid fa-house-laptop"></i> Job type: ${userInput.jobType}`;

        const cardStage = document.createElement('p');
        cardStage.className = 'card-text';
        cardStage.innerHTML = `<i class="fa-solid fa-stairs"></i> Job stage: ${userInput.jobStage}`;

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

    function populateIntialData() { //updated
        //upddated
        const cardsCreation = document.getElementById("cardsCreation"); //updated
        // Retrieve data from local storage and create cards
        let storedData = localStorage.getItem("userInputArray");
        let userInputArray;
        if (storedData) {
          userInputArray = JSON.parse(storedData);
          cardsCreation.innerHTML = ""; //updated
          // Iterate through userInputArray in reverse order and create cards
          for (let i = userInputArray.length - 1; i >= 0; i--) {
            createCard(userInputArray[i], i);
          }
        }
      }
      populateIntialData(); // updated
   
    // DELETE CARD BUTTON
    function deleteCard() {
        // Attach an event listener to a common parent element of the delete buttons
        $('#cardsCreation').on('click', '.deleteBtn', function () {
            // Identify the card to be deleted
            const cardContainer = $(this).closest('.cardContainer');
            // Retrieve the index from the data attribute
            const indexToRemove = cardContainer.data('cardIndex');
            console.log(indexToRemove);
            // Remove the card from the DOM
            cardContainer.remove();
            // Retrieve the current data from local storage
            storedData = localStorage.getItem('userInputArray');
            if (storedData) {
                // Parse the stored data into an array
                userInputArray = JSON.parse(storedData);
                // Remove the corresponding data from the array
                userInputArray.splice(indexToRemove, 1);
                // Update local storage with the modified array
                localStorage.setItem('userInputArray', JSON.stringify(userInputArray));
                populateIntialData();
            }
        });
    }
    deleteCard();
    
    // FILTERS

    function filterCards() {
        // Gets the selected values from the job type and job stage dropdowns 
        const jobTypeFilter = $('#jobTypeFilterBtn').val();
        const jobStageFilter = $('#jobStageFilterBtn').val();

        // Selects all elements with the class 'cardContainer'
        // The `each` function is used to perform a function for each element in the set.
        // Each is anonymous function that doesn't take any arguments, 
        // but it refers to the current element within the loop using $(this).
        $('.cardContainer').each(function () {
            // Gets the job type and job stage values from the data attributes of each card container
            const cardJobType = $(this).data('jobType');
            const cardJobStage = $(this).data('jobStage');

            // Checks if the card matches the selected filters
            const showCard = (
                // Checks if the job type filter is set to 'default' or matches the card's job type
                (jobTypeFilter === 'default' || cardJobType === jobTypeFilter) &&
                // Checks if the job stage filter is set to 'default' or matches the card's job stage
                (jobStageFilter === 'default' || cardJobStage === jobStageFilter)
            );

            // Shows or hides the card based on the filter using jQuery's css function 
            // $(selector).css(property('display), value(showCard))
            // and ternary operator (if-else (? :))
            $(this).css('display', showCard ? 'block' : 'none');
        });
    }

    // Adds event listeners to the filter buttons
    $('#jobTypeFilterBtn').change(filterCards);
    $('#jobStageFilterBtn').change(filterCards);

    // Calls filterCards initially to show the default state
    filterCards();
});