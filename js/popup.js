document.addEventListener("DOMContentLoaded", function () {
    var popupElement = document.getElementById('popup');

    window.map.on('click', function (event) {
        var feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
            return feature;
        });

        if (feature) {
            popupElement.style.display = 'block';
            var pixel = map.getPixelFromCoordinate(event.coordinate);
            popupElement.style.left = pixel[0] + 'px';
            popupElement.style.top = pixel[1] + 'px';

            if (feature === window.ankaraMarker) {
                popupElement.innerHTML = '<b>Burası Ankara!</b>';
            } else if (feature === window.userMarker) {
                popupElement.innerHTML = '<b>Şu an buradasınız!</b>';
            } else {
                popupElement.innerHTML = '<b>Buraya tıkladınız!</b>';
            }
        } else {
            popupElement.style.display = 'none';
        }
    });

    // Kullanıcı konumunda popup göstermek için GLOBAL hale getirildi
    window.showUserPopup = function (userLocation) {
        console.log("📌 Kullanıcı konumu bulundu: ", userLocation);
    };
});