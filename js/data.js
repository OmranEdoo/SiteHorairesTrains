const navitia_key = "f532e0ca-807f-4136-b97d-2fb0b01d9ac9";
const sncf_key = "28a5754b-5fc0-4c30-920a-e273bd660390";

var points = [{}];
var trains = [];
var page = 1;
var index = 1;
var next_arrival;
var step = 1;
var trains = [];

var url_stop_points = "https://api.sncf.com/v1/coverage/sncf/stop_points/?count=1000&start_page=";
var url_vehicle_journeys = "https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/?count=1000&start_page=";
var headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(sncf_key + ':'));

function create_points(){
    fetch(url_stop_points.concat(page.toString()), {headers: headers})
        .then(response => response.json())
        .then(data => {
            if(data.stop_points){
                Object.entries(data.stop_points).forEach(([key, value]) => {
                    points[index.toString()] = value;
                    index++;
                });
                page++;
                create_points();
            } else {
                console.log(points);
            }
        })
}

create_points();

function find_train(station_id){
    fetch(url_vehicle_journeys.concat(page.toString()), {headers: headers})
        .then(response => response.json())
        .then(data => {
            console.log(page);
            if(data.vehicle_journeys){
                Object.entries(data.vehicle_journeys).forEach(([key, value]) => {
                    value.stop_times.forEach(train => { 
                        if(train.stop_point.id == station_id){
                            console.log("Le prochain train arrive à " + train.arrival_time + " heure.");
                            trains.push(train);
                            if(step == 1){
                                step++;
                            }
                        } else if(step == 2) {
                            step++;
                        }
                    })  
                });
                page++;
                if(step != 3){
                    find_train(station_id);
                } else {
                    return trains;
                }
            }
        })
}