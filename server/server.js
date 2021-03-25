const express = require('express')
require('./database/mongoose')
const app = express()
const Course = require('./database/models/course')
const bodyParser = require('body-parser');
const PORT = 5000

app.use(bodyParser.json());

app.get('/', function (req, res) {
  Course.find({}, function (err, result) {
    if (err) {
      res.status(400).send({
        'success': false,
        'data': result
      })
    } else {
      res.status(200).send({
        'success': true,
        'data': result
      })
    }
  })
});

app.post('/', function (req, res) {
  const newCourse = {
    name: req.query.name,
    duration: req.query.duration
  }

  Course.create(newCourse, function (err, result) {
    if (err) {
      res.status(400).send({
        'success': false,
        'error': err.message
      })
    } else {
      res.status(201).send({
        'success': true,
        'data': result,
        'message': 'Course created successfully'
      })
    }
  })
})

app.listen(PORT, function () {
  console.log(`Server Listening on ${PORT}`)
})