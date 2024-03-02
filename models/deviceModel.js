const mongoose = require('mongoose');
const validator = require('validator');

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Не корректный URL-адрес',
      },
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'type',
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brand',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    rating: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('device', deviceSchema);
