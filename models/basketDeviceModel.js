const mongoose = require('mongoose');

const basketDeviceSchema = new mongoose.Schema(
  {
    basket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'basket',
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('basket_device', basketDeviceSchema);
