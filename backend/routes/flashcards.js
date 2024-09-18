const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');
const UserProgress = require('../models/Progress');

// Get all flashcards or filter by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const userId = req.query.userId;
    let query = {};
    if (category) {
      query.category = category;
    }
    const flashcards = await Flashcard.find(query);
    const userProgress = await UserProgress.find({ userId });
    
    const flashcardsWithLearned = flashcards.map(flashcard => {
      const progress = userProgress.find(p => p.flashcardId.toString() === flashcard._id.toString());
      return {
        ...flashcard.toObject(),
        learned: progress ? progress.learned : false
      };
    });
    
    res.json(flashcardsWithLearned);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flashcards' });
  }
});

// Add new flashcard
router.post('/', async (req, res) => {
  try {
    const { character, reading, category } = req.body;
    const flashcard = new Flashcard({ character, reading, category });
    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: 'Error adding flashcard' });
  }
});

module.exports = router;