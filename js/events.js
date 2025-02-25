let points = [];

window.map.on('click', function (event) {
    if (points.length < 2) {
        const coordinate = ol.proj.toLonLat(event.coordinate);
        points.push(coordinate);
        window.addMarkerForRoute(points);  // **Artık hata vermeyecek!**

        if (points.length === 2) {
            fetchRoute(points[0], points[1]);
        }
    }
});

document.getElementById("clearRoute").addEventListener("click", function () {
    points = [];
    window.routeMarkerLayer.getSource().clear();  // **Hata veren satır düzeltildi!**
    window.routeLayer.getSource().clear();
    map.getView().setCenter(ol.proj.fromLonLat([32.8597, 39.9334]));
    map.getView().setZoom(10);
});