import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function AuthCard({ onLoginSuccess, onRegisterSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? 'Login' : 'Register'}
      </h2>
      {isLogin ? (
        <Login onLoginSuccess={onLoginSuccess} />
      ) : (
        <Register onRegisterSuccess={onRegisterSuccess} />
      )}
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:text-blue-700"
        >
          {isLogin ? 'New user? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}

export default AuthCard;
