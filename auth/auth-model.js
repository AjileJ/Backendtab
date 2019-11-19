const db = require('../database/dbConfig');

module.exports = {
  insert,
  get
}

function insert(user){
  return db('users').insert(user,'id')
}

function get(filter){
  return db('users').where(filter)
}