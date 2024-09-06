const path = require('path')
const express =  require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Vinayak'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Vinayak'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Vinayak',
        helpText:'This is some help text'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!!!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location}= {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude ,(error, forecastData)=>{
            if(error){
                return res.send({ error })
            } 
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address   
            })
        })
    })
    // res.send({
    //     forecast: 'Snowy',
    //     location:'Mumbai',
    //     temperature:'33 C',
    //     address:req.query.address
    // })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Vinayak',
        errorMessage:'Help artical not found!'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        name:'Vinayak',
        errorMessage:'Page not found!!!'
    })
})

//app.com 
//app.com/help
//app.com/about 

app.listen(3000,()=>{ 
    console.log('server is up on port 3000')
})