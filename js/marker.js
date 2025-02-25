document.addEventListener("DOMContentLoaded", function () {
    // Ankara Markerı
    window.ankaraMarker = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([32.8597, 39.9334])) 
    });

    var ankaraMarkerStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: '../img/circle.png',
            scale: 0.1
        })
    });

    ankaraMarker.setStyle(ankaraMarkerStyle);

    var vectorSource = new ol.source.Vector({
        features: [ankaraMarker]
    });

    window.vectorLayer = new ol.layer.Vector({ source: vectorSource });
    window.map.addLayer(vectorLayer);

    // Kullanıcı Konumu Markerı (Kapalı olamaz!)
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userLon = position.coords.longitude;
            var userLat = position.coords.latitude;

            var userLocation = ol.proj.fromLonLat([userLon, userLat]);

            window.userMarker = new ol.Feature({
                geometry: new ol.geom.Point(userLocation)
            });

            var userMarkerStyle = new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: '../img/people.png',
                    scale: 0.1
                })
            });

            userMarker.setStyle(userMarkerStyle);

            var userVectorSource = new ol.source.Vector({
                features: [userMarker]
            });

            window.userVectorLayer = new ol.layer.Vector({ source: userVectorSource });
            window.map.addLayer(userVectorLayer);

            showUserPopup(userLocation);
            map.getView().setCenter(userLocation);
            map.getView().setZoom(15);
        });
    }

    // **Markerları Aç/Kapat (Sadece Ankara markerı kapanır)**
    document.getElementById("showCityMarker").addEventListener("change", function () {
        if (this.checked) {
            map.addLayer(vectorLayer);
        } else {
            map.removeLayer(vectorLayer);
        }
    });
});