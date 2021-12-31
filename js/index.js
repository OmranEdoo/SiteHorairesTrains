function getInfos() {
    let station = document.getElementById("station").value;
    if(station){
        let script = document.createElement("script");
        script.src = "../js/terminus_schedules2.js";
        let body = document.getElementById("body");
        body.appendChild(script);
        let background = document.getElementById("background");
        background.style.height = "fit-content";
    }
}