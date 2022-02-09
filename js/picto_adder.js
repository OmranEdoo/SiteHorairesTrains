function add_picto(data, pictos){
    Object.entries(pictos).forEach(([key, picto]) => {
        if(data.records[0]) {
            picto.src = "../img/picto/".concat(data.records[0].fields.noms_des_fichiers.filename);
        } else {
            picto.remove();
        }
    })
}

function add_label(data, nums, edi){
    Object.entries(nums).forEach(([key, num]) => {
        if(data.records[0]) {
            num.parentNode.removeChild(num);
        } else {
            num.innerHTML = edi.label;
        }
    })
}

function drawPicto(edi){
    var url_2 = "https://data.ratp.fr/api/records/1.0/search/?dataset=pictogrammes-des-lignes-de-metro-rer-tramway-bus-et-noctilien&q=&lang=fr&rows=1&sort=indices_commerciaux&refine.indices_commerciaux=".concat(edi.label);
    fetch(url_2)
    .then(response => response.json())
    .then(data => {
        var pictos = document.getElementsByClassName("picto "+edi.label);
        var nums = document.getElementsByClassName("num "+edi.label);
        add_picto(data, pictos);
        add_label(data, nums, edi);
    });                            
}
