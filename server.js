const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());

const weatherData = require('./data/weather.json');

app.get('/weather', (req, res) => {
  const searchQuery = req.query.searchQuery;
  const lat = req.query.lat;
  const lon = req.query.lon;

  const cityArr = weatherData.find(item => item.city_name.toLowerCase() === searchQuery.toLowerCase())
  // console.log(cityArr)
  try {
    const cityData = cityArr.data.map(item => new Forecast(item));
    // console.log(cityData)
    res.status(200).send(cityData)
  } catch (error) {
    errorHandler(error, res)
  }

  // res.send({cityArr})
})

app.get('*', (req, res) => {res.status(404).send('Page not found!')})

function errorHandler(error, res) {
  res.status(500).send({error: 'Something went wrong'})
}


class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.descriptioin = day.weather.description;
  }
}

app.listen(process.env.PORT, () => {
  console.log('Server is Working!!!')
})