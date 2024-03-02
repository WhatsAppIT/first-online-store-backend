const mongoose = require('mongoose');

const basketModel = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('basket', basketModel);
