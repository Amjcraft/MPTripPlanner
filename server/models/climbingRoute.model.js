const mongoose = require('mongoose');

const ClimbingRouteSchema = new mongoose.Schema({
  mpId: {
    type: Number,
    required: true
  },
}, {
  versionKey: false
});


module.exports = mongoose.model('ClimbingRoute', ClimbingRouteSchema);