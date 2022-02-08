var stop_areas;

var idPromise = function getId(){
    return new Promise((resolve, reject) => {
        var station_id;    
        var path = {
            coverage: "fr-idf"
        };

        var feature = "pt_objects";
        
        var parameters = {
            q: station_name,
            "type[]": "stop_area"
        };
        
        var request = new Request(path, feature, parameters);
        var url = request.getUrl();/////
        var token = request.getKey();
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(token + ':'));
        
        fetch(url, {headers: headers})
        .then(response => response.json())
        .then(data => {
            let id = data.pt_objects[0].id;
            station_id = id;
            if(station_id) {
                resolve(station_id);
            } else {
                reject("error");
            }
            
        });
    })

}