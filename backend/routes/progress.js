const express = require('express');
const router = express.Router();
const UserProgress = require('../models/Progress');

// Get user progress
router.get('/:userId', async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.params.userId }).populate('flashcardId');
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress' });
  }
});

// Update user progress
router.post('/:userId', async (req, res) => {
  try {
    const { flashcardId, correct } = req.body;
    let progress = await UserProgress.findOne({ userId: req.params.userId, flashcardId });
    if (!progress) {
      progress = new UserProgress({ userId: req.params.userId, flashcardId });
    }
    if (correct) {
      progress.correctAttempts += 1;
      progress.streak += 1;
      if (progress.streak >= 3) {
        progress.learned = true;
      }
    } else {
      progress.incorrectAttempts += 1;
      progress.streak = 0;
      progress.learned = false;
    }
    progress.lastAttemptDate = new Date();
    await progress.save();
    res.json({ progress, streak: progress.streak });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Error updating progress' });
  }
});

module.exports = router;