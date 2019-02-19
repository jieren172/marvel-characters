const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Create the server
const app = express();

app.use(cors());
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use api routes
app.use(require('./characters'));

module.exports = app;
