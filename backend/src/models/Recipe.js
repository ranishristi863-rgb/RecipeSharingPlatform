const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  image: { type: String },
  tags: [{ type: String, trim: true }],
  likes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
