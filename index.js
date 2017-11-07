const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const config = require('./config');
const app = express();
const routes = require('./routes');
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(bodyParser.json({ limit: '50mb' }));

const siteURL = process.env.SITE_URL || 'http://localhost:3000';
const wwwSiteURL = process.env.WWW_SITE_URL || 'http://localhost:3000';
const apiURL = process.env.API_URL || 'http://localhost:8000';
const whitelist = [siteURL, wwwSiteURL, apiURL, 'http://localhost:3000'];
const corsOptionsDelegate = function(req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = {
      origin: false
    }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate), (req, res, next) => {
  next();
});

app.use('/', routes);

app.listen(config.server.port, () => {
  console.log('Money server');
});

module.exports = app;
