const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
})

const toiletSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  location: {
    type: pointSchema,
    required: true
  }
});

toiletSchema.index({ location: "2dsphere" });

const Toilet = mongoose.model('Toilet', toiletSchema);

module.exports = Toilet;