const db = require('./connection.js')('ot7rxogk7s7ocyid','un7brfmnu9lc1qc8');

async function selectAll() {
  const data = db.query('SELECT * FROM burgers');
  return data;
}

async function insertOne(burger_name) {
  const r = await db.query('INSERT INTO burgers (burger_name, is_eaten) VALUES (?, 0)', burger_name);
  return r;
}

async function updateOne(burger_name, id) {
  const r = await db.query('UPDATE burgers SET burger_name = ?, is_eaten = 1 WHERE id = ?',
  [burger_name, Number(id)]);
  return r;
}

async function delOne(id) {
  const r = await db.query('DELETE FROM burgers WHERE id = ?', Number(id));
  return r;
}

function end() {
  db.close();
}

module.exports = {selectAll, insertOne, updateOne, delOne, end};