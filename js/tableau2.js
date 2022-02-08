var station_name = document.getElementById("station").value;
var res = "";

idPromise()
    .then((station_id) => {
        setTimeout(function(){console.log(station_id)},500);

        path = {
            coverage: "fr-idf",
            stop_areas: station_id
        };

        feature = "terminus_schedules";

        parameters = {
            from_datetime: getActualTime().slice(0, 9).concat("000000")
        }


        request = new Request(path, feature, parameters);
        url = request.getUrl();
        token = request.getKey();

        headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(token + ':'));

        function fillTab(elt, tab){
            let edi = elt.display_informations;
            let times = elt.date_times;
            let c12 = document.createElement("th");
            c12.innerHTML = "<div id='column_expand'><img src='' alt='' class='picto ".concat(edi.label, "'><p> ", edi.direction, "</p></div>");
            c1.appendChild(c12);
            let c = document.createElement("td");
            c.id = "c";
            times.forEach(time => {
                let cc = document.createElement("tr");
                cc.innerHTML = convert_time(time.date_time);
                c.appendChild(cc)
            })
            c2.appendChild(c);
        }

        fetch(url, {headers: headers})
            .then(response => response.json())
            .then(data => {
                var nb = 1;
                let infos = document.getElementById("infos");
                infos.querySelectorAll('*').forEach(n => n.remove());
                var tab = document.createElement("table");
                tab.className = "tableau";
                let c1 = document.createElement("tr");
                c1.id = "c1";
                let c2 = document.createElement("tr");
                c2.id = "c2";
                let c11 = document.createElement("th");
                c11.innerHTML = "Direction";
                let c21 = document.createElement("th");
                c21.innerHTML = "";
                tab.appendChild(c1);
                tab.appendChild(c2);
                c1.appendChild(c11);
                c2.appendChild(c21);
                infos.appendChild(tab);
                data.terminus_schedules.forEach(elt => {
                    nb++;
                    let edi = elt.display_informations;
                    fillTab(elt, tab);
                    var url_2 = "https://data.ratp.fr/api/records/1.0/search/?dataset=pictogrammes-des-lignes-de-metro-rer-tramway-bus-et-noctilien&q=&lang=fr&rows=1&sort=indices_commerciaux&refine.indices_commerciaux=".concat(edi.label);
                    fetch(url_2)
                        .then(response => response.json())
                        .then(data => {
                            var pictos = document.getElementsByClassName(edi.label);
                            Object.entries(pictos).forEach(([key, picto]) => {
                                if(data.records[0]) {
                                    picto.src = "../img/picto/".concat(data.records[0].fields.noms_des_fichiers.filename);
                                } else {
                                    picto.alt = edi.label;
                                }
                            })
                        });
                });
            })
})