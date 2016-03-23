var map_ids = ['map_canvas_seattle', 'map_canvas_israel'];
var map_color = "#759FE0";
var map_color_road = "#759FE0";
var map_styles = [
  {
    stylers: [
        {hue: map_color},
        {saturation: 75},
        {lightness: 5}
    ]
  },{
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
        {saturation: 20},
        {lightness: -70}
    ]
  },{
    featureType: "water",
    elementType: "geometry",
    stylers: [
        {saturation: -50},
        {lightness: 40}
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
        {hue: map_color},
        {saturation: -100},
        {lightness: 0}
    ]
  },{
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
        {hue: map_color_road},
        {saturation: 30},
        {lightness: 5}
    ]
  },{
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
        {saturation: 10},
        {lightness: 0}
    ]
  },{
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
        {saturation: 0},
        {lightness: 20}
    ]
  },{
    featureType: "transit",
    elementType: "geometry",
    stylers: [
        {hue: map_color},
        {saturation: 30},
        {lightness: -30}
    ]
  }
];

var map_markers = {
  map_canvas_seattle: 
    [
        {
            "title": "Ceremony & Reception",
            "latitude":47.735397,
            "longitude":-122.153380,
            "icon":"fa-bell-o", //Check the full list of icons at http://fortawesome.github.io/Font-Awesome/icons/
            "infoWindow":"Novelty Hill Januik Winery <br> 14710 Woodinville-Redmond Rd NE, Woodinville, WA 98072"
        },
        {
            "title": "Accommodation",
            "latitude":33.777929,
            "longitude":-118.076891,
            "icon":"fa-bed", //Check the full list of icons at http://fortawesome.github.io/Font-Awesome/icons/
            "infoWindow":"Accommodation 1 <br> Rossmoor, CA 90720"
        },
        {
            "title": "AirBnB Neighborhood Recommendation 1",
            "latitude":33.780428,
            "longitude":-118.084075,
            "icon":"fa-bed", //Check the full list of icons at http://fortawesome.github.io/Font-Awesome/icons/
            "infoWindow":"Accommodation 2 <br> Los Alamitos, CA 90720"
        },
        {
            "title": "AirBnB Neighborhood Recommendation 2",
            "latitude":33.777551,
            "longitude":-118.050468,
            "icon":"fa-bed", //Check the full list of icons at http://fortawesome.github.io/Font-Awesome/icons/
            "infoWindow":"Accommodation 3 <br> Seal Beach, CA 90740"
        },
        {
            "title": "Link Station UD",
            "latitude":47.650077,
            "longitude":-122.303804,
            "icon":"fa-subway", //Check the full list of icons at http://fortawesome.github.io/Font-Awesome/icons/
            "infoWindow":"U District Link Station"
        },
        {
            "title": "Link Station CH",
            "latitude":47.618534,
            "longitude":-122.320294,
            "icon":"fa-subway", //Check the full list of icons at http://fortawesome.github.io/Font-Awesome/icons/
            "infoWindow":"Capitol Hill Link Station"
        },
        {
            "title": "Link Station WL",
            "latitude":47.612003,
            "longitude":-122.335860,
            "icon":"fa-subway", //Check the full list of icons at http://fortawesome.github.io/Font-Awesome/icons/
            "infoWindow":"Westlake Link Station"
        },
        {
            "title": "Brunch",
            "latitude":47.698212,
            "longitude":-122.286021,
            "icon":"fa-home", //Check the full list of icons at http://fortawesome.github.io/Font-Awesome/icons/
            "infoWindow":"Or & Jeff's Place <br> 3843 NE 96th St, Seattle, WA, 98115"
        }
    ],
    map_canvas_israel: 
    [
        {
            "title": "חופה & קבלת פנים",
            "latitude":32.173628,
            "longitude":34.872408,
            "icon":"fa-bell-o", //Check the full list of icons at http://fortawesome.github.io/Font-Awesome/icons/
            "infoWindow":"מקום בלב <br> רדס משותף 5 רעננה"
        },
        {
            "title": "Accommodation",
            "latitude":33.777929,
            "longitude":-118.076891,
            "icon":"fa-bed", //Check the full list of icons at http://fortawesome.github.io/Font-Awesome/icons/
            "infoWindow":"Accommodation 1 <br> Rossmoor, CA 90720"
        }
    ]
};


Meteor.startup(function() {  
  GoogleMaps.load({key:'AIzaSyD-ohUCKOyQTmZ_AL5--SU6B30Nu77Edqg'});
  GoogleMaps.loadUtilityLibrary('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/richmarker/src/richmarker.js');
});



Template.seattleMap.helpers({
  mapOptions: {
      id:"map_canvas_seattle",            //The HTML "id" of the map canvas
      map_initial_zoom:11,                //The initial zoom when Google map loads
      map_initial_latitude:47.6758489,    //Google map initial Latitude. If "null", the latitude of the first marked will be used
      map_initial_longitude:-122.2741065  //Google map initial Longitude. If "null", the longitude of the first marked will be used
    }
});



Template.israelMap.helpers({
  mapOptions: {
      id:"map_canvas_israel",             //The HTML "id" of the map canvas
      map_initial_zoom:16,                //The initial zoom when Google map loads
      map_initial_latitude:32.1731523,    //Google map initial Latitude. If "null", the latitude of the first marked will be used
      map_initial_longitude:34.8770376    //Google map initial Longitude. If "null", the longitude of the first marked will be used
  }
});

Template.map.helpers({ 
  mapOptionsGenerator: function(options) {
    if (GoogleMaps.loaded()) {
      var myLatlng = new google.maps.LatLng(options.map_initial_latitude, options.map_initial_longitude);
      return {
        options: {
          center: myLatlng,
          zoom: options.map_initial_zoom,
          scrollwheel: false,
          panControl: false,
          mapTypeControl: false,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
          }
        },
        name: options.id
      };
    }
  }
});

Template.map.onCreated(function() {
  (function a (ids) {
    ids.forEach(function(id){
      GoogleMaps.ready(id, function(map) {
        var styledMap = new google.maps.StyledMapType(map_styles, {name: "Lilac"});
        map.instance.mapTypes.set('map_style', styledMap);
        map.instance.setMapTypeId('map_style');
  
        var createMarker = function (obj) {
            var lat = obj.latitude,
                lng = obj.longitude,
                icon = obj.icon,
                info = obj.infoWindow;

            var infowindow = new google.maps.InfoWindow({
                content: '<div class="infoWindow">' + info + '</div>'
            });

            var marker = new RichMarker({
                position: new google.maps.LatLng(lat, lng),
                map: map.instance,
                anchor: 8,
                anchorPoint: new google.maps.Point(0, -40),
                shadow: 'none',
                content: '<div class="marker"><i class="fa ' + icon + '"></i></div>'
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map.instance, marker);
            });
        };

        var i = 0;
        while (i < map_markers[id].length) {
            createMarker(map_markers[id][i]);
            i += 1;
        }
      });
    });
  })(map_ids);
}); 