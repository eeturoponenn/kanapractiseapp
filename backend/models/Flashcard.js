const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
  character: { type: String, required: true },
  reading: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model('Flashcard', FlashcardSchema);