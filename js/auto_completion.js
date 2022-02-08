window.onload = function(){
    var form = document.getElementById("auto-suggest");
    var input = form.station;
    var list = document.createElement("ul");
    list.className = "suggestions";
    list.style.display = "none";
    form.appendChild(list);
    
    input.onkeyup = function(){
        path = {
            coverage: "fr-idf",
        };

        feature = "pt_objects";

        parameters = {
            count: 6,
            q: this.value,
            "type[]": "stop_area"
        }
        
        request = new Request(path, feature, parameters);
        url = request.getUrl();
        token = request.getKey();

        headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(token + ':'));

        fetch(url, {headers: headers})
        .then(response => response.json())
        .then(data => {
            var txt = this.value;
            var motsClefs = data.pt_objects;
            if(!txt){
                list.style.display = "none";
                return;
            }
            var suggestions = 0;
            var frag = document.createDocumentFragment();
                    
            for(var i = 0, c = motsClefs.length; i < c; i++){
                var word = document.createElement("li");
                frag.appendChild(word);
                word.innerHTML = motsClefs[i].stop_area.name;
                word.mot = motsClefs[i].stop_area.name;
                word.onmousedown = function(){
                    input.focus();
                    input.value = this.mot;
                    list.style.display = "none";
                    return false;
                };
                suggestions++;
            }
            
            if(suggestions){
                list.innerHTML = "";
                list.appendChild(frag);
                list.style.display = "block";
            }
            else {
                list.style.display = "none";			
            }	
        })
    };
        
    input.onblur = function(){
        list.style.display = "none";	
        if(this.value=="")
            this.value = "Rechercher...";
    };

};