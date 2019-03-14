const path = require("path");
const express = require("express");
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));
 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Minh Duc LA'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Minh Duc LA'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is a help page, please click the button below to get the document',
        name: 'Minh Duc LA'
    })
})

app.get('/weather', (req, res) => {
    var address = req.query.address;
    
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(address, (error, { latitude,longitude,location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address
            })
        });
    });    
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help data not found',
        title: '404 Error',
        name: 'Minh Duc LA'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404 Error',
        name: 'Minh Duc LA'
    });
});
// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000');
}); // start a server and have a listener at a specific port

