const map = L.map('mapid').setView([4, 47], 12);
const mainLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoienVtYmFsb3ZlOTc0IiwiYSI6ImNrdzN0N2tpODAwMGMyb252MDNuNjR1YzgifQ.BlHeXVvx1ob4eR8uyZOWOg'
});
mainLayer.addTo(map);


var trains = [];

function chooseType() {
    var infos = document.getElementById("infos");
    var dropdown = document.getElementById("types");
    infos.innerHTML = convertType(dropdown.value);
    console.log(trains);
    console.log("test");
}

function convertType(type){
    let liste = type.match(/[A-Z][a-z]+/g);
    let new_type = liste[0];
    liste = liste.splice(1,liste.length);
    liste.forEach(mot => {
        new_type = new_type + " " + mot.toLowerCase();
    })
    return new_type;
}

function getInfos() {
    var infos = document.getElementById("infos");
    var time = document.getElementById("time").value;
    var station_name = document.getElementById("station").value;
    var dropdown = document.getElementById("types");
    time = time.replace(':','').concat("00");
    var station_id = "";
    var types = [];

    //console.log(points);
    points.forEach(elt => {
        if(elt.name == station_name){
            map.setView([elt.coord.lat, elt.coord.lon], 15);
            station = L.marker([elt.coord.lat, elt.coord.lon]);
            station.bindPopup(station_name).openPopup();
            station.addTo(map);
            station_id = elt.id;
            console.log(station_id);
            types.push(elt.id.split(':')[3]);
            find_train(station_id);
        }
    })
    types.forEach(type => {
        var elt = document.createElement("option");
        elt.textContent = convertType(type);
        elt.value = type;
        dropdown.appendChild(elt);
    })
    trains = getTrains();
}