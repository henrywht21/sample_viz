// Helper Functions

// Custom named function
function chooseColor(borough) {
    let color = "black";
  
    // Switch on borough name
    if (borough === "Brooklyn") {
      color = "yellow";
    } else if (borough === "Bronx") {
      color = "red";
    } else if (borough === "Manhattan") {
      color = "orange";
    } else if (borough === "Queens") {
      color = "green";
    } else if (borough === "Staten Island") {
      color = "purple";
    } else {
      color = "black";
    }
  
    // return color
    return (color);
  }
  
  function onEachFeature(feature, layer) {
    if ((feature.properties) && (feature.properties.neighborhood) && (feature.properties.borough)) {
      let popup = `<h1>${feature.properties.neighborhood}</h1><hr><h3>${feature.properties.borough}</h3>`;
      layer.bindPopup(popup);
    }
  }
  
  ///////////////////////////////////
  
  function createMap(data) {
    // STEP 1: Init the Base Layers
  
    // Define variables for our tile layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Step 2: Create the Overlay layers
    let geo_layer = L.geoJSON(data, {
      style: function (feature) {
        return {
          color: "black",
          fillColor: chooseColor(feature.properties.borough),
          fillOpacity: 0.5,
          weight: 1.5
        }
      },
      onEachFeature: onEachFeature
    });
  
    // Step 3: BUILD the Layer Controls
  
    // Only one base layer can be shown at a time.
    let baseLayers = {
      Street: street,
      Topography: topo
    };
  
    // Overlays that can be toggled on or off
    let overlayLayers = {
      Boroughs: geo_layer
    };
  
  
    // Step 4: INIT the Map
    let myMap = L.map("map", {
      center: [40.7128, -74.0059],
      zoom: 11,
      layers: [street, geo_layer]
    });
  
  
    // Step 5: Add the Layer Control filter + legends as needed
    L.control.layers(baseLayers, overlayLayers).addTo(myMap);
  }
  
  // gets the data and make map
  function doWork() {
    // Get the data url
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/nyc.geojson";
  
    // Make request using d3.json() to get the data
    d3.json(url).then(function (data) {
      // console.log(data);
      createMap(data);
    });
  }
  
  doWork();