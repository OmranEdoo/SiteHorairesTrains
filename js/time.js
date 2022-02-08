function convert_time(time){
    let new_time = time.split('T')[1];
    new_time = new_time.slice(0, 2).concat("h", new_time.slice(2, 4));
    return new_time;
}

function getTime(){
    let time = document.getElementById("time").value;
    return time;
}

function getActualTime(){
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    if(cDay<10){
        cDay = "0".concat(cDay.toString())
    } else {
        cDay = cDay.toString();
    }
    let cMonth = (currentDate.getMonth() + 1);
    if(cMonth<10){
        cMonth = "0".concat(cMonth.toString())
    } else {
        cMonth = cMonth.toString();
    }
    let cYear = currentDate.getFullYear().toString();
    let c = cYear.concat(cMonth, cDay, "T");
    console.log(c);
    return c;
}