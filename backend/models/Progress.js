const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flashcardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard', required: true },
  correctAttempts: { type: Number, default: 0 },
  incorrectAttempts: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastAttemptDate: { type: Date, default: Date.now },
  learned: { type: Boolean, default: false }
});

module.exports = mongoose.model('UserProgress', UserProgressSchema);