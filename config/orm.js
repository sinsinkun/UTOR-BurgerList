const db = require('./connection.js')('burgers_db','password');

async function selectAll() {
  const data = db.query('SELECT * FROM burgers');
  return data;
}

async function insertOne(dataObj) {
  const r = await db.query('INSERT INTO burgers (burger_name, is_eaten) VALUES (?,?)',
  [dataObj.name, dataObj.isEaten] );
  return r;
}

async function updateOne(dataObj) {
  const r = await db.query('UPDATE burgers SET burger_name = ?, is_eaten = ?, WHERE id = ?',
  [dataObj.name, dataObj.isEaten, dataObj.id])
}

function end() {
  db.close();
}

module.exports = {selectAll, insertOne, updateOne, end};