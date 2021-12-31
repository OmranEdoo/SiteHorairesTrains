var station_name = document.getElementById("station").value;
var res = "";
var time = getTime();

idPromise()
    .then((station_id) => {

    setTimeout(function(){console.log(station_id)},500);

    path = {
        coverage: "fr-idf",
        stop_areas: station_id
    };

    feature = "terminus_schedules";

    if(time){
        parameters = {
            items_per_schedule: 2,
            from_datetime: time
        };
    } else {
        parameters = {
            items_per_schedule: 2
        };
    }


    request = new Request(path, feature, parameters);
    url = request.getUrl();
    token = request.getKey();

    headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(token + ':'));

    function buildInfos(direction, ligne, times) {
        res = res.concat(station_name, " > ", direction, " ", ligne, "<p>Prochain train: ", convert_time(times[0].date_time), "</p><p>Suivant: ", convert_time(times[1].date_time), "</p>");
        return res;
    }

    fetch(url, {headers: headers})
        .then(response => response.json())
        .then(data => {
            data.terminus_schedules.forEach(elt => {
                let infos = document.getElementById("infos");
                let edi = elt.display_informations;
                infos.innerHTML = buildInfos(edi.direction, edi.label, elt.date_times);
            });
        })
})