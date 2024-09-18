require('dotenv').config();
const mongoose = require('mongoose');
const Flashcard = require('../models/Flashcard');
const  kana  = require('../../src/kanaData');

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('Error: MONGODB_URI is not defined in the .env file');
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    return Flashcard.deleteMany({});
  })
  .then(() => {
    console.log('Old flashcards removed');
    const hiraganaFlashcards = kana.hiragana.map(flashcard => ({
      ...flashcard,
      category: 'hiragana'
    }));
    const katakanaFlashcards = kana.katakana.map(flashcard => ({
      ...flashcard,
      category: 'katakana'
    }));
    const flashcards = [...hiraganaFlashcards, ...katakanaFlashcards];
    return Flashcard.insertMany(flashcards);
  })
  .then(() => {
    console.log('Flashcards inserted');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.disconnect();
  });
