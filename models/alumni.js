const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const alumniSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  linkedln: {
    type: String
  },
  role: {
    type: String 
  },
  image: {
    type: String
  }
  
});

module.exports = mongoose.model('Alumni', alumniSchema);
