const request = require('request')

const forecast = (lat, lon, cb) => {
    const url = 'https://api.weatherstack.com/current?access_key=50c5ee253f2459913f1697e4acc8f8a5&query='+lat+','+lon+'&units=m';

    request({url , json:true},(error,{body})=>{
        if(error){
            cb('Unable to connect weather services!',undefined)
        }else if(body.error){
            cb('Unable to find location!',undefined)
        }else{
            cb(undefined, {
                forecast: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast