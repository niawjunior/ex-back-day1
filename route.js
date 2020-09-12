var express = require('express')
var connection = require('./connect')
var bodyParser = require('body-parser')
var multer = require('multer');

var cors = require('cors');

var app = express()
app.use(cors({
  origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".png")
  }
})


const upload = multer({ storage: storage })

app.get('/getData', (req, res) => {
  console.log(req)
  connection.query('SELECT * FROM football_table', function (error, results, fields) {
    res.json({
      status: 200,
      message: 'success',
      data: results
    })
  })
})

app.get('/getData/:id', (req, res) => {
  const id = req.params.id
  connection.query(`SELECT * FROM football_table WHERE ID = ${id}`, function (error, results, fields) {
    console.log(results)

    res.json({
      status: results.length === 0 ? 404 : 200,
      message: results.length === 0 ? 'not found' : 'success',
      data: results
    })
  })
})

app.post('/insertData', (req, res) => {
  var body  = req.body
  console.log(body)
  connection.query(`INSERT INTO football_table SET NAME = '${body.name}', NUMBER = '${body.number}', PHOTO = '${body.photo}'`, function(error, results, fields) {

    connection.query('SELECT * FROM football_table', function (error, results, fields) {
      res.json({
        status: 201,
        message: 'success',
        data: results
      })
    })
  })
})

app.post('/upload', upload.single('file'),  (req, res) => { 
  res.json({
    status: 201,
    message: 'success',
    file: req.file
  })
})
module.exports = app