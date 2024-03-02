const mongoose = required('mongoose');

const typeBrandSchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'type',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('type_brand', typeBrandSchema);
