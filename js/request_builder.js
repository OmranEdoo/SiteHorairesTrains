class Request {
    constructor(path, feature, parameters) {
        this.token = "3b036afe-0110-4202-b9ed-99718476c2e0";
        this.API = "https://api.navitia.io/v1";
        this.path = path;
        this.feature = feature;
        this.parameters = parameters;
    }

    modifyValuePath(value) {
        let new_value = value.replaceAll(":", "%3A");
        return new_value;
    }

    getKey() {
        return this.token;
    }

    getUrl() {
        let url = this.API;
        Object.entries(path).forEach(([key, value]) => {
            url = url.concat("/", key, "/", this.modifyValuePath(value))
        })
        url = url.concat("/", feature, "?");
        Object.entries(parameters).forEach(([key, value]) => {
            if(typeof value != String) {
                value.toString();
            }
            url = url.concat(key, "=", value, "&");
        })
        return url;
    }
}


