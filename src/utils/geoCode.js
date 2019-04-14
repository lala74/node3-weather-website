request = require("request");

const geoCode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibGFsYTc0IiwiYSI6ImNqc3NyNHZ6djByeGQ0OXM5eGNsMG50b24ifQ.i9u7TWafESSAYQMedraDcg';
    
    request({ url, json: true}, (error, { body=undefined }) => {
        if (error) {
            callback('Unable to connect to location service.', {});
        } else if (body.features.length === 0) {
            callback('Unable to find this location.', {});
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geoCode;