// Seçilen noktalar için marker ekleme
window.addMarkerForRoute = function (points) {
    var features = points.map(function (point) {
        return new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(point))
        });
    });

    var markerStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: '../img/pin.png',
            scale: 0.1
        })
    });

    features.forEach(feature => feature.setStyle(markerStyle));

    // **Global routeMarkerLayer kullanıldı!**
    window.routeMarkerLayer.getSource().clear();
    window.routeMarkerLayer.getSource().addFeatures(features);
};

// Rota çizme ve haritayı rotaya odaklama
function drawRoute(routeCoords) {
    var routeFeature = new ol.Feature({
        geometry: new ol.geom.LineString(routeCoords)
    });

    var routeStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'blue',
            width: 4
        })
    });

    routeFeature.setStyle(routeStyle);
    window.routeLayer.getSource().clear();
    window.routeLayer.getSource().addFeature(routeFeature);

    // **Rota çizildikten sonra haritayı rotaya zoom yap!**
    var extent = window.routeLayer.getSource().getExtent();
    
    // **Extent'in boş olup olmadığını kontrol et**
    if (!ol.extent.isEmpty(extent)) {
        map.getView().fit(extent, { padding: [50, 50, 50, 50] });
    } else {
        console.warn("Rota için geçerli bir extent bulunamadı.");
    }
}

// OpenRouteService API ile rota alma
function fetchRoute(start, end) {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${start[0]},${start[1]}&end=${end[0]},${end[1]}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.features || data.features.length === 0) {
                alert("Rota alınamadı!");
                return;
            }

            const coordinates = data.features[0].geometry.coordinates;
            const routeCoords = coordinates.map(coord => ol.proj.fromLonLat([coord[0], coord[1]]));

            drawRoute(routeCoords);
        });
}