class Request {
    constructor(path, feature, parameters) {
        this.token = "f532e0ca-807f-4136-b97d-2fb0b01d9ac9";
        //https://api.sncf.com/v1:28a5754b-5fc0-4c30-920a-e273bd660390
        this.API = "https://api.navitia.io/v1";
        this.path = path;
        this.feature = feature;
        this.parameters = parameters;
    }

    modifyKeyPath(key) {
        let new_key = key.replaceAll("[]", "%5B%5D");
        return new_key;
    }

    modifyValuePath(value) {
        if(value) {
            let new_value = value.replaceAll(":", "%3A");
            return new_value;
        }
    }

    getKey() {
        return this.token;
    }

    getUrl() {
        let url = this.API;
        Object.entries(path).forEach(([key, value]) => {
            url = url.concat("/", this.modifyKeyPath(key), "/", this.modifyValuePath(value))
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


