import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';

const ProfileButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
    >
      <AiOutlineUser className="mr-2" />
      Profile
    </button>
  );
};

export default ProfileButton;
