const convert_time = (time) => {
    let new_time = time.split('T')[1];
    new_time = new_time.slice(0, 2).concat("h", new_time.slice(2, 4));
    return new_time;
}

var res = '';
var station_name = 'BERCY';

exports.buildInfos = (direction, ligne, times) => {
    // On créé la ligne qui sera affichée, elle inclut le nom de la station, le terminus, le logo de la ligne concerné et les deux prochaines heures de passage
    res = res.concat(station_name, ' > ', direction, ' <b class="num ', ligne,'"></b><img src="" alt="" class="picto ', ligne, '"><p>   Prochain train: ', convert_time(times[0].date_time), '</p><p>  Suivant: ', convert_time(times[1].date_time), '</p>');
    return res;
}

exports.res = res;
exports.station_name = station_name;
exports.convert_time = convert_time;