var station_name = document.getElementById("station").value;
var res = "";

function fillTab(elt){
    let edi = elt.display_informations;
    let times = elt.date_times;
    let c12 = document.createElement("th");
    c12.innerHTML = "<div id='column_expand'><b class='num ".concat(edi.label, "'></b><img src='' alt='' class='picto ", edi.label, "'><p> ", edi.direction, "</p></div>");
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
                    drawPicto(edi);
                });
            })
})