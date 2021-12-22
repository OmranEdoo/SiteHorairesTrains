const map = L.map('mapid').setView([4, 47], 12);
const mainLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoienVtYmFsb3ZlOTc0IiwiYSI6ImNrdzN0N2tpODAwMGMyb252MDNuNjR1YzgifQ.BlHeXVvx1ob4eR8uyZOWOg'
});
mainLayer.addTo(map);

function getInfos() {
    var infos = document.getElementById("infos");
    var time = document.getElementById("time").value;
    var station_name = document.getElementById("station").value;
    time = time.replace(':','').concat("00");
    var station_id = "";

    //console.log(points);
    points.forEach(elt => {
        //console.log(elt.name);
        if(elt.name == station_name){
            map.setView([elt.coord.lat, elt.coord.lon], 15);
            station = L.marker([elt.coord.lat, elt.coord.lon]);
            station.bindPopup(station_name).openPopup();
            station.addTo(map);
            station_id = elt.id;
            console.log(station_id);
            let trains = find_train(station_id);
            console.log(trains);
        }
    })
}