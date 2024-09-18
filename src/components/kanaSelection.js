import React from 'react';
import { theme } from '../theme';
import { AiFillStar } from 'react-icons/ai';

function KanaSelection({ selectedCategory, selectedKana, setSelectedKana, flashcards }) {
  const toggleKana = (kanaChar) => {
    setSelectedKana(prev => ({
      ...prev,
      [kanaChar]: !prev[kanaChar]
    }));
  };

  return (
    <div className="grid grid-cols-5 gap-1 mb-6">
      {flashcards.map((flashcard) => (
        <button
          key={flashcard._id}
          onClick={() => toggleKana(flashcard.character)}
          className={`w-14 h-18 rounded-lg shadow-md transition duration-300 text-sm font-semibold flex flex-col items-center justify-center relative
            ${selectedKana[flashcard.character]
              ? `${theme[selectedCategory].selected} text-white`
              : `bg-white text-${theme[selectedCategory].primary}-800 hover:bg-${theme[selectedCategory].primary}-100`
            }
          `}
        >
          <span className="text-xl">{flashcard.character}</span>
          <span className="text-[11px]">{flashcard.reading}</span>
          {flashcard.learned && (
            <span className="absolute top-0.5 right-0.5 text-yellow-500">
              <AiFillStar className="w-4 h-4" />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default KanaSelection;
