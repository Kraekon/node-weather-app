const express = require('express');
const path = require('path');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// __dirname is filepath for root
// __filename is filepath to this file

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// get requests
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About - Weather App',
    name: 'Filip Landgren',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help - Weather App',
    helpText: 'Type an address and get a forecast.',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address provided!',
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location, } = {}) => {
    if (error) {
      return res.send({ error, });
    }

    forecast({ latitude, longitude, }, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', () => {

});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 - Help article not found',
    errorMessage: 'The requested help article was not found!',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 - Not Found',
    errorMessage: 'Page not found!',
  });
});

// start server
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
