function convert_time(time){
    let new_time = time.split('T')[1];
    new_time = new_time.slice(0, 2).concat("h", new_time.slice(2, 4));
    return new_time;
}

function getTime(){
    let time = document.getElementById("time").value;
    return time;
}