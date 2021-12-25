function getInfos() {
    let station = document.getElementById("station").value;
    if(station){
        let script = document.createElement("script");
        script.src = "../js/terminus_schedules.js";
        let body = document.getElementById("body");
        body.appendChild(script);
    }
}