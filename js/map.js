const map = create_map();

let zone = L.circle([centre_lat, centre_lng], 0);
let markers = [];

var res = "";

function buildInfos(direction, ligne, times) {
    if(times[0]){
        res = res.concat(value.name, " > ", direction, " <b class='num ", ligne,"'></b><img src='' alt='' class='picto ", ligne, "'>", "<p>   Prochain train: ", convert_time(times[0].date_time), "</p>");
    }
    if(times[1]){
        res = res.concat("<p>  Suivant: ", convert_time(times[1].date_time), "</p>");
    }
    return res;
}

function found_station(e){
    console.log(e.latlng);

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
                                infos.innerHTML = infos.innerHTML + buildInfos(edi.direction, edi.label, elt.date_times);
                                var url_2 = "https://data.ratp.fr/api/records/1.0/search/?dataset=pictogrammes-des-lignes-de-metro-rer-tramway-bus-et-noctilien&q=&lang=fr&rows=1&sort=indices_commerciaux&refine.indices_commerciaux=".concat(edi.label);
                                fetch(url_2)
                                    .then(response => response.json())
                                    .then(data => {
                                        var pictos = document.getElementsByClassName("picto "+edi.label);
                                        var nums = document.getElementsByClassName("num "+edi.label);
                                        add_picto(data, pictos);
                                        add_label(data, nums, edi);
                                    });                            
                                });
                        })
            })
            markers.push(marker);
        })
    })
}

map.addEventListener('click', found_station);