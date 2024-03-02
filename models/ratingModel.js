const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    name: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('rating', ratingSchema);
