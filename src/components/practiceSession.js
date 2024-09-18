import React, { useState, useEffect } from 'react';
import { theme } from '../theme';

function PracticeSession({ flashcards, currentIndex, setCurrentIndex, endPractice, selectedCategory, handleProgressUpdate }) {
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreak, setShowStreak] = useState(false);

  useEffect(() => {
    if (currentIndex >= flashcards.length) {
      setIsCompleted(true);
    }
  }, [currentIndex, flashcards.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isCorrect = userInput.toLowerCase() === flashcards[currentIndex].reading.toLowerCase();
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect. The correct answer is: ' + flashcards[currentIndex].reading);
    setIsSubmitted(true);
    
    try {
      const newStreak = await handleProgressUpdate(flashcards[currentIndex]._id, isCorrect);
      setStreak(newStreak);
      if (isCorrect) {
        setShowStreak(true);
        setTimeout(() => {
          setShowStreak(false);
          nextCard();
        }, 1300);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const nextCard = () => {
    if (currentIndex + 1 < flashcards.length) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setFeedback(null);
      setIsSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  if (flashcards.length === 0) {
    return (
      <div className="text-center">
        <p className="text-xl mb-4">No flashcards selected for practice.</p>
        <button
          onClick={endPractice}
          className="px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-300 text-lg font-semibold"
        >
          End Practice
        </button>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="text-center">
        <p className="text-2xl mb-4">Congratulations! You've completed all flashcards.</p>
        <button
          onClick={endPractice}
          className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-300 text-lg font-semibold"
        >
          Finish Practice
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className={`flashcard bg-white p-12 rounded-2xl shadow-lg border-4 border-${theme[selectedCategory].primary}-300 max-w-sm mx-auto mb-8`}>
        <div className={`character text-8xl mb-6 text-${theme[selectedCategory].primary}-800`}>
          {flashcards[currentIndex].character}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md"
            placeholder="Enter the reading"
            disabled={isSubmitted}
          />
          {!isSubmitted && (
            <button
              type="submit"
              className={`px-6 py-3 bg-${theme[selectedCategory].secondary}-500 text-white rounded-full shadow-md hover:bg-${theme[selectedCategory].secondary}-600 transition duration-300 text-lg font-semibold`}
            >
              Submit
            </button>
          )}
        </form>
        {feedback && (
          <div className={`mt-4 text-lg ${feedback.startsWith('Correct') ? 'text-green-600' : 'text-red-600'}`}>
            {feedback}
          </div>
        )}
        {showStreak && (
          <div className="mt-4 text-2xl font-bold text-blue-600">
            Streak: {streak}
          </div>
        )}
        {isSubmitted && !showStreak && (
          <button
            onClick={nextCard}
            className={`mt-4 px-6 py-3 bg-${theme[selectedCategory].primary}-500 text-white rounded-full shadow-md hover:bg-${theme[selectedCategory].primary}-600 transition duration-300 text-lg font-semibold`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default PracticeSession;
