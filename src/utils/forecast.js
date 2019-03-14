request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b11c7d1e6af5118c141267c0edbf5d0a/'+ latitude +','+ longitude +'?units=si';

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to get the forecast at this location', undefined);
        } else {
            summary = body.daily.data[0].summary;
            currTemp = body.currently.temperature;
            currChanceRain = body.currently.precipProbability;
            data = `${summary} It is currently ${currTemp} degrees out. There is a ${currChanceRain}% chance of rain.`;
            callback(undefined, data);
        }
        
    });
};

module.exports = forecast;