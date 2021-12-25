/*
const map = L.map('mapid').setView([4, 47], 12);
const mainLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoienVtYmFsb3ZlOTc0IiwiYSI6ImNrdzN0N2tpODAwMGMyb252MDNuNjR1YzgifQ.BlHeXVvx1ob4eR8uyZOWOg'
});
mainLayer.addTo(map);
*/

function chooseType() {
    var infos = document.getElementById("infos");
    var dropdown = document.getElementById("types");
    train = trains[dropdown.value];
    infos.innerHTML = selectTime(train);
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
    let script = document.createElement("script");
    script.src = "js/terminus_schedules.js";
    let body = document.getElementById("body");
    body.appendChild(script);
}