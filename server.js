const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const orm = require('./config/orm.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(public));

app.get('/burger', async function(req, res) {
  console.log('API REQUEST: get all burger info');
  // get stuff
  res.send(/* JSON info */);
});

app.get('/burger/:id', async function(req,res) {
  console.log('API REQUEST: edit burger info for', req.params.id);
  // get specific id
  res.send( {message:'success'} );
})

app.post('/burger', async function(req, res) {
  console.log('API REQUEST: add to burger list', req.body);
  // post stuff
  res.send( {message:'success'} );
})

app.listen(PORT, () => {
  console.log(`Opened server at localhost:${PORT}`);
})