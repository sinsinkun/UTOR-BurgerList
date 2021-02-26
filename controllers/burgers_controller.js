const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const orm = require('../config/orm.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(public));

app.get('/', async function(req, res) {
  // get stuff
});

app.post('/', async function(req, res) {
  // post stuff
})

app.listen(PORT, () => {
  console.log(`Opened server at localhost:${PORT}`);
})