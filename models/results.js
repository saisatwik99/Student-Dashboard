const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resultSchema = new Schema({
   result: {
    type: Object,
    required: true
   },
  total: {
      type: Number,
      required: true
  }
});

module.exports = mongoose.model('Result', resultSchema);
