const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  members: [{
    type: String,
  }],
  routes: [{
    type: String
  }]
}, {
  versionKey: false
});


module.exports = mongoose.model('Trip', TripSchema);