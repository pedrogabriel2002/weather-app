const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=348626fcce732bc4fec484c133c4d0a2&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error){
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                weather_description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                precip: body.current.precip,
                observation_time: body.current.observation_time,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast