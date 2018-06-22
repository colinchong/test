// Startup locations array
var locations = [{
        title: 'AppDirect',
        type: "Software",
        placeid: 'ChIJ19t7jA1vcVMRIk1Fa9Rj3cQ',
        location: {
            lat: 51.039786,
            lng: -114.059004
        }
    },
    {
        title: 'Benevity',
        type: "Software",
        placeid: 'ChIJtUiovwJwcVMRBCqAUqr-Ed4',
        location: {
            lat: 51.051621,
            lng: -114.051017
        }
    },
    {
        title: 'Solium',
        type: "Software",
        placeid: 'ChIJsTbbQ-RvcVMRLM6mov1GkBs',
        location: {
            lat: 51.051060,
            lng: -114.074346
        }
    },
    {
        title: 'Orpyx',
        type: "Hardware",
        placeid: 'ChIJ0aHEWKB6cVMRFNuDxfEaGp8',
        location: {
            lat: 51.063887,
            lng: -113.992041
        }
    },
    {
        title: 'Chaordix',
        type: "Software",
        placeid: 'ChIJU1391ANwcVMRKJLsLcaGgas',
        location: {
            lat: 51.041996,
            lng: -114.060321
        }
    },
    {
        title: 'Kudos',
        type: "Software",
        placeid: 'ChIJb9wq06V6cVMRurUFv8BwxNM',
        location: {
            lat: 51.036543,
            lng: -114.034802
        }
    },
    {
        title: 'Smart Technologies',
        type: "Hardware",
        placeid: 'ChIJtW4SCxFvcVMRHkncVDvxH5o',
        location: {
            lat: 51.086820,
            lng: -114.137742
        }
    },
    {
        title: 'Absorb Software',
        type: "Software",
        placeid: 'ChIJ4c6I215lcVMRJsy36yN5jN0',
        location: {
            lat: 51.042603,
            lng: -114.038809
        }
    },
    {
        title: 'Calgary Scientific',
        type: "Software",
        placeid: 'ChIJHVkdjKZ6cVMRmJi9GoODQA8',
        location: {
            lat: 51.035948,
            lng: -114.036634
        }
    }
];

// Knockout View Model
var CompaniesModel = function() {
    var self = this;

    // Initialize array options for filtering the list view and markers
    self.companyTypes = ['All', 'Software', 'Hardware'];

    // Initialize companies array and add from company locations
    self.companyLocations = ko.observableArray([]);

    // Constructor for companies
    var Company = function(data) {
        this.title = data.title;
        this.type = data.type;
        this.marker = data.marker;
        this.filtered = ko.observable(true);
    };

    // Initialize the companySelect as "All" to set default of all list items and markers showing upon load
    self.companySelect = ko.observable(self.companyTypes[0]);

    // Push all locations to companyLocations array
    locations.forEach(function(location) {
        self.companyLocations.push(new Company(location));
    });

    // Filter selected company type and change visibility of markers and list
    self.filterCompanies = ko.computed(function() {
        for (var i = 0; i < self.companyLocations().length; i++) {
            if (self.companySelect() === self.companyTypes[0]) {
                self.companyLocations()[i].filtered(true);
                if (marker === true) {
                    self.companyLocations()[i].marker.setVisible(true);
                }
            } else if (self.companySelect() !== self.companyLocations()[i].type) {
                self.companyLocations()[i].filtered(false);
                self.companyLocations()[i].marker.setVisible(false);
            } else {
                self.companyLocations()[i].filtered(true);
                self.companyLocations()[i].marker.setVisible(true);
            }
        }
    });

    //  Open infoWindow on list item click
    self.openWindow = function(place) {
        google.maps.event.trigger(place.marker, 'click');
        $('.modal').modal('close');
    };
};

// Initialize select element filter
$(document).ready(function() {
    $('select').formSelect();
});

// Initialize bottom sheet list modal
$(document).ready(function() {
    $('.modal').modal();
});

// Global Google Maps auth error detection
function gm_authFailure() {
    console.log("Google Maps auth error");
}

// Create view model for initialization
var cm = new CompaniesModel();

// Global Google Map variables
var map;
var marker;
var markers = [];

// Initiaize Google Map centered around Calgary, Canada
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 51.046,
            lng: -114.069
        },
        zoom: 11,
        styles: [{
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#2f78ab"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ]
    });

    // Initialize infowindow and set bounds
    var infoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    // Add markers from company locations
    for (i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            placeid: locations[i].placeid,
            lat: locations[i].location.lat,
            lng: locations[i].location.lng,
            animation: google.maps.Animation.DROP
        });
        cm.companyLocations()[i].marker = marker;
        bounds.extend(marker.position);
        // Add infowindow on click
        marker.addListener('click', function() {
            map.panTo(marker.getPosition());
            viewCompanyData(this, infoWindow);
        });
        // Fit markers on screen
        map.fitBounds(bounds);
    }
    // Populate infowindow with company information
    var viewCompanyData = function(marker, infowindow) {
        // Centers view of markers clicked
        map.setCenter(marker.getPosition());

        //Retrieves data from Google Places API
        var service = new google.maps.places.PlacesService(map);
        service.getDetails({
            placeId: marker.placeid
        }, function(place) {
            // Fetch OpenWeatherMap current conditions
            fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + marker.lat + '&lon=' + marker.lng + '&appid=49453884acec96fa40b64a87a3a7d068&units=metric')
                .then(response => response.json())
                .then(data => {
                    // Add Google Places and OpenWeatherMap Local Data to infowindow
                    infowindow.setContent('<div> <strong>' + place.name + '</strong><br>' + place.formatted_address + '<br>Current temp: ' + data["main"]["temp"] + '°C </div>');
                })
                .catch(function(error) {
                    console.log('There is an error with your fetch: ', error.message);
                });
        });

        // Launch infowindow
        infowindow.open(map, marker);
        // Bounce marker twice
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 1400);
        }
        // Close infowindow if clicking away
        google.maps.event.addListener(map, 'click', function() {
            infowindow.close();
            infowindow.setMarker = null;
        });

        // Clears infowindow prior to filtering
        document.getElementById("filter").addEventListener("click", function() {
            infowindow.close();
            infowindow.setMarker = null;
        });
    };
}

// Apply bindings
ko.applyBindings(cm);
