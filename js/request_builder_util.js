exports.modifyKeyPath = (key) => {
    let new_key = key.replaceAll("[]", "%5B%5D");
    return new_key;
}

exports.modifyValuePath = (value) => {
    if(value) {
        let new_value = value.replaceAll(":", "%3A").replaceAll(";", "%3B");
        return new_value;
    }
}