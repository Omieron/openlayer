const osmLayer = new ol.layer.Tile({ source: new ol.source.OSM() });
const esriLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    })
});

// Harita Başlatma
window.map = new ol.Map({
    target: 'map',
    layers: [osmLayer],
    view: new ol.View({
        center: ol.proj.fromLonLat([32.8597, 39.9334]),
        zoom: 10
    })
});

window.markerLayer = new ol.layer.Vector({ source: new ol.source.Vector() });
window.routeLayer = new ol.layer.Vector({ source: new ol.source.Vector() });
window.routeMarkerLayer = new ol.layer.Vector({ source: new ol.source.Vector() }); 

map.addLayer(markerLayer);
map.addLayer(routeLayer);
map.addLayer(routeMarkerLayer); 

document.getElementById("mapStyle").addEventListener("change", function () {
    const selectedLayer = this.value === "osm" ? osmLayer : esriLayer;
    map.getLayers().setAt(0, selectedLayer);
});