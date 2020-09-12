var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '8889',
  user     : 'root',
  password : 'root',
  database : 'football'
});


module.exports = connection;