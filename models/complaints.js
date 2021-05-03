const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'INITIATED'
  },
  createdAt: {
    type : Date, 
    default: Date.now
  }
  
});

module.exports = mongoose.model('Complaint', complaintSchema);
