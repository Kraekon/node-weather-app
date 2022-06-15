const request = require('postman-request');

const forecast = ({ latitude, longitude }, callback) => {

  /*
    units=m Celcius
    units=s Kelvin
    units=f Fahrenheit
  */

  const url = 'http://api.weatherstack.com/current?access_key=090315b3de6d5de59e7de63be3e419fa&query=' + latitude + ',' + longitude + '&units=m';

  request({
    url,
    json: true,
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find weather for location!', undefined);
    } else {
      const description = body.current.weather_descriptions[0];
      const temperature = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const humidity = body.current.humidity;
      const windSpeed = body.current.wind_speed;

      callback(undefined,
        'Weather: ' + description +
        '. Temperature: ' + temperature +
        ' degrees [feels like: ' + feelsLike +
        ' degrees]. Humidity: ' + humidity +
        '%. Wind speed: ' + windSpeed + 'm/s.');
    }
  });
};

module.exports = forecast;
