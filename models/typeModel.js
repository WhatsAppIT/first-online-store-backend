const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [1, 'нужно ввести данные'],
      maxlength: [30, 'максимум 30 символов'],
      unique: true,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('type', typeSchema);
