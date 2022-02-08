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