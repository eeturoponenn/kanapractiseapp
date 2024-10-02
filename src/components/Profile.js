import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState({ mostKnown: null, leastKnown: null, biggestStreak: null });

  const handleBackToMain = () => {
    navigate('/');
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      const fetchProgress = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/progress/${user.id}`);
          console.log("response.data", response.data);
          setProgress(response.data);
          calculateStats(response.data);
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      };
      fetchProgress();
    }
  }, []);

  const calculateStats = (progressData) => {
    if (progressData.length === 0) return;

    const knownFlashcards = progressData.filter(p => p.learned);
    const unknownFlashcards = progressData.filter(p => !p.learned);

    const mostKnown = knownFlashcards.reduce((prev, current) => {
      const prevPercentage = (prev.correctAttempts / (prev.correctAttempts + prev.incorrectAttempts)) * 100 || 0;
      const currentPercentage = (current.correctAttempts / (current.correctAttempts + current.incorrectAttempts)) * 100 || 0;
      return (prevPercentage > currentPercentage) ? prev : current;
    }, knownFlashcards[0]);

    const leastKnown = unknownFlashcards.reduce((prev, current) => {
      const prevPercentage = (prev.correctAttempts / (prev.correctAttempts + prev.incorrectAttempts)) * 100 || 0;
      const currentPercentage = (current.correctAttempts / (current.correctAttempts + current.incorrectAttempts)) * 100 || 0;
      return (prevPercentage < currentPercentage) ? prev : current;
    }, unknownFlashcards[0]);

    const biggestStreak = progressData.reduce((prev, current) => {
      return (prev.streak > current.streak) ? prev : current;
    }, progressData[0]);

    setStats({
      mostKnown,
      leastKnown,
      biggestStreak
    });
  };

  const calculatePercentage = (correct, incorrect) => {
    const total = correct + incorrect;
    return total > 0 ? ((correct / total) * 100).toFixed(2) : '0.00';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full max-w-md relative">
        <button 
          onClick={handleBackToMain}
          className="absolute top-4 right-4 flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Home <FaArrowRight className="ml-1" />
        </button>
        {user ? (
          <>
            <p className="mb-2"><strong>Username:</strong> {user.username}</p>
            <p className="mb-4"><strong>Email:</strong> {user.email}</p>
            <p className="mb-4"><strong>Progress:</strong></p>
            {progress.map((p) => (
              <div key={p.flashcardId._id} className="mb-2">
                <span>Flashcard Character: {p.flashcardId.character} - Correct Attempts: {p.correctAttempts}</span>
              </div>
            ))}
            <h2 className="text-xl font-bold mt-4">Statistics</h2>
            {stats.mostKnown && (
              <div className="mt-2">
                <p><strong>Most Known Flashcard:</strong> {stats.mostKnown.flashcardId.character} with {calculatePercentage(stats.mostKnown.correctAttempts, stats.mostKnown.incorrectAttempts)}% correct attempts</p>
              </div>
            )}
            {stats.leastKnown && (
              <div className="mt-2">
                <p><strong>Least Known Flashcard:</strong> {stats.leastKnown.flashcardId.character} with {calculatePercentage(stats.leastKnown.correctAttempts, stats.leastKnown.incorrectAttempts)}% correct attempts</p>
              </div>
            )}
            {stats.biggestStreak && (
              <div className="mt-2">
                <p><strong>Biggest Streak:</strong> {stats.biggestStreak.flashcardId.character} with a streak of {stats.biggestStreak.streak}</p>
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
