import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [psuId, setPsuId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/chat');
  };

  const handleGuestAccess = () => {
    navigate('/chat');
  };

  return (
    <div className="sign-in">
      <h1>Welcome to PSU Chatbot</h1>
      <h2>Sign in using your PSU ID</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Enter your PSU ID"
          value={psuId}
          onChange={(e) => setPsuId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <div className="guest-option">
        <button 
          onClick={handleGuestAccess}
          className="guest-button"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

export default SignIn;
