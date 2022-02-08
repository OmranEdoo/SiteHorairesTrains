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
            // On créé la ligne qui sera affichée, elle inclut le nom de la station, le terminus, le logo de la ligne concerné et les deux prochaines heures de passage
            res = res.concat(station_name, " > ", direction," ", "<img src='' alt='' class='picto ", ligne, "'><p>   Prochain train: ", convert_time(times[0].date_time), "</p><p>  Suivant: ", convert_time(times[1].date_time), "</p>");
            return res;
        }

        fetch(url, {headers: headers})
            .then(response => response.json())
            .then(data => {
                data.terminus_schedules.forEach(elt => {
                    let infos = document.getElementById("infos");
                    let edi = elt.display_informations;
                    infos.innerHTML = buildInfos(edi.direction, edi.label, elt.date_times);
                    var url_2 = "https://data.ratp.fr/api/records/1.0/search/?dataset=pictogrammes-des-lignes-de-metro-rer-tramway-bus-et-noctilien&q=&lang=fr&rows=1&sort=indices_commerciaux&refine.indices_commerciaux=".concat(edi.label);
                    fetch(url_2)
                        .then(response => response.json())
                        .then(data => {
                            var pictos = document.getElementsByClassName(edi.label);
                            Object.entries(pictos).forEach(([key, picto]) => {
                                if(data.records[0]) {
                                    picto.src = "../img/picto/".concat(data.records[0].fields.noms_des_fichiers.filename);
                                } else {
                                    console.log(picto.style.width);
                                    picto.remove();
                                }
                            })
                        });
                });
            })
})