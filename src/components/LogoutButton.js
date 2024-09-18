import React from 'react';
import { AiOutlineLogout } from 'react-icons/ai';

const LogoutButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
    >
      <AiOutlineLogout className="mr-2" />
      Logout
    </button>
  );
};

export default LogoutButton;
