const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instrument_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Data', dataSchema);
