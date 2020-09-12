var connection = require('./connect')
var express = require('express')
var route = require('./route')
var app = express()


connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) {
    throw error;
  } else {
    app.use(route)
    app.listen(3001, result => {
      console.log('listening on port 3001')
    })
  }
});
