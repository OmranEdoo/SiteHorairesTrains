const convert_time = (time) => {
    let new_time = time.split('T')[1];
    new_time = new_time.slice(0, 2).concat("h", new_time.slice(2, 4));
    return new_time;
}

var res = '';

exports.buildInfos = (name, direction, ligne, times) => {
    if(times[0]){
        //res = `${name} > ${direction} <b class="num ${ligne}"></b><img src="" alt="" class="picto ${ligne}"><p>   Prochain train: ${convert_time(times[0].date_time)}</p>`;
        res = res.concat(name, ' > ', direction, ' <b class="num ', ligne,'"></b><img src="" alt="" class="picto ', ligne, '"><p>   Prochain train: ', convert_time(times[0].date_time), '</p>');
    }
    if(times[1]){
        res = res.concat('<p>  Suivant: ', convert_time(times[1].date_time), '</p>');
    }
    return res;
}

exports.convert_time = convert_time;
exports.res = res;