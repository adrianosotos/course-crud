const express = require('express')
require('./database/mongoose')
const app = express()
const Course = require('./database/models/course')
const bodyParser = require('body-parser');
const PORT = 5000

app.use(bodyParser.json());

app.post('/', function (req, res) {
  const { name, duration } = req.query || {}

  Course.create({
    name,
    duration
  })
  .then(result => {
    res.status(201).send({
      success: true,
      data: result,
      message: 'Course created successfully'
    })
  })
  .catch(error => {
    res.status(400).send({
      sucess: false,
      data: error
    })
  })
})

app.get('/', function (req, res) {
  Course.find({})
  .then(result => {
    res.status(200).send({
      success: true,
      data: result
    })
  })
  .catch(error => {
    res.status(400).send({
      success: false,
      data: error
    })
  })
})

app.put('/', function (req, res) {
  const { id, name, duration } = req.query || {}

  Course.findOneAndUpdate(
    id,
    {
      $set: {
        name,
        duration
      }
    }
  )
  .then(result => {
    res.status(200).send({
      success: true,
      data: result,
      message: 'Course updated successfuly'
    })
  })
  .catch(error => {
    res.status(400).send({
      success: false,
      result: error
    })
  })
})

app.delete('/', function (req, res) {
  const { id } = req.query || {}
  Course.deleteOne({ _id: id })
  .then(result => {
    res.status(200).send({
      success: true,
      data: result,
      message: 'Course deleted successfuly'
    })
  })
  .catch(error => {
    res.status(400).send({
      success: false,
      result: error
    })
  })
})



app.listen(PORT, function () {
  console.log(`Server Listening on ${PORT}`)
})