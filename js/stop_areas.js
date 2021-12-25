var path = {
    coverage: "sandbox"
};
var feature = "stop_areas";
var parameters = {
    count: 7
};

var request = new Request(path, feature, parameters);
var url = request.getUrl();
var token = request.getKey();

var headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(token + ':'));

var stop_areas;

// extraction des données de la table pour ne plus le refaire par la suite
fetch(url, {headers: headers})
        .then(response => response.json())
        .then(data => {
            stop_areas = data;
        })

function getId(name){
    let id = "";
    stop_areas.stop_areas.forEach(elt => {
        if(elt.name == name) {
            id = elt.id;
        }
    });
    return id;
}