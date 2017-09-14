const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = (process.env.PORT || 3000);
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// ENDPOINTS



app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});

module.exports = app;