const express = require('express')
const cors = require('cors');
require('./database/mongoose')
const app = express()
const Course = require('./database/models/course')
const bodyParser = require('body-parser');
const PORT = 5000

app.use(cors())
app.use(bodyParser.json());

app.post('/', function (req, res) {
  const { level, book, bookPublisher, active, modality, name, duration, courseId } = req.body || {}

  Course.create({
    level,
    book,
    bookPublisher,
    active,
    modality,
    name,
    duration,
    courseId
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


function buildFilters (courseIds) {
  const courseIdDictionary = {
    1: 'GENERAL ENGLISH',
    2: 'IELTS',
    3: 'CAMBRIDGE',
    4: 'BUSINESS',
    5: 'INTER'
  }

  return courseIds.map(id => ({
    id, 
    label: courseIdDictionary[id],
    path: `/?courseIdFilter=${id}`
  }))
}


app.get('/', async function (req, res) {
  try {
    const { courseIdFilter } = req.query || {}
    const query = courseIdFilter ? { courseId: { $eq: courseIdFilter } } : {}
    const courses = await Course.find(query)
    const courseIds = await Course.distinct('courseId')

    res.status(200).send({
      success: true,
      payload: {
        filters: buildFilters(courseIds),
        courses
      }
    })

  } catch (error) {
    res.status(400).send({
      success: false,
      payload: error
    })
  }
})

app.patch('/', function (req, res) {
  const { _id, level, book, bookPublisher, active, modality, name, duration, courseId } = req.body || {}

  console.log(req.body._id)
  Course.findByIdAndUpdate(
    _id,
    {
      $set: {
        level,
        book,
        bookPublisher,
        active,
        modality,
        name,
        duration,
        courseId
      }
    }
  )
  .then(result => {
    res.status(200).send({
      success: true,
      payload: result,
      message: 'Course updated successfuly'
    })
  })
  .catch(error => {
    res.status(400).send({
      success: false,
      payload: error
    })
  })
})

app.delete('/', function (req, res) {
  const { id } = req.body || {}

  console.log(id)
  Course.deleteOne({ _id: id })
  .then(result => {
    res.status(200).send({
      success: true,
      payload: result,
      message: 'Course deleted successfuly'
    })
  })
  .catch(error => {
    res.status(400).send({
      success: false,
      payload: error
    })
  })
})

app.listen(PORT, function () {
  console.log(`Server Listening on ${PORT}`)
})