const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const portfolioSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  website: { type: String, required: true },
  template: { type: String, enum: ['zigZag', 'inLine', 'stripes'] },
  titleOne: { type: String, required: true },
  descriptionOne: { type: String, required: true },
  imageOne: { type: String, required: true },
  titleTwo: { type: String, required: true },
  descriptionTwo: { type: String, required: true },
  imageTwo: { type: String, required: true },
  titleThree: { type: String, required: true },
  descriptionThree: { type: String, required: true },
  imageThree: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Portfolio', portfolioSchema);
