const geocode = require('./util/geocode.js')
const forecast = require('./util/forecast.js')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// DEFININDO CAMINHOS PARA CONFIG DO EXPRESS
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//CONFIGURANDO HANDLEBARS E VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//CONFIGURANDO DIRETORIO ESTATICO
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        name: 'Pedro Gabriel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Pedro Gabriel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Put the name of the city that you wanna search on the bar and click search.',
        title: 'Help',
        name: 'Pedro Gabriel'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'My 404 page'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})