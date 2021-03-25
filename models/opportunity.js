const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
    title: {
        type: String,
        required: true
    },
  startDate: {
      type: String,
      required: true
  },
  duration: {
      type: String,
      required: true
  },
  applyBy: {
    type: String,
    required: true
  },
  desc: {
      type: String,
      required: true
  },
  skills: {
      type: String,
      required: true
  },
  applyLink: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
