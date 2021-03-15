const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  email: {
      type: String,
      required: true
  },
  courseName: {
      type: String,
      required: true
  },
  classesAbsent: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
