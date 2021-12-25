const navitia_key = "f532e0ca-807f-4136-b97d-2fb0b01d9ac9";
const sncf_key = "28a5754b-5fc0-4c30-920a-e273bd660390";

var points = [{}];
var trains = [];
var page_points = 1;
var page_trains = 1;
var index = 1;
var next_arrival;
var step = 1;
var trains = {};
var url_stop_points = "https://api.sncf.com/v1/coverage/sncf/stop_points?count=1000&start_page=";
var url_vehicle_journeys = "https://api.sncf.com/v1/coverage/sncf/vehicle_journeys?count=1000&start_page=";
var headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(sncf_key + ':'));


function getTrains(){
    return trains;
}

function create_points(){
    fetch(url_stop_points.concat(page_points.toString()), {headers: headers})
        .then(response => response.json())
        .then(data => {
            if(data.stop_points){
                Object.entries(data.stop_points).forEach(([key, value]) => {
                    points[index.toString()] = value;
                    index++;
                });
                page_points++;
                create_points();
            } else {
                console.log(points);
            }
        })
}

create_points();


function find_train(station_id){
    fetch(url_vehicle_journeys.concat(page_trains.toString()), {headers: headers})
        .then(response => response.json())
        .then(data => {
            console.log(page_trains);
            if (data.vehicle_journeys) {
                Object.entries(data.vehicle_journeys).forEach(([key, value_1]) => {
                    value_1.stop_times.forEach(train => {
                        if (train.stop_point.id == station_id) {
                            if(trains[train.stop_point.id]){
                                let liste_trains = trains[train.stop_point.id.split(':')[3]];
                                liste_trains.push(train);
                                trains[train.stop_point.id.split(':')[3]] = liste_trains;
                            } else {
                                let liste_trains = new Array(train)
                                trains[train.stop_point.id.split(':')[3]] = liste_trains;
                            }
                            if (step == 1) {
                                step++;
                            }
                        } else if (step == 2) {
                            step++;
                        }
                    })
                });
                page_trains++;
                if (step != 3) {
                    find_train(station_id);
                } else {
                    step = 1;
                    console.log(station_id);
                    return trains;
                }
            } else {
                return trains;
            }
        })
}