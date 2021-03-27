const mongoose = require('mongoose')

const Course = mongoose.model('Course', {
  level: {
    type: Number,
    require: true,
    trim: true
  },
  book: {
    type: String,
    required: true,
    trim: true
  },
  bookPublisher: {
    type: String,
    required: true,
    trim: true
  },
  active: {
    type: String,
    required: true,
    trim: true
  },
  modality: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    require: true,
    trim: true
  },
  duration: {
    type: Number,
    require: true,
    trim: true
  },
  courseId: {
    type: Number,
    require: true,
    trim: true
  }
});

module.exports = Course;