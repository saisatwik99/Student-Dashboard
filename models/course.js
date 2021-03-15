const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseName: {
      type: String,
      required: true
  },
  totalStudents: {
      type: Number,
      required: true
  },
  totalClasses: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Course', courseSchema);
