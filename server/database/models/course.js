const mongoose = require('mongoose')

const Course = mongoose.model('Course', {
  name: {
    type: String,
    require: true,
    trim: true
  },
  duration: {
    type: Number,
    require: true,
    trim: true
  }
});

module.exports = Course;