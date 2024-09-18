import React from 'react';
import { theme } from '../theme';

function CategorySelector({ selectedCategory, setSelectedCategory, setSelectedKana }) {
  const changeCategory = (category) => {
    setSelectedCategory(category);
    setSelectedKana({});
  };

  return (
    <div className="space-x-4 mb-6">
      <button
        onClick={() => changeCategory('hiragana')}
        className={`px-6 py-3 rounded-full shadow-md transition duration-300 text-lg font-semibold ${
          selectedCategory === 'hiragana' 
            ? `${theme.hiragana.selected} text-white` 
            : `bg-white text-${theme.hiragana.primary}-500 hover:bg-${theme.hiragana.primary}-100`
        }`}
      >
        Hiragana
      </button>
      <button
        onClick={() => changeCategory('katakana')}
        className={`px-6 py-3 rounded-full shadow-md transition duration-300 text-lg font-semibold ${
          selectedCategory === 'katakana' 
            ? `${theme.katakana.selected} text-white` 
            : `bg-white text-${theme.katakana.primary}-500 hover:bg-${theme.katakana.primary}-100`
        }`}
      >
        Katakana
      </button>
    </div>
  );
}

export default CategorySelector;
