const express = require('express');
require('dotenv').config();
const cors = require('cors');

const {handleWeather} = require('./module/weather');
const {handleMovie} = require('./module/movies');

const app = express();
app.use(cors());

// const weatherData = require('./data/weather.json');

app.get('/weather', handleWeather);
app.get('/movies', handleMovie);


app.get('*', (req, res) => {res.status(404).send('Page not found!')})

function errorHandler(error, res) {
  res.status(500).send({error: 'Something went wrong'})
}

app.listen(process.env.PORT, () => {
  console.log('Server is Working!!!')
})