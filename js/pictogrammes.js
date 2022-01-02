var url = "https://data.ratp.fr/api/records/1.0/search/?dataset=pictogrammes-des-lignes-de-metro-rer-tramway-bus-et-noctilien&q=&lang=fr&rows=1&sort=indices_commerciaux&refine.indices_commerciaux=M1";

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.records[0].fields.noms_des_fichiers.filename);
        var picto = document.getElementById("picto");
        picto.src = "../img/picto/".concat(data.records[0].fields.noms_des_fichiers.filename);
    });