const request = require('request')

const geocode = (address, callback)=>{

    const url = 'https://api.weatherstack.com/current?access_key=50c5ee253f2459913f1697e4acc8f8a5&query='+encodeURIComponent(address)+'&units=m';
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect services!', undefined)
        }else if(body.error){
            callback('Unable to find location, try another search', undefined)
        }else{
            callback(undefined, {
                latitude: body.location.lat,
                longitude: body.location.lon,
                location: body.location.name
            })
            //console.log('Latitude: '+ response.body.location.lat + ' Longitude: '+ response.body.location.lon)
        }

    })


}

module.exports = geocode