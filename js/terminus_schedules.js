var station_name = document.getElementById("station").value;
var res = "";
var time = getTime();

var path = {
    coverage: "sandbox",
    stop_areas: getId(station_name)
};
var feature = "terminus_schedules";

if(time){
    var parameters = {
        items_per_schedule: 2,
        from_datetime: time
    };
} else {
    var parameters = {
        items_per_schedule: 2
    };
}


var request = new Request(path, feature, parameters);
var url = request.getUrl();
var token = request.getKey();

var headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(token + ':'));

function buildInfos(direction, ligne, times) {
    res = res.concat(station_name, " > ", direction, " ", ligne, "<p>Prochain train: ", convert_time(times[0].date_time), "</p><p>Suivant: ", convert_time(times[1].date_time), "</p>");
    return res;
}

fetch(url, {headers: headers})
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        data.terminus_schedules.forEach(elt => {
            let infos = document.getElementById("infos");
            let edi = elt.display_informations;
            infos.innerHTML = buildInfos(edi.direction, edi.label, elt.date_times);
        });
    })