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

app.get('/api/v1/list', (req, res) => {
  database('list').select()
    .then((items) => {
      res.status(200).json({items});
    })
    .catch((error) => {
      res.status(500).json({error})
    })
})

app.post('/api/v1/list', (req, res) => {
  const newItem = req.body;
  
  for(const requiredParameter of ['name', 'reason', 'cleanliness']) {
    if (!newItem[requiredParameter]){
      return res.status(422).json({
        error: `Missing required parameter ${requiredParameter}`
      })
    }
  }
  database('list')
    .insert(newItem, '*')
    .then((item) => {
      res.status(201).json(folder[0])
    })
    .catch((error) => {
      res.status(500).json({error})
    })
})

app.patch('/api/v1/list/:id', (req, res) => {
  const newCleanliness = req.body;
  
  for(const requiredParameter of ['id', 'cleanliness']) {
    if(!newCleanliness[requiredParameter]){
      return res.status(422).json({
        error: `Missing required parameter ${requiredParameter}`
      })
    }
  }
  database('list')
    .where('id', req.params.id)
    .update(newCleanliness, '*')
    .then((data) => {
      res.status(201).json({data});
    })
    .catch((error) => {
      res.status(500).json({error})
    })
})

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});

module.exports = app;