const map = create_map();

let infos = document.getElementById("infos");
let index = 0;
let res = "";
let not_choose = true;
let lat_direction;
let lng_direction;
let lat_provenance;
let lng_provenance;
let markers = [];

function buildInfos(elt){
    if(elt.status != 'NO_SERVICE'){
        index += 1;
        infos.innerHTML = infos.innerHTML + "<p class='text'>Trajet " + index +":";
        infos.innerHTML = infos.innerHTML + convert_time(elt.departure_date_time) + " > ";
        elt.sections.forEach(section => {
            infos.innerHTML = infos.innerHTML + buildJourney(section);
            res = "";
        })
        infos.innerHTML = infos.innerHTML + convert_time(elt.arrival_date_time) + "</p>";
    }   
}

function buildJourney(section) {
    if(section.type == "street_network"){
        res = res.concat(section.mode, " > ");
    } else if(section.type == "public_transport"){
        let edi = section.display_informations;
        res = res.concat(edi.physical_mode, "  <b class='num ", edi.label,"'></b><img class='picto ", edi.label, "'> ", edi.name, " direction ", edi.direction," > ");
        var url_2 = "https://data.ratp.fr/api/records/1.0/search/?dataset=pictogrammes-des-lignes-de-metro-rer-tramway-bus-et-noctilien&q=&lang=fr&rows=1&sort=indices_commerciaux&refine.indices_commerciaux=".concat(edi.label);
        fetch(url_2)
        .then(response => response.json())
        .then(data => {
            var pictos = document.getElementsByClassName("picto "+edi.label);
            var nums = document.getElementsByClassName("num "+edi.label);
            add_picto(data, pictos);
            add_label(data, nums, edi);
        });
    }
    return res;
}

function chooseDirection(e){
    let titre = document.getElementById("titre");
    titre.innerHTML = "D'où partez-vous?";
    infos.innerHTML = "";
    markers.forEach(marker => {
        if(marker){
            map.removeLayer(marker);
        }
    })
    lat_direction = e.latlng.lat;
    lng_direction = e.latlng.lng;
    let marker_direction = L.marker([lat_direction, lng_direction]);
    marker_direction.addTo(map);
    markers.push(marker_direction);
    not_choose = false;
}

function chooseProvenance(e){
    let titre = document.getElementById("titre");
    titre.innerHTML = "Où voulez-vous aller?";
    lat_provenance = e.latlng.lat;
    lng_provenance = e.latlng.lng;
    let marker_provenance = L.marker([lat_provenance, lng_provenance]);
    marker_provenance.addTo(map);
    markers.push(marker_provenance);
    not_choose = true;
}

function found_station(e){
    console.log(e.latlng);
    if(not_choose){
        chooseDirection(e);
    } else {
        chooseProvenance(e);

        path = {
            coverage: "fr-idf",
        };
    
        feature = "journeys";
    
        parameters = {
            from: lng_provenance.toString().concat("%3B", lat_provenance.toString()),
            to: lng_direction.toString().concat("%3B", lat_direction.toString())
        };
    
        request = new Request(path, feature, parameters);
        url = request.getUrl();
        token = request.getKey();
    
        headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(token + ':'));

        fetch(url, {headers: headers})
            .then(response => response.json())
            .then(data => {
                data.journeys.forEach(elt => {
                    buildInfos(elt);
                });
                infos.innerHTML = infos.innerHTML + "<p>_</p>";
            })
    }
}

map.addEventListener('click', found_station);