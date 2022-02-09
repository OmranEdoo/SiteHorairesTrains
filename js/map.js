const centre_lat = 48.850829615512964; 
const centre_lng = 2.3453325726123047;

const map = create_map(centre_lat, centre_lng);

let zone = L.circle([centre_lat, centre_lng], 0);
let markers = [];

var res = "";

function buildInfos(value, direction, ligne, times) {
    if(times[0]){
        res = res.concat(value.name, " > ", direction, " <b class='num ", ligne,"'></b><img src='' alt='' class='picto ", ligne, "'>", "<p>   Prochain train: ", convert_time(times[0].date_time), "</p>");
    }
    if(times[1]){
        res = res.concat("<p>  Suivant: ", convert_time(times[1].date_time), "</p>");
    }
    return res;
}

function writeInfos(value){
    res = "";
    map.setView(value.coord, 17);
    path = {
        coverage: "fr-idf",
        stop_areas: value.id
    };

    feature = "terminus_schedules";

    request = new Request(path, feature, parameters);
    url = request.getUrl();
    token = request.getKey();

    headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(token + ':'));

    fetch(url, {headers: headers})
        .then(response => response.json())
        .then(data => {
            data.terminus_schedules.forEach(elt => {
                let infos = document.getElementById("infos");
                let edi = elt.display_informations;
                infos.innerHTML = "<p id='titre'>".concat(value.name.toUpperCase(), "</p>");
                infos.innerHTML = infos.innerHTML + buildInfos(value, edi.direction, edi.label, elt.date_times);
                drawPicto(edi); //picto_adders.js
            });
        })
}

function foundStation(e){
    zone.setRadius(1000);
    zone.setLatLng(e.latlng);
    zone.addTo(map);
    console.log(markers);
    markers.forEach(marker => {
        if(marker){
            map.removeLayer(marker);
        }
    })
    path = {
        coverage: "fr-idf",
        coord: e.latlng.lng.toString().concat(";", e.latlng.lat.toString())
    };

    feature = "stop_areas";

    parameters = {
        count: 100,
        distance: 1000
    };

    request = new Request(path, feature, parameters);
    url = request.getUrl();
    token = request.getKey();

    headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(token + ':'));
    
    fetch(url, {headers: headers})
        .then(response => response.json())
        .then(data => {
            Object.entries(data.stop_areas).forEach(([key, value]) => {                
                let icon = L.icon({
                    iconUrl: '../img/picto/train.png',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                });

                marker = L.marker(value.coord, {icon: icon}).addTo(map).on('click', function(e){
                    writeInfos(value);
                })
            markers.push(marker);
        })
    })
}

map.addEventListener('click', foundStation);